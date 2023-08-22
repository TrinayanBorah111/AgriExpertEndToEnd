import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimationPage.css';

const AnimationPage = () => {
    const navigate = useNavigate();
    const [animationVisible, setAnimationVisible] = useState(false);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (animationVisible && countdown > 0) {
            const interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        } else if (animationVisible && countdown === 0) {
            setTimeout(() => {

                setAnimationVisible(false);
                navigate("../");
            }, 6000); 
        }
    }, [animationVisible, countdown, navigate]);

    const handleLaunchClick = () => {
        setAnimationVisible(true);
    };

    return (
        <div className="animation-container">
            {animationVisible ? (
                <div className="animation">
                    {countdown > 0 ? (
                        <div className="countdown-number">{countdown}</div>
                    ) : (
                            <div>
                            <div className="welcome-message">Welcome To AgriExpertt</div>
                            <div className="box-canvas">
                                <div className="balloon-wrapper red">
                                    <div className="string"></div>
                                    <div className="balloon"></div>
                                </div>
                                <div className="balloon-wrapper green">
                                    <div className="string"></div>
                                    <div className="balloon"></div>
                                </div>
                                <div className="balloon-wrapper orange">
                                    <div className="string"></div>
                                    <div className="balloon"></div>
                                </div>
                                <div className="balloon-wrapper blue">
                                    <div className="string"></div>
                                    <div className="balloon"></div>
                                </div>
                                <div className="balloon-wrapper yellow">
                                    <div className="string"></div>
                                    <div className="balloon"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="animation-heading">We Are Few Steps Away From Solving Problems</h2>
                    <button className="launch-button" onClick={handleLaunchClick}>
                        <h2>Launch</h2>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnimationPage;
