import React from 'react'
import {Box, TextField, Typography, Button} from "@mui/material"
import { GiFallingLeaf } from "react-icons/gi";



const SignInExpert = () => {
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
            <TextField margin="normal" type={"email"} variant='outlined' placeholder='Email'/>
            <TextField margin="normal" type={'password'} variant='outlined' placeholder='Password'/>
            <Button variant="contained" color="success" >Login</Button>
            </Box>
        </form>
    </div>
  )
}

export default SignInExpert