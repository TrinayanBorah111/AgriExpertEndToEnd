import SidebarAdmin from "../Sidebar/Sidebar.jsx";
import "../ComponentsAdmin/AddExpertsStyles.css";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const AddExperts = () => {
    const [state, setState] = useState({
        expertFullName: "",
        expertUserName: "",
        expertPassword: "",
        expertEmail: "",
        expertPhone: "",
        role: "",
        confirmPassword: "",
        outputMessage:""
    });
   const addExpert = async () => {
       let obj = {
           "expertFullName": state.expertFullName,
           "expertUserName": state.expertUserName,
           "expertPassword": state.expertPassword,
           "expertEmail": state.expertEmail,
           "expertPhone": "+91"+state.expertPhone,
           "role": "Expert"
       }
       if (state.expertFullName == "" || state.expertUserName == "" || state.expertEmail == "" || !validateEmail(state.expertEmail) || state.expertPhone == "" || !validatePhonenumber(state.expertPhone) || state.expertPassword == "" || state.confirmPassword == "") {
           setState({
               ...state,
               outputMessage: "Please fill proper details!"
           })
       }else if (state.expertPassword == state.confirmPassword) { 
           const data = await Services.expertConfigurations.addExpert(obj);
           if (data == 201 || data == 200) {
               setState({
                   ...state,
                   expertFullName: "",
                   expertUserName: "",
                   expertPassword: "",
                   expertEmail: "",
                   expertPhone: "",
                   role: "",
                   confirmPassword: "",
                   outputMessage:"User added successfully"
               })
           }
       } else {
           setState({
               ...state,
               outputMessage: "Confirm password not matching!"
           })
       }
       
    } 
    const handleFullnameChange = (e) => {
        setState({
            ...state,
            expertFullName: e.target.value
        });
    }
    const handleUsernameChange = (e) => {
        setState({
            ...state,
            expertUserName: e.target.value
        });
    }
    const handleEmailChange = (e) => {
        setState({
            ...state,
            expertEmail: e.target.value
        });
    }
    const handlePhoneChange = (e) => {
        setState({
            ...state,
            expertPhone: e.target.value
        });
    }
    const handlePasswordChange = (e) => {
        setState({
            ...state,
            expertPassword: e.target.value
        });
    }
    const handleConfirmPasswordChange = (e) => {
        setState({
            ...state,
            confirmPassword: e.target.value
        });
    }
  return (
    <div className="Dashboard">
          <div className="AppGlass">
              
              <SidebarAdmin />
              
              <div className="adex">
                  <h1 style={{ marginBottom: "25px" }}>{"Add New Expert"}</h1>
                  <input className="po" type="text" placeholder="Enter Full Name" value={state.expertFullName} onChange={handleFullnameChange} />
                  <input className="po" type="text" placeholder="Enter Username" value={state.expertUserName} onChange={handleUsernameChange} />
                  <input className="po" type="text" placeholder="Enter Email" value={state.expertEmail} onChange={handleEmailChange} />
                  <input className="po" type="text" placeholder="Enter Phone no." value={state.expertPhone} onChange={handlePhoneChange} />
                  <input className="po" type="password" placeholder="Enter Password" value={state.expertPassword} onChange={handlePasswordChange} />
                  <input className="po" type="password" placeholder="Confirm Password" value={state.confirmPassword} onChange={handleConfirmPasswordChange} />
                  <button className="op" style={{ marginTop: "24px" }} onClick={addExpert}>Add Expert</button>
                  <span style={{ marginTop:"7px" }}>{state.outputMessage}</span>
        </div>
      </div>
    </div>
  );
};
function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
        return false;
    }
    return true;
}
function validatePhonenumber(phoneField) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneField.match(phoneno))
    {
        return true;
    }
    else {
        return false;
    }
}

export default AddExperts;
