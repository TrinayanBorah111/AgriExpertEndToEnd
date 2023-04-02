import "../ComponentsAdmin/Customers.css";
import SidebarAdmin from "../Sidebar/Sidebar";
import Table from "../Table/Table";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const Customerscolumns = [
    { field: "id", headerName: "Customer ID", width: 180 },
    {
        field: "customerName",
        headerName: "Full name",
        width: 200,
        editable: true
    },
    {
        field: "customerPhone",
        headerName: "Contact",
        width: 180,
        editable: true
    },
    {
        field: "packagesInfo",
        headerName: "Package",
        width: 180,
        editable: true
    },
    {
        field: "addressInfo",
        headerName: "Address",
        width: 180,
        editable: true
    }, 
];
const Customers = () => {
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
        let authTokenURL = await Services.authConfigurations.getAuthURL('/customer',token)
        const data = await Services.customerConfigurations.getAllCustomers(authTokenURL);
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
            oneRowSelected: flag,
        })
    }
    return (
        isLoaded ?
    <div className="Dashboard">
      <div className="AppGlass">
                    <SidebarAdmin />
                    <div>
                        <Table columns={Customerscolumns} data={serverResponse} role={"Admin"} tab={"Customer"} rowSeleted={handleRowSeleted} />
                    </div>
      </div>
    </div>:<></>
  );
};

export default Customers;
