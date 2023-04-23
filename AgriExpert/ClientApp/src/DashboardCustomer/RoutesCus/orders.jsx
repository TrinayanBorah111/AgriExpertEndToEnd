import SidebarCus from "../SidebarCustomer/SidebarCus.jsx";
import "../ComponentsCustomer/orders.css"
import { useState, useEffect } from 'react';
import Services from "../../Shared/HttpRequests"
import { useNavigate } from "react-router-dom"

const orders = () => {
    const navigate = useNavigate();
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        validateAuthToken();
        //fetchResponse()
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
        //let data = await Services.questionConfigurations.getAllQuestionsWithCustomerID('81cd9a99-60ca-44b2-8438-5611a72dc50d', '');
        let customerToken = sessionStorage.getItem("authCustomerToken");
        let planDataCheck = await Services.customerConfigurations.checkCustomerPlanValidation(customerToken, '')
        if (planDataCheck == 401 || planDataCheck == 400 || planDataCheck == 500) {
            sessionStorage.clear()
            navigate(`/signup`)
        } else {
            if (planDataCheck.response == "Invalid" || planDataCheck.response == "") {
                navigate(`/noplans`)
            }
            setisLoaded(true);
        }
    }
    return (
        isLoaded? < div className = "Dashboard" >
            <div className="AppGlass">
                <SidebarCus />
                <div className="adex">
                    <input className="po" type="text" placeholder="Requirements" />
                    <input className="po" type="text" placeholder="Address" />
                    <input id="phoneNumber" className="po" type="number" placeholder="Phone No" />
                    <button className="op">Submit</button>
                </div>
                <div></div>
            </div>
        </div>:<></>
    );
};

export default orders;
