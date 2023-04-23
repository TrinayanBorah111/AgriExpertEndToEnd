import SidebarCus from "../SidebarCustomer/SidebarCus.jsx";
import "../ComponentsCustomer/orders.css";
import { useNavigate } from "react-router-dom"

const NoPlan = () => {
    const navigate = useNavigate();
    const handleViewPlans = () => {
        navigate("/plans")
    }
    return (
        <div className="Dashboard">
            <div className="AppGlass">
                <SidebarCus />
                <div className="adex">
                    <div>No Valid Plan available</div>
                    <button className="op" onClick={handleViewPlans }>View Plans</button>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default NoPlan;
