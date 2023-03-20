import SidebarAdmin from "../Sidebar/Sidebar";
import "../ComponentsAdmin/SolQuesStyles.css";
import Table from "../Table/Table";
import Services from '../../Shared/HttpRequests';
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
        headerName: "Answered By(Expert)",
        width: 180,
        editable: true
    },
];

const Solved = () => {
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
        if (data == 401 || data == 400 || data == 500) {
            sessionStorage.clear()
            navigate(`/admin`)
        } else {
            setserverResponse(data);
            setisLoaded(true);
        }
    }
  return (
      isLoaded ?<div className="Dashboard">
      <div className="AppGlass">
              <SidebarAdmin />
              <Table columns={SolvedQuestionscolumns} data={serverResponse} />
      </div>
    </div>:<></>
  );
};

export default Solved;
