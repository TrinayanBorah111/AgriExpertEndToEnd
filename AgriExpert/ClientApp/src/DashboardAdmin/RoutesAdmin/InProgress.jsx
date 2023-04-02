import React from "react";
import "../ComponentsAdmin/Inprogress.css";
import SidebarAdmin from "../Sidebar/Sidebar.jsx";
import Table from "../Table/Table";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const InprogressQuestionscolumns = [
    { field: "id", headerName: "Question ID", width: 180 },
    {
        field: "questionContext",
        headerName: "Question Title",
        width: 200,
        editable: true
    },
    {
        field: "questionStatus",
        headerName: "Status",
        width: 150,
        editable: true
    },
    {
        field: "questionAnswer",
        headerName: "Answer",
        width: 180,
        editable: true
    },
    {
        field: "questionTopicName",
        headerName: "Topic",
        width: 180,
        editable: true
    },
    {
        field: "answeredBy",
        headerName: "Answered By(Expert)",
        width: 180,
        editable: true
    },
];
const InProgress = () => {
    const navigate = useNavigate();
    const [serverResponse, setserverResponse] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        validateAuthToken();
    }, []);
    const validateAuthToken = () => {
        const token = sessionStorage.getItem('authToken')
        const authToken = !!token
        if (authToken) {
            fetchResponse();
        } else {
            navigate(`/admin`)
        }
    }
    const fetchResponse = async () => {
        const token = sessionStorage.getItem("authToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL('/question', token)
        let data = await Services.questionConfigurations.getAllQuestions(authTokenURL);

        if (data == 401 || data == 400 || data == 500) {
            sessionStorage.clear()
            navigate(`/admin`)
        } else {
            data = data.map(value => {
                if (value.questionStatus == "InProgress")
                    return value;
            })
            let len = data.length;
            for (let i = 0; i <= len; i++) {
                var myIndex = data.indexOf(undefined);
                if (myIndex !== -1) {
                    data.splice(myIndex, 1);
                }
            }
            setserverResponse(data);
            setisLoaded(true);
        }
    }
    const handleRowSeleted = (flag) => {
        setState({
            ...state,
            oneRowSelected: flag,
        })
    }
    return (
        isLoaded ?<div className="Dashboard">
            <div className="AppGlass">
                <SidebarAdmin />
                <div><Table columns={InprogressQuestionscolumns} data={serverResponse} role={"Admin"} tab={"InProgress"} rowSeleted={handleRowSeleted} /></div>
            </div>
        </div>:<></>
    );
};

export default InProgress;
