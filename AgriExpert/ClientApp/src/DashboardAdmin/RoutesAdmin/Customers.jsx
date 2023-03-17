import "../ComponentsAdmin/Customers.css";
import SidebarAdmin from "../Sidebar/Sidebar";
import Table from "../Table/Table";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
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
    const [serverResponse, setserverResponse] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        fetchResponse();
    }, []);
    const fetchResponse = async () => {
        const data = await Services.customerConfigurations.getAllCustomers();
        setserverResponse(data);
        setisLoaded(true);
    }
    return (
        isLoaded ?<>
    <div className="Dashboard">
      <div className="AppGlass">
              <SidebarAdmin />
                    <Table columns={Customerscolumns} data={serverResponse} />
      </div>
    </div></>:<></>
  );
};

export default Customers;
