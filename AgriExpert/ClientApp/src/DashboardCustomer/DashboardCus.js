import "../DashboardCustomer/DashCusStyles.css";
import SidebarCus from "./SidebarCustomer/SidebarCus";

function DashboardCus() {
  return (
    <div className="Dashboard">
      <div className="AppGlass">
        <SidebarCus />
        <div className="informationCus">
          <input placeholder="Enter Your name" />
          <input placeholder="Enter Your Address" />
          <button type="button" classname="infoButton">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardCus;
