import "../DashboardCustomer/DashCusStyles.css";
import SidebarCus from "./SidebarCustomer/SidebarCus";
import Services from '../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ActionCall from "../actions/index";

function DashboardCus() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [serverResponse, setserverResponse] = useState([]);
    const [state, setstate] = useState({
        name: "",
        address: "",
        updateSuccess:false
    });
  
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        validateAuthToken();
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
        let customerData = await Services.customerConfigurations.getCustomerData(customerToken,'')
        let data = await Services.customerConfigurations.checkCustomerPlanValidation(customerToken, '') 

        if (data == 401 || data == 400 || data == 500 || customerData == 401 || customerData == 400 || customerData == 500) {
            sessionStorage.clear()
            navigate(`/signup`)
        } else {
            if (data.response == "Invalid" || data.response == "") {
                dispatch(ActionCall.actionCalls.addCustomerDetails(customerData))
                navigate(`/noplans`)
            } else {
                dispatch(ActionCall.actionCalls.addCustomerDetails(customerData))
                setserverResponse(customerData);
                console.log(customerData)
            }
            //let authTokenExpertURL = await Services.authConfigurations.getAuthURL(`/customer/81cd9a99-60ca-44b2-8438-5611a72dc50d`, token);
            //let expertData = await Services.expertConfigurations.getExpertData(expertId, authTokenExpertURL);
            //setexpertData(expertData);
            setisLoaded(true);
        }
    }
    const handleUpdateDetails = async () => {
        let id = sessionStorage.getItem("authCustomerToken")
        let payload = {
            CustomerName: state.name,
            CustomerAddress: state.address,
            CustomerPhone: serverResponse.customerPhone,
            PackagesId: serverResponse.packagesId
        }
        let data = await Services.customerConfigurations.updateCustomerWithID(id, payload, '');
        console.log(data)
        if (data == 200 || data == 201) {
            setstate({
                ...state,
                name: "",
                address: "",
                updateSuccess: true
            })
            await fetchResponse()
        }
    }
    const handleNameChange = (event) => {
        setstate({
            ...state,
            name : event.target.value
        })
    }
    const handleAddressChange = (event) => {
        setstate({
            ...state,
            address: event.target.value
            })
    }
  return (
      isLoaded ?<div className="Dashboard">
      <div className="AppGlass">
        <SidebarCus />
        {(serverResponse.customerName=="" || serverResponse.customerAddress=="")?<div className="informationCus">
          <input placeholder="Enter Your name" value={state.name} onChange={handleNameChange}/>
          <input placeholder="Enter Your Address" value={state.address} onChange={handleAddressChange}/>
          <button type="button" className="infoButton" onClick={handleUpdateDetails}>
            Update
          </button>
        </div>:
            <div className="informationCus" style={{marginTop:"15%"} }>
                 <p>Hi, {serverResponse.customerName}  hope you are doing well!</p>
                 <p>(Address: {serverResponse.customerAddress} )</p>
           </div>}
      </div>
    </div>:<></>
  );
}

export default DashboardCus;
