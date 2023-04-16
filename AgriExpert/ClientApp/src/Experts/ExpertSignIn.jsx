import React from 'react'
import {Box, TextField, Typography, Button} from "@mui/material"
import { GiFallingLeaf } from "react-icons/gi";
import Services from '../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import './DashboardExpert.css'


const SignInExpert = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        userName: "",
        password: "",
        revoked: false,
    });
    const handleUsernameChange = (e) => {
        setState({
            ...state,
            userName: e.target.value
        });
    }
    const handlePasswordChange = (e) => {
        setState({
            ...state,
            password: e.target.value
        });
    }
    const loginClick = async () => {
        let obj = {
            "userName": state.userName,
            "password": state.password
        }
        const data = await Services.expertConfigurations.expertLogIn(obj);
        if (data != "Username and Password incorrect") {
            let authTokenURL = await Services.authConfigurations.getAuthURL(`/expert/expertId?` +
                new URLSearchParams({
                    username: state.userName,
                    password: state.password,
            }), data)
            const expertData = await Services.expertConfigurations.getExpertID(state.userName, state.password, authTokenURL);
            if (expertData.expertStatus !== "Revoked") {
                sessionStorage.setItem('expertlLoggedInId', expertData.expertsId);
                sessionStorage.setItem('authExpertToken', data)
                navigate(`/dashboardexpert`)
            } else {
                setState({
                    ...state,
                    revoked:true
                })
            }
            
        }
    }
  return (
    <div>
        <form>
            <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems = "center" justifyContent={"center"} margin="auto" marginTop={5} padding={3} borderRadius={5} boxShadow={'5px 5px 20px #ccc'} sx={{
                ":hover": {
                    boxShadow: "10px 10px 20px #00FF00"
                }
            }}>
            <h1 >
          <logo-icon>
            <GiFallingLeaf color="green" />
          </logo-icon>
          AgriExpertt
        </h1>

            <Typography variant='h4' fontWeight="bold" color='green' padding={3} textAlign="center">Expert Login</Typography>
            <TextField margin="normal" type={"text"} variant='outlined' placeholder='UserName' onChange={handleUsernameChange}/>
            <TextField margin="normal" type={'password'} variant='outlined' placeholder='Password' onChange={handlePasswordChange}/>
            <Button variant="contained" color="success" onClick={loginClick}>Login</Button>
             {state.revoked? <p>Your account has been revoked!</p>:<></> }
            </Box>
        </form>
    </div>
  )
}

export default SignInExpert