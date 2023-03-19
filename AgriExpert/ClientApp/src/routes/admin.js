import "../components/adminstyles.css";
import { GiFallingLeaf } from "react-icons/gi";
import { useState, useEffect } from 'react';
import Services from '../Shared/HttpRequests';
import { useNavigate } from "react-router-dom"

function Admin() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        userName: "",
        password: ""
    });
    const handleUsernameChange = (e) => {
        setState({
            ...state,
            userName: e.target.value
        });
    }
    const handlePasswordChange = (e) => {
        setState({
            ...state,
            password: e.target.value
        });
    }
    const loginClick = async () => {
        let obj = {
            "userName": state.userName,
            "password": state.password
        }
        const data = await Services.adminConfigurations.adminLogIn(obj);
        if (data != "Username and Password incorrect") {
            sessionStorage.setItem('authToken', data)
            navigate(`/dashboardadmin`)
        }
    }
  return (
    <>
      <div className="contai">
        <div className="admin">
          <logo-icon className="z">
            <GiFallingLeaf color="green" size="100" />
          </logo-icon>
          <h1>Admin Sign In</h1>
                  <form>
                      <input type="username" placeholder="Username" value={state.userName} onChange={handleUsernameChange} />
                      <input type="password" placeholder="Password" value={state.password} onChange={handlePasswordChange} />
              <button className="modalBtn" type="button" onClick={loginClick}>
                SignIn
              </button>
          </form>

         <a href = "https://toggle10.in/"
         target='_blank' className="toggle">Powered By @TOGGLE10
         </a> 
        </div>
      </div>
    </>
  );
}

export default Admin;
