import React from 'react'
import SidebarEx from './SidebarExpert/SidebarEx'
import Services from '../Shared/HttpRequests';
import Table from "../DashboardAdmin/Table/Table";
import { useState, useEffect } from 'react';
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
        headerName: "Answered By(Expert)",
        width: 180,
        editable: true
    },
];

const DashboardExpert = () => {
    const [serverResponse, setserverResponse] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        fetchResponse();
    }, []);
    const fetchResponse = async () => {
        let data = await Services.questionConfigurations.getAllQuestionsWithExpertID('68db8b52-5fcf-4c73-a47b-d9c239662646');
        data = data.map(value => {
            if (value.questionStatus == "Answered")
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

export default DashboardExpert