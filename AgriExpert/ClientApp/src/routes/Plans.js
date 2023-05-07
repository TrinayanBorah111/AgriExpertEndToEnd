import React from "react";
import { GiPlantRoots } from "react-icons/gi";
import { GiTreehouse, GiGroundSprout } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import Services from '../Shared/HttpRequests';
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import {
    PricingSection,
    PricingWrapper,
    PricingHeading,
    PricingContainer,
    PricingCard,
    PricingCardInfo,
    PricingCardIcon,
    PricingCardPlan,
    PricingCardCost,
    PricingCardLength,
    PricingCardFeatures,
    PricingCardFeature,
    PricingCardFeatured,
    Button
} from "../components/pricingElements";

const Pricing = () => {
    const customerDetails = useSelector((state) => state.customerDetails)
    const navigate = useNavigate();
    const [serverResponse, setserverResponse] = useState([]);
    useEffect(() => {
        fetchResponse();
    }, []);
    const fetchResponse= async ()=> {
        let data = await Services.packageConfigurations.getAllPackages();
        data = data.map(value => {
            if (value.packageName != "NoPlan")
                return value;
        })
        let len = data.length;
        for (let i = 0; i <= len; i++) {
            var myIndex = data.indexOf(undefined);
            if (myIndex !== -1) {
                data.splice(myIndex, 1);
            }
        }
        setserverResponse(data);
    }
    const getPackageType = (pack) => {
        if (pack == "1Day")
            return "per Day";
        if (pack == "6Months")
            return "per 6 Months";
        if (pack == "1Year")
            return "per Year"
    }
    const getPackageDescription = (description) => {
        var desc = description.split(',');
        return desc;
    }
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const showRazorpay = async (selectedData) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        const options = {
            key: "rzp_test_mWF4ifAK3TBqEg",
            currency: "INR",
            amount: (selectedData.packagePrice * 100).toString(),
           // order_id: data.packagesId,
            name: "Buy Plan",
            description: "Thank you for joining with us.",
            image: "",
            handler: async function  (response)  {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                console.log(response)
                let payload = {
                    CustomerName: customerDetails?.customerName,
                    CustomerAddress: customerDetails?.customerAddress,
                    CustomerPhone: customerDetails?.customerPhone,
                    PackagesId: selectedData.packagesId
                }
                let responseData = await Services.customerConfigurations.updateCustomerWithID(customerDetails?.customersId, payload, '');
                if (responseData == 200 || responseData == 201) {
                    navigate("../dashboardcustomer", { replace: true })
                }
            },
            prefill: {
                name: "AgriExpert",
                email: "agriexpertt@gmail.com",
                phone_number: "9899999999",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    const handlePaymentClick = async (data) => {
        let customerToken = sessionStorage.getItem("authCustomerToken");
        if (customerToken == null) {
            navigate("../signup", { replace: true })
            
        } else {
            showRazorpay(data)  
        }
        
        
    }
    return (
        <>
            <Navbar />
            <IconContext.Provider value={{ color: "#a9b3c1", size: 64 }}>
                <PricingSection>
                    <PricingWrapper>
                        <PricingHeading>Our Plans</PricingHeading>
                        <PricingContainer>
                            {serverResponse.map(response => { 
                                return <PricingCard key={response.packagesId}>
                                    <PricingCardInfo>
                                        <PricingCardIcon>
                                            <GiGroundSprout />
                                        </PricingCardIcon>
                                        <PricingCardPlan>{response.packageName}</PricingCardPlan>
                                        <PricingCardCost>₹ {response.packagePrice}</PricingCardCost>
                                        <PricingCardLength>{getPackageType(response.packageType)}</PricingCardLength>

                                        {getPackageDescription(response.packageDescription).map(desc =>
                                            <PricingCardFeatures style={{ marginTop: "-12px" }}>
                                                {desc}
                                            </PricingCardFeatures>
                                        )}

                                        <Button primary onClick={() => { handlePaymentClick(response) }}>

                                            Choose Plan</Button>


                                    </PricingCardInfo>
                                </PricingCard>
                                }
                            )};
                        </PricingContainer>
                    </PricingWrapper>
                </PricingSection>
            </IconContext.Provider>
           <Footer />
        </>
    );
}
export default Pricing;
