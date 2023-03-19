import React from 'react'
import SidebarEx from './SidebarExpert/SidebarEx'
import Services from '../Shared/HttpRequests';
import Table from "../DashboardAdmin/Table/Table";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const SolvedQuestionscolumns = [
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
        width: 180,
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
        headerName: "Assigned To(Expert)",
        width: 180,
        editable: true
    },
];

const ExpertUnsolvedQuestions = () => {
    const navigate = useNavigate();
    const [serverResponse, setserverResponse] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        validateAuthToken();
    }, []);
    const validateAuthToken = () => {
        const token = sessionStorage.getItem('authExpertToken')
        const authToken = !!token
        if (authToken) {
            fetchResponse();
        } else {
            navigate(`/expertsignin`)
        }
    }
    const fetchResponse = async () => {
        const token = sessionStorage.getItem("authExpertToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/expert/68db8b52-5fcf-4c73-a47b-d9c239662646`, token)
        let data = await Services.questionConfigurations.getAllQuestionsWithExpertID('68db8b52-5fcf-4c73-a47b-d9c239662646', authTokenURL);
        data = data.map(value => {
            if (value.questionStatus == "InProgress")
                return value;
        })
        for (let i = 0; i < data.length; i++) {
            var myIndex = data.indexOf(undefined);
            if (myIndex !== -1) {
                data.splice(myIndex, 1);
            }
        }
        setserverResponse(data);
        setisLoaded(true);
    }
  return (
      isLoaded? <div className="Dashboard">
      <div className="AppGlass">
              <SidebarEx />
              <Table columns={SolvedQuestionscolumns} data={serverResponse} />
      </div>
    </div>:<></>
  )
}

export default ExpertUnsolvedQuestions