import SidebarCus from "../SidebarCustomer/SidebarCus.jsx";
import "../ComponentsCustomer/orders.css"
import { useState, useEffect } from 'react';
import Services from "../../Shared/HttpRequests"
import { useNavigate } from "react-router-dom"

const orders = () => {
    const navigate = useNavigate();
    const [isLoaded, setisLoaded] = useState(false);
    const [state, setState] = useState({
        requirement: "",
        address: "",
        phone: "",
        requestSent:false
    })
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
    const handleSubmit = async () => {
        const payload = {
            OrdersRequirement: state.requirement,
            OrdersPhone: state.phone,
            OrdersAddress : state.address,
            CustomersId :  sessionStorage.getItem("authCustomerToken"),
        }
        let data = await Services.customerConfigurations.postOrders(payload, '')
        console.log(data)
        if (data == 200 || data == 201) {
            setState({
                ...state,
                requirement: "",
                address: "",
                phone: "",
                requestSent: true
            })
        }
    }
    const handleRequrimentChange = (event) => {
        setState({
            ...state,
            requirement: event.target.value
        })
    }
    const handleAddressChange = (event) => {
        setState({
            ...state,
            address: event.target.value
        })
    }
    const handlePhoneChange = (event) => {
        setState({
            ...state,
            phone: event.target.value
        })
    }
    return (
        isLoaded? < div className = "Dashboard" >
            <div className="AppGlass">
                <SidebarCus />
                <div className="adex">
                    <input className="po" type="text" placeholder="Requirements" value={state.requirement} onChange={handleRequrimentChange} />
                    <input className="po" type="text" placeholder="Address" value={ state.address} onChange={handleAddressChange} />
                    <input id="phoneNumber" className="po" type="number" placeholder="Phone No" value={ state.phone} onChange={handlePhoneChange } />
                    <button className="op" style={{ marginTop: "8px" }} onClick={handleSubmit}>Submit</button>
                    <p>{state.requestSent?"Order request sent successfully!":""}</p>
                </div>
                <div></div>
            </div>
        </div>:<></>
    );
};

export default orders;
