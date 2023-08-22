import SidebarCus from "../SidebarCustomer/SidebarCus.jsx";
import "../ComponentsCustomer/orders.css";
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const NoPlan = () => {
    const navigate = useNavigate();
    const handleViewPlans = () => {
        navigate("/plans")
    }
    const customerDetails = useSelector((state) => state.customerDetails)
    return (
        <div className="Dashboard">
            <div className="AppGlass">
                <SidebarCus />
                <div className="adex">
                    <div>No Valid Plan available</div>
                    <div>{customerDetails.customerTransactionID !== null ?
                        "Last transaction ID: " + customerDetails.customerTransactionID:""
                     }</div>
                    <button className="op" onClick={handleViewPlans }>View Plans</button>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default NoPlan;
