import "../components/adminstyles.css";
import { GiFallingLeaf } from "react-icons/gi";

function Admin() {
  return (
    <>
      <div className="contai">
        <div className="admin">
          <logo-icon className="z">
            <GiFallingLeaf color="green" size="100" />
          </logo-icon>
          <h1>Admin Sign In</h1>
          <form>
            <input type="username" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <a href="/dashboardadmin">
              <button className="modalBtn" type="button">
                Send
              </button>
            </a>
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
