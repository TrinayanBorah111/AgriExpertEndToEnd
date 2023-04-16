import React, { useState } from 'react';
import Services from '../Shared/HttpRequests';

const options = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
];

const DropdownButton = (props) => {
    const [selectedOption, setSelectedOption] = useState(props.expertData.expertStatus);

    const handleChange = async (event) => {
        setSelectedOption(event.target.value);
        let Obj = {
            "expertFullName": props.expertData.expertFullName,
            "expertUserName": props.expertData.expertUserName,
            "expertPassword": props.expertData.expertPassword,
            "expertStatus": event.target.value,
            "expertEmail": props.expertData.expertEmail,
            "expertPhone": props.expertData.expertPhone,
            "role": props.expertData.role
        }
        const token = sessionStorage.getItem("authExpertToken");
        const expertId = sessionStorage.getItem("expertlLoggedInId");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/expert/${expertId}`, token)
        await Services.expertConfigurations.updateExpertWithID(expertId, Obj, authTokenURL);   
        
    };

    const buttonStyle = {
        width: '7%',
        height: '2.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: (props.expertData.expertStatus == 'Online' || selectedOption == 'Online') ? 'green' : 'grey',
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
        appearance: 'none',
        outline: 'none',
        cursor: 'pointer !important',
        marginLeft: '55rem',
        marginTop: '1.5rem',
        textAlign: 'center',
    };

    if (selectedOption == 'Offline') {
        buttonStyle.backgroundColor = 'grey';
    }

    return (
        <select
            value={selectedOption}
            onChange={handleChange}
            style={buttonStyle}
            
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

};

export default DropdownButton;
