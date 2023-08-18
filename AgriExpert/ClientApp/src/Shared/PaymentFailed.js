import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Shared/PaymentFailed.css'; // Import your CSS file for styling

function PaymentFailedPage() {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        // Navigate to the dashboard page
        navigate("../signup") // Replace with your actual dashboard route
    };

    return (
        <div className="payment-failed-page">
            <h2>Payment Failed</h2>
            <p>Your payment has failed. Please try again later.</p>
            <button onClick={handleGoToDashboard}>Go To Dashboard</button>
        </div>
    );
}

export default PaymentFailedPage;
