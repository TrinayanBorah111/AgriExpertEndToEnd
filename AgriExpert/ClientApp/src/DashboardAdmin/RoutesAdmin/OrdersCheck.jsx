import SidebarAdmin from "../Sidebar/Sidebar";
import "../ComponentsAdmin/SolQuesStyles.css";
import Table from "../Table/Table";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const OrdersColumns = [
    { field: "id", headerName: "Order ID", width: 180 },
    {
        field: "ordersRequirement",
        headerName: "Order Requirement",
        width: 200,
        editable: true
    },
    {
        field: "ordersAddress",
        headerName: "Address",
        width: 150,
        editable: true
    },
    {
        field: "ordersPhone",
        headerName: "Contact No.",
        width: 180,
        editable: true
    },
    {
        field: "customerName",
        headerName: "Placed by",
        width: 180,
        editable: true
    }
];

const OrderCheck = () => {
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
        let authTokenURL = await Services.authConfigurations.getAuthURL('/order', token)
        let data = await Services.customerConfigurations.getAllOrders(authTokenURL);
        console.log(data)
        if (data == 401 || data == 400 || data == 500) {
            sessionStorage.clear()
            navigate(`/admin`)
        } else {
            //data = data.map(value => {
            //    if (value.questionStatus == "Answered")
            //        return value;
            //})
            //let len = data.length;
            //for (let i = 0; i <= len; i++) {
            //    var myIndex = data.indexOf(undefined);
            //    if (myIndex !== -1) {
            //        data.splice(myIndex, 1);
            //    }
            //}
            setserverResponse(data);
            console.log(data)
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
        isLoaded ? <div className="Dashboard">
            <div className="AppGlass">
                <SidebarAdmin />
                <div>
                    <Table columns={OrdersColumns} data={serverResponse} role={"Admin"} tab={"Orders"} rowSeleted={handleRowSeleted} />
                </div>
            </div>
        </div> : <></>
    );
};

export default OrderCheck;
