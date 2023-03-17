import "../DashboardAdmin/DashboardStyles.css";
import SidebarAdmin from "./Sidebar/Sidebar";
import Table from "./Table/Table";
import Services from '../Shared/HttpRequests';
import { useState, useEffect } from 'react';

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
    const [serverResponse, setserverResponse] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        fetchResponse();
    }, []);
    const fetchResponse = async () => {
        const data = await Services.adminConfigurations.getAllExperts();
        setserverResponse(data);
        setisLoaded(true);
    }
  return (
      isLoaded?<>
      <div className="Dashboard">
        <div className="AppGlass">
          <SidebarAdmin />
                  <Table columns={Expertcolumns} data={serverResponse} />
          <div></div>
        </div>
      </div>
    </>:<></>
  );
}

export default DashboardAdmin;
