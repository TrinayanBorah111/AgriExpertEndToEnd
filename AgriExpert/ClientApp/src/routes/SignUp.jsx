import "../components/SignUpstyles.css";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import Services from "../Shared/HttpRequests"
import { useNavigate } from "react-router-dom"

function Sign() {
    const navigate = useNavigate();
    useEffect(() => {
        validateAuthToken();
    }, []);
    const validateAuthToken = () => {
        let authToken = sessionStorage.getItem("authCustomerToken");
        if (authToken != null || authToken != undefined) {
            navigate("/dashboardcustomer")
        } else {
            navigate("/signup")
        }
  }
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({
      phoneNumber:""
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onBlur" });
  const onSubmit = async (data) => {  
      setOpenModal(true);
      setState({
          ...state,
          phoneNumber: data.phone
      })
    await Services.customerConfigurations.getOTPVerification(data.phone)
    reset();
  };


  return (
    <>
      <Navbar />

      <div>
        <div className="MainContainer">
          <div className="pic">
            <img
              src="https://images.pexels.com/photos/2228306/pexels-photo-2228306.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <div className="container1">
              <div className="container">
                <div className="admin">
                  <h1>Sign In</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      placeholder="Enter Your Phone no"
                      {...register("phone", {
                        required: "Phn no. is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Invalid phone number"
                        }
                      })}
                    />
                    {errors.phone && <small>{errors.phone.message}</small>}

                    <button className="modalBtn" type="submit">
                      Send
                    </button>
                    {openModal && (
                      <PopUp
                        open={openModal}
                        phone={state.phoneNumber}
                        onClose={() => setOpenModal(false)}
                      ></PopUp>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Sign;
