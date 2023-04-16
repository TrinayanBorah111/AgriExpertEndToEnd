import SidebarCus from "../SidebarCustomer/SidebarCus.jsx";
import "../ComponentsCustomer/orders.css"

const orders = () => {
    return (
        <div className="Dashboard">
            <div className="AppGlass">
                <SidebarCus />
                <div className="adex">
                    <input className="po" type="text" placeholder="Requirements" />
                    <input className="po" type="text" placeholder="Address" />
                    <input className="po" type="number" placeholder="Phone No" />
                    <button className="op">Submit</button>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default orders;
