import "../DashboardAdmin/DashboardStyles.css";
import SidebarAdmin from "./Sidebar/Sidebar";
import Table from "./Table/Table";
import Services from '../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const Expertcolumns = [
    { field: "id", headerName: "Expert ID", width: 180 },
    {
        field: "expertFullName",
        headerName: "Full name",
        width: 200,
        editable: true
    },
    {
        field: "expertUserName",
        headerName: "User Name",
        width: 150,
        editable: true
    },
    {
        field: "expertPhone",
        headerName: "Contact",
        width: 180,
        editable: true
    },
    {
        field: "expertEmail",
        headerName: "Email",
        width: 250,
        editable: true
    },
    {
        field: "expertStatus",
        headerName: "Status",
        width: 110,
        editable: true
    }
];
function DashboardAdmin() {
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
        let authTokenURL = await Services.authConfigurations.getAuthURL('/expert', token)
        const data = await Services.adminConfigurations.getAllExperts(authTokenURL);
        if (data == 401 || data == 400 || data == 500) {
            sessionStorage.clear()
            navigate(`/admin`)
        } else {
            setserverResponse(data);
            setisLoaded(true);
        }
        
    }
    const handleRowSeleted = (flag) => {
        setState({
            ...state,
            oneRowSelected:flag,
        })
    }
  return (
      isLoaded?<>
      <div className="Dashboard">
        <div className="AppGlass">
          <SidebarAdmin />
                  <Table columns={Expertcolumns} data={serverResponse} rowSeleted={handleRowSeleted} />
                  
          <div></div>
        </div>
      </div>
    </>:<></>
  );
}

export default DashboardAdmin;
