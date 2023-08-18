import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Shared/CallbackLoadingPage.css';

function CallbackLoadingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState(null); // State to store the code
    const navigate = useNavigate();


    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            fetch('PhonePeCallback/getCode') // Replace with your API endpoint
                .then(response => response.json())
                .then(data => {
                    setCode(data.code); // Update the state with the received code
                    setIsLoading(false); // Loading complete
                })
                .catch(error => {
                    console.error('Error fetching code:', error);
                    console.log(code);
                    setIsLoading(false); // Loading complete even in case of an error
                });
        }, 3000);
        // Fetch the "code" from the server
        return () => {
            clearTimeout(loadingTimeout);
        };
    }, []);

    useEffect(() => {
        if (code === 'PAYMENT_SUCCESS') {
            navigate("../dashboardcustomer")
        }
        else if (code === 'PAYMENT_ERROR') {
            navigate("../PaymentFailed")
        }
    }, [code]);

    return (
        <div className="loading-page">
            <h2>Verifying Your Payment</h2>
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <h2>Loading Complete</h2>
            )}
        </div>
    );
}

export default CallbackLoadingPage;
