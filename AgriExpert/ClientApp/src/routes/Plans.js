//import React from "react";
//import { GiPlantRoots } from "react-icons/gi";
//import { GiTreehouse, GiGroundSprout } from "react-icons/gi";
//import { IconContext } from "react-icons/lib";
//import Navbar from "../components/navbar";
//import Footer from "../components/Footer";

//import {
//  PricingSection,
//  PricingWrapper,
//  PricingHeading,
//  PricingContainer,
//  PricingCard,
//  PricingCardInfo,
//  PricingCardIcon,
//  PricingCardPlan,
//  PricingCardCost,
//  PricingCardLength,
//  PricingCardFeatures,
//  PricingCardFeature,
//  PricingCardFeatured,
//  Button
//} from "../components/pricingElements";

//function Pricing() {
//  return (
//    <>
//      <Navbar />
//      <IconContext.Provider value={{ color: "#a9b3c1", size: 64 }}>
//        <PricingSection>
//          <PricingWrapper>
//            <PricingHeading>Our Plans</PricingHeading>
//            <PricingContainer>
//              <PricingCard to="/signup">
//                <PricingCardInfo>
//                  <PricingCardIcon>
//                    <GiGroundSprout />
//                  </PricingCardIcon>
//                  <PricingCardPlan>Sprout Pack</PricingCardPlan>
//                  <PricingCardCost>₹ 50</PricingCardCost>
//                  <PricingCardLength>per day</PricingCardLength>
//                  <PricingCardFeatures>
//                    <PricingCardFeatured>
//                      - Ask 10 questions
//                    </PricingCardFeatured>
//                    <PricingCardFeatured>
//                      - Upload in jpeg format
//                    </PricingCardFeatured>
//                    <PricingCardFeatured>- Expert support</PricingCardFeatured>
//                  </PricingCardFeatures>
//                  <Button primary>Choose Plan</Button>
//                </PricingCardInfo>
//              </PricingCard>
//              <PricingCard to="/signup">
//                <PricingCardInfo>
//                  <PricingCardIcon>
//                    <GiPlantRoots />
//                  </PricingCardIcon>
//                  <PricingCardPlan>Plant Pack</PricingCardPlan>
//                  <PricingCardCost>₹ 499</PricingCardCost>
//                  <PricingCardLength>per 6 months</PricingCardLength>
//                  <PricingCardFeatures>
//                    <PricingCardFeature>
//                      - Ask 20 questions/day
//                    </PricingCardFeature>
//                    <PricingCardFeature>
//                      - Upload in any file format
//                    </PricingCardFeature>
//                    <PricingCardFeature>- Chat with expert</PricingCardFeature>
//                    <PricingCardFeature>- Expert support</PricingCardFeature>
//                  </PricingCardFeatures>
//                  <Button primary>Choose Plan</Button>
//                </PricingCardInfo>
//              </PricingCard>
//              <PricingCard to="/signup">
//                <PricingCardInfo>
//                  <PricingCardIcon>
//                    <GiTreehouse />
//                  </PricingCardIcon>
//                  <PricingCardPlan>Tree Pack</PricingCardPlan>
//                  <PricingCardCost>₹ 999</PricingCardCost>
//                  <PricingCardLength>per year</PricingCardLength>
//                  <PricingCardFeatures>
//                    <PricingCardFeature>
//                      - Ask unlimited questions
//                    </PricingCardFeature>
//                    <PricingCardFeature>
//                      - Upload in any file format
//                    </PricingCardFeature>
//                    <PricingCardFeature>
//                      - Chat & talk with experts
//                    </PricingCardFeature>
//                    <PricingCardFeature>- Get instant reply</PricingCardFeature>
//                  </PricingCardFeatures>
//                  <Button primary>Choose Plan</Button>
//                </PricingCardInfo>
//              </PricingCard>
//            </PricingContainer>
//          </PricingWrapper>
//        </PricingSection>
//      </IconContext.Provider>
//      <Footer />
//    </>
//  );
//}
//export default Pricing;


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
