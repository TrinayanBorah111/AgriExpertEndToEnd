import SidebarCus from "../SidebarCustomer/SidebarCus.jsx";
import "../ComponentsCustomer/subscription.css";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Subscription = () => {
    const navigate = useNavigate();
    const [serverResponse, setserverResponse] = useState([]);

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
        let customerData = await Services.customerConfigurations.getCustomerData(customerToken, '')
        let data = await Services.customerConfigurations.checkCustomerPlanValidation(customerToken, '')

        if (data == 401 || data == 400 || data == 500 || customerData == 401 || customerData == 400 || customerData == 500) {
            sessionStorage.clear()
            navigate(`/signup`)
        } else {
            if (data.response == "Invalid" || data.response == "") {
                navigate(`/noplans`)
            } else {
                setserverResponse(customerData);
            }
            //let authTokenExpertURL = await Services.authConfigurations.getAuthURL(`/customer/81cd9a99-60ca-44b2-8438-5611a72dc50d`, token);
            //let expertData = await Services.expertConfigurations.getExpertData(expertId, authTokenExpertURL);
            //setexpertData(expertData);
            setisLoaded(true);
        }
    }
    const handleViewPlans = () => {
        navigate("/plans")
    }
  return (
      isLoaded ?<div className="Dashboard">
      <div className="AppGlass">
        <SidebarCus />
              <div className="informationCus" style={{ marginTop: "15%" }}>
              <div ><b>Your Plan Details</b></div>
              <div>
                  <p>Plan Name : {serverResponse.packages.packageName}</p>
                  <p>Plan Type : {serverResponse.packages.packageType}</p>
                  <p>Plan Price : Rs.{serverResponse.packages.packagePrice}</p>
                  <p>Plan Details : {serverResponse.packages.packageDescription}</p>
                  <button className="op" style={{ marginTop:"20px" }} onClick={handleViewPlans}>View Plans</button>
                  </div>
              </div>
      </div>
    </div>:<></>
  );
};

export default Subscription;
