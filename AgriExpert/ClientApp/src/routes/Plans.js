import React from "react";
import { GiPlantRoots } from "react-icons/gi";
import { GiTreehouse, GiGroundSprout } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import Services from '../Shared/HttpRequests';

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

function Pricing() {
    const [serverResponse, setserverResponse] = useState([]);
    useEffect(() => {
        fetchResponse();
    }, []);
    const fetchResponse= async ()=> {
        const data = await Services.packageConfigurations.getAllPackages()
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
    return (
        <>
            <Navbar />
            <IconContext.Provider value={{ color: "#a9b3c1", size: 64 }}>
                <PricingSection>
                    <PricingWrapper>
                        <PricingHeading>Our Plans</PricingHeading>
                        <PricingContainer>
                            {serverResponse.map(response =>
                                <PricingCard to="/signup" key={response.packagesId}>
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

                                        <Button primary>Choose Plan</Button>
                                    </PricingCardInfo>
                                </PricingCard>
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
