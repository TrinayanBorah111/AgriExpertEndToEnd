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

    const fetchResponse = async () => {
        let data = await Services.packageConfigurations.getAllPackages();
        data = data.map(value => {
            if (value.packageName !== "NoPlan")
                return value;
        });
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
        if (pack === "3Day")
            return "per 3 Days";
        if (pack === "6Months")
            return "per 6 Months";
        if (pack === "1Year")
            return "per Year"
    }

    const getPackageDescription = (description) => {
        var desc = description.split(',');
        return desc;
    }



    const handlePaymentClick = async (data) => {
        let customerToken = sessionStorage.getItem("authCustomerToken");
        if (customerToken == null) {
            navigate("../signup", { replace: true });
        } else {
            try {
                const response = await fetch('/pg/v1/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        packagePrice: data.packagePrice
                    }),
                });

                if (response.ok) {
                    const responseData = await response.text();
                   // console.log('Payment request response:', JSON.parse(responseData));
                    //  console.log('URL:', JSON.parse(responseData).data.instrumentResponse.redirectInfo.url);
                    sessionStorage.setItem("selectedPackageToBuy", data.packagesId);
                    window.open(JSON.parse(responseData).data.instrumentResponse.redirectInfo.url, '_self');
                  
                    // Redirect the user to the payment page or perform any other necessary action
                } else {
                    console.error('Error sending payment request:', response.statusText);
                    // Handle the error as needed
                }
            } catch (error) {
                console.error('Error sending payment request:', error);
                // Handle the error as needed
            }
        }
    };

    return (
        <>
            <Navbar />
            <IconContext.Provider value={{ color: "#a9b3c1", size: 64 }}>
                <PricingSection>
                    <PricingWrapper>
                        <PricingHeading>Our Plans</PricingHeading>
                        <PricingContainer>
                            {serverResponse.map(response => {
                                return (
                                    <PricingCard key={response.packagesId}>
                                        <PricingCardInfo>
                                            <PricingCardIcon>
                                                <GiGroundSprout />
                                            </PricingCardIcon>
                                            <PricingCardPlan>{response.packageName}</PricingCardPlan>
                                            <PricingCardCost>₹ {response.packagePrice}</PricingCardCost>
                                            <PricingCardLength>{getPackageType(response.packageType)}</PricingCardLength>

                                            {getPackageDescription(response.packageDescription).map((desc, index) => (
                                                <PricingCardFeatures key={index} style={{ marginTop: "-12px" }}>
                                                    {desc}
                                                </PricingCardFeatures>
                                            ))}

                                            <Button primary onClick={() => { handlePaymentClick(response) }}>
                                                Choose Plan
                                            </Button>
                                        </PricingCardInfo>
                                    </PricingCard>
                                );
                            })}
                        </PricingContainer>
                    </PricingWrapper>
                </PricingSection>
            </IconContext.Provider>
            <Footer />
        </>
    );
}

export default Pricing;
