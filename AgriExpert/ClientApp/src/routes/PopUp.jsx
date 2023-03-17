import "../components/popupStyles.css";
import { useState, useEffect } from "react";

const PopUp = ({ open, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(10); // start with 10 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showResend] = useState(true);

  const handleResend = () => {
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
            <h1 className="i">Enter The OTP</h1>
            <input className="otp" placeholder="OTP" />
          </div>

          <div className="timer-buttons">
            <button type="button" className="send-button">
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
