import "../components/popupStyles.css";
import { useState, useEffect } from "react";
import Services from "../Shared/HttpRequests";
import { useNavigate } from "react-router-dom"

const PopUp = ({ open, onClose, phone }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10); // start with 10 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showResend] = useState(true);
  const [state, setState] = useState({
      OTP: "",
      otpNotMatching:false
  });

  const verifyOTP = async () => {
      let data = await Services.customerConfigurations.verifyOTP(phone, state.OTP)
      if (data.customersId != null) {
          sessionStorage.setItem('authCustomerToken', data.customersId)
          navigate(`/dashboardcustomer`)
      } else if (data.response == "OTPNotMatching") {
          setState({
              ...state,
              otpNotMatching: true
          })
      } else {
          navigate("/signup")
      }
  }

  const handleOTPChange = (event) => {
      setState({
          ...state,
          OTP:event.target.value
      })
  }
  const handleResend = async () => {
    await Services.customerConfigurations.getOTPVerification(phone)
    setTimeLeft(10); // reset timeLeft to 10 seconds
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 0) {
          clearInterval(intervalId);
          setIsRunning(false);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, timeLeft]);
  if (!open) return null;

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="PopUpContainer"
      >
        <img
          className="s"
          src="https://images.pexels.com/photos/95215/pexels-photo-95215.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="PopUpRight">
          <p onClick={onClose} className="closeBtn">
            X
          </p>
          <div className="content">
           <h1 className="i" style={{ marginLeft: "10%",
                          width: "max-content"
                      }}>Enter The OTP</h1>
           <input className="otp" style={{ margin:"auto" }} placeholder="OTP" value={state.OTP} onChange={handleOTPChange} />
             {state.otpNotMatching?<>OTP Not correct!</>:<></> }
          </div>

          <div className="timer-buttons">
                      <button type="button" className="send-button" style={{ margin: "auto", marginBottom: "10px"}} onClick={verifyOTP}>
              Submit
            </button>

            {isRunning && <p>Time left: {timeLeft} Seconds</p>}
            {showResend && (
              <button
                type="button"
                className="resend-button"
                onClick={handleResend}
                disabled={isRunning}
              >
                Resend
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
