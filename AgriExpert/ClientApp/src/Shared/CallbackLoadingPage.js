import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Shared/CallbackLoadingPage.css';
import { useSelector } from 'react-redux'
import Services from "./HttpRequests"

function CallbackLoadingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState(null); // State to store the code
    const navigate = useNavigate();
    const customerDetails = useSelector((state) => state.customerDetails)
    const [transactionID, setTransactionID] = useState(null);
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            fetch('PhonePeCallback/getCode') // Replace with your API endpoint
                .then(response => response.json())
                .then(data => {
                    setCode(data.code); // Update the state with the received code
                    setTransactionID(data.data.transactionId)
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
    const updatePackageInDatabase = async (packageID) => {
        let payload = {
            CustomerName: customerDetails?.customerName,
            CustomerAddress: customerDetails?.customerAddress,
            CustomerPhone: customerDetails?.customerPhone,
            PackagesId: packageID,
            CustomerTransactionID: transactionID
        }
        let responseData = await Services.customerConfigurations.updateCustomerWithID(customerDetails?.customersId, payload, '');
        if (responseData == 200 || responseData == 201) {
            navigate("../dashboardcustomer")
            sessionStorage.removeItem("selectedPackageToBuy")
        }
    }
    const updateTransactionIDForFailedPayment = async (packageID) => {
        let payload = {
            CustomerName: customerDetails?.customerName,
            CustomerAddress: customerDetails?.customerAddress,
            CustomerPhone: customerDetails?.customerPhone,
            PackagesId: packageID,
            CustomerTransactionID: transactionID
        }
        let responseData = await Services.customerConfigurations.updateCustomerWithID(customerDetails?.customersId, payload, '');
        if (responseData == 200 || responseData == 201) {
            navigate("../PaymentFailed")
            sessionStorage.removeItem("selectedPackageToBuy")
        }
    }
    useEffect(() => {
        if (code === 'PAYMENT_SUCCESS') {
            updatePackageInDatabase(sessionStorage.getItem("selectedPackageToBuy"))
        }
        else if (code === 'PAYMENT_ERROR') {
            let packgeID = '00000000-0000-0000-0000-000000000000'
            updateTransactionIDForFailedPayment(packgeID)
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
