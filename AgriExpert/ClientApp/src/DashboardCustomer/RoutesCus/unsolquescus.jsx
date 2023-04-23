import SidebarCus from "../SidebarCustomer/SidebarCus";
import "../ComponentsCustomer/unsolquescus.css";
import Services from '../../Shared/HttpRequests';
import Table from "../../DashboardAdmin/Table/Table";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const UnSolvedQuestionscolumns = [
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
        headerName: "Assigned To(Expert)",
        width: 180,
        editable: true
    },
];
const UnSolQuesCus = () => {
    const navigate = useNavigate();
    const [serverResponse, setserverResponse] = useState([]);
    const [expertData, setexpertData] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        validateAuthToken();
        //fetchResponse()
    }, []);
    const validateAuthToken = () => {
        let customerToken = sessionStorage.getItem("authCustomerToken");
        const authToken = !!customerToken
        if (authToken) {
            fetchResponse();
        } else {
            navigate(`/signup`)
        }
    }
    const fetchResponse = async () => {
        //const token = sessionStorage.getItem("authExpertToken");
        //const expertId = sessionStorage.getItem("expertlLoggedInId");
        //let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/expert/${expertId}`, token)
        //let data = await Services.questionConfigurations.getAllQuestionsWithExpertID(expertId, authTokenURL);
        let customerToken = sessionStorage.getItem("authCustomerToken");
        let data = await Services.questionConfigurations.getAllQuestionsWithCustomerID(customerToken, '');
        let planDataCheck = await Services.customerConfigurations.checkCustomerPlanValidation(customerToken, '')
        if (data == 401 || data == 400 || data == 500) {
            sessionStorage.clear()
            navigate(`/signup`)
        } else {
            if (planDataCheck.response == "Invalid" || planDataCheck.response == "") {
                navigate(`/noplans`)
            } else {
                data = data.map(value => {
                    if (value.questionStatus == "NotAnswered")
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
                //let authTokenExpertURL = await Services.authConfigurations.getAuthURL(`/customer/81cd9a99-60ca-44b2-8438-5611a72dc50d`, token);
                //let expertData = await Services.expertConfigurations.getExpertData(expertId, authTokenExpertURL);
                //setexpertData(expertData);
                setisLoaded(true);
            }
            
        }
    }
  return (
      isLoaded ?<div className="Dashboard">
      <div className="AppGlass">
              <SidebarCus /><div>
              <Table columns={UnSolvedQuestionscolumns} data={serverResponse} role={"Customer"} tab={"UnSolved"} expertData={expertData} />
              </div>
       </div>
    </div>:<></>
  );
};

export default UnSolQuesCus;
