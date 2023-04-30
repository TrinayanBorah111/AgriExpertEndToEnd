import React from 'react';
import "./Modal.css";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import Services from '../Shared/HttpRequests';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import image from "../Images/27ed3a84-71f8-466b-9445-a04411081fa9/signature.png"


const PopUp = (props) => {
    const getExtension = (filename) => {
        return filename.split('.').pop()
    }
    const [state, setState] = useState({
        questionAnswer: props.selectedRow.questionAnswer,
        questionStatus: props.selectedRow.questionStatus,
        assignedExpertId: props.selectedRow.expertsId,
        questionFeedback: props.selectedRow.questionFeedback,
        anyUpdate: false,
        editAnswer: false,
        img: props.selectedRow.questionTopicImages,
        fileType: getExtension(props.selectedRow.questionTopicImages.toLowerCase())
    })
    const [questionPending, setquestionPending] = React.useState(0);
    const expertList = useSelector((state) => state.expertDetails)
    
    const handleAnswerChange = (e) => {
        setState({
            ...state,
            questionAnswer: e.target.value,
            anyUpdate:true
        });
    }
    const handleQuestionStatusChange = (e) => {
        setState({
            ...state,
            questionStatus: e.target.value,
            anyUpdate:true
        });
    }
    const handleQuestonFeedback = (e) => {
        setState({
            ...state,
            questionFeedback: e.target.value,
            anyUpdate:true
        });
    }
    const handleUpdate = async () => {
        let obj = {
            "questionContext": props.selectedRow.questionContext,
            "questionStatus": "InProgress",
            "questionAnswer": state.questionAnswer,
            "questionTopicName": props.selectedRow.questionTopicName,
            "questionsTopicVariety": props.selectedRow.questionsTopicVariety,
            "questionTopicGrowingSeason": props.selectedRow.questionTopicGrowingSeason,
            "questionTopicAge": props.selectedRow.questionTopicAge,
            "questionTopicOtherDetails": props.selectedRow.questionTopicOtherDetails,
            "questionTopicImages": props.selectedRow.questionTopicImages,
            "questionFeedback": props.selectedRow.questionFeedback,
            "expertsId": props.selectedRow.experts.expertsId
        }
        const token = sessionStorage.getItem("authExpertToken");
        const expertId = sessionStorage.getItem("expertlLoggedInId");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/expert/${expertId}`, token)
        await Services.questionConfigurations.updateQuestionWithID(props.selectedRow.questionsId, obj, authTokenURL)
        props.handleClose()
        window.location.reload();
    }
    const handleUpdateStatus = async (status) => {
        let Obj = {
            "expertFullName": props.selectedRow.expertFullName,
            "expertUserName": props.selectedRow.expertUserName,
            "expertPassword": props.selectedRow.expertPassword,
            "expertStatus": status,
            "expertEmail": props.selectedRow.expertEmail,
            "expertPhone": props.selectedRow.expertPhone,
            "role": props.selectedRow.role
        }
        const token = sessionStorage.getItem("authToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/expert/${props.selectedRow.expertsId}`, token)
        await Services.expertConfigurations.updateExpertWithID(props.selectedRow.expertsId, Obj, authTokenURL);
        window.location.reload();
    }
    const handleUpdateAssign = async () => {
        let obj = {
            "questionContext": props.selectedRow.questionContext,
            "questionStatus": "InProgress",
            "questionAnswer": props.selectedRow.questionAnswer,
            "questionTopicName": props.selectedRow.questionTopicName,
            "questionsTopicVariety": props.selectedRow.questionsTopicVariety,
            "questionTopicGrowingSeason": props.selectedRow.questionTopicGrowingSeason,
            "questionTopicAge": props.selectedRow.questionTopicAge,
            "questionTopicOtherDetails": props.selectedRow.questionTopicOtherDetails,
            "questionTopicImages": props.selectedRow.questionTopicImages,
            "questionFeedback": props.selectedRow.questionFeedback,
            "expertsId": state.assignedExpertId
        }
        const token = sessionStorage.getItem("authToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/${state.assignedExpertId}`, token)
        await Services.questionConfigurations.updateQuestionWithID(props.selectedRow.questionsId, obj, authTokenURL)
        props.handleClose()
        window.location.reload();
    }
    const handleUpdateApprove = async () => {
        let obj = {
            "questionContext": props.selectedRow.questionContext,
            "questionStatus": "Answered",
            "questionAnswer": props.selectedRow.questionAnswer,
            "questionTopicName": props.selectedRow.questionTopicName,
            "questionsTopicVariety": props.selectedRow.questionsTopicVariety,
            "questionTopicGrowingSeason": props.selectedRow.questionTopicGrowingSeason,
            "questionTopicAge": props.selectedRow.questionTopicAge,
            "questionTopicOtherDetails": props.selectedRow.questionTopicOtherDetails,
            "questionTopicImages": props.selectedRow.questionTopicImages,
            "questionFeedback": props.selectedRow.questionFeedback,
            "expertsId": props.selectedRow.experts.expertsId
        }
        const token = sessionStorage.getItem("authToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/${props.selectedRow.experts.expertsId}`, token)
        await Services.questionConfigurations.updateQuestionWithID(props.selectedRow.questionsId, obj, authTokenURL)
        props.handleClose()
        window.location.reload();
    }
    const handleExpertChange = async (event) => {
        setState({
            ...state,
            anyUpdate: event.target.value=="SelectExpert"?false:true,
            assignedExpertId: event.target.value
        })
        const token = sessionStorage.getItem("authToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/expert/${event.target.value}`, token)
        let data = await Services.questionConfigurations.getAllQuestionsWithExpertID(event.target.value, authTokenURL);
        let questionCount = data.filter(element => {
            if (element.questionStatus == "InProgress") {
                return true;
            }
            return false;
        }).length;
        setquestionPending(questionCount)
    }
    const handleEditAnswerClick = () => {
        setState({
            ...state,
            editAnswer: true,
        });
    }
    const handleUpdateFeedback = async () => {
        let obj = {
            "questionContext": props.selectedRow.questionContext,
            "questionStatus": "InProgress",
            "questionAnswer": props.selectedRow.questionAnswer,
            "questionTopicName": props.selectedRow.questionTopicName,
            "questionsTopicVariety": props.selectedRow.questionsTopicVariety,
            "questionTopicGrowingSeason": props.selectedRow.questionTopicGrowingSeason,
            "questionTopicAge": props.selectedRow.questionTopicAge,
            "questionTopicOtherDetails": props.selectedRow.questionTopicOtherDetails,
            "questionTopicImages": props.selectedRow.questionTopicImages,
            "questionFeedback": state.questionFeedback,
            "expertsId": props.selectedRow.experts.expertsId
        }
        const token = sessionStorage.getItem("authToken");
        let authTokenURL = await Services.authConfigurations.getAuthURL(`/question/${props.selectedRow.experts.expertsId}`, token)
        await Services.questionConfigurations.updateQuestionWithID(props.selectedRow.questionsId, obj, authTokenURL)
        props.handleClose()
        window.location.reload();
    }
    const checkTabType = () => {
        if (props.role == "Expert") {
            if (props.tab == "Solved") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Question Answer: "}</b> {props.selectedRow.questionAnswer}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>
                        <div><b>{"Images: "}</b> {props.selectedRow.questionTopicImages}</div>
                        <img src={require(`../Images/${props.selectedRow.customersId}/${state.img}`)} />
                    </>
                )
            } else if (props.tab == "UnSolved") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>
                        <div><b>{"Question Descripton: "}</b> {props.selectedRow.questionTopicOtherDetails}</div>
                        <div><b>{"Question Answer: "}</b></div>
                        <textarea className='inputAreaField' onChange={handleAnswerChange} placeholder="Enter the answer" value={state.questionAnswer} />
                        {/*<div>
                            <b>{"Question Status: "}</b>
                            <select className="dropdownField" onChange={handleQuestionStatusChange} value={state.questionStatus}>
                                <option key={1} value={"InProgress"}>
                                    InProgress
                                </option>
                                <option key={2} value={"Answered"}>
                                    Answered
                                </option>
                                ))
                            </select>
                        </div>*/}
                    </>
                )
            } else if (props.tab == "InProgress") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Question Answer: "}</b> {props.selectedRow.questionAnswer}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>

                        {props.selectedRow.questionFeedback !== "-" ?
                            <div style={{ color: '#FF6A00' }}><b>{"Feedback by Admin: "}</b> {props.selectedRow.questionFeedback}
                                <Button variant="outlined" onClick={handleEditAnswerClick} style={{ float: 'right' }}>Edit Answer</Button></div>
                            :
                            <div><b>{"Feedback by Admin: "}</b>{"(No Feedback yet)"}</div>}
                        {state.editAnswer ? <div style={{ marginTop: '7px' }}>

                            <div><b>{"Update Answer: "}</b></div>
                            <textarea className='inputAreaField' onChange={handleAnswerChange} placeholder="Enter the answer" value={state.questionAnswer} />

                        </div> : <></>}
                        <img style={{ marginTop: "10px" }} src={require(`../Images/${props.selectedRow.customersId}/${state.img}`)} />
                    </>
                )
            }
        }
        else if (props.role == "Admin") {
            if (props.tab == "Expert" || props.tab == "RevokeExpert") {
                return (
                    <>
                        <div><b>{"Expert Name: "}</b> {props.selectedRow.expertFullName}</div>
                        <div><b>{"Expert Phone: "}</b> {props.selectedRow.expertPhone}</div>
                        <div><b>{"Expert Email: "}</b> {props.selectedRow.expertEmail}</div>

                    </>
                )
            } else if (props.tab == "Unsolved") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div>
                            <b>{"Experts List: "}</b>
                            <select className="dropdownField" onChange={() => { handleExpertChange(event) }} value={state.assignedExpertId}>
                                <option key={"SelectExpert"} value={"SelectExpert"}>
                                    Select Expert
                                </option>
                                {expertList.map((option) => (
                                    <option key={option.expertsId} value={option.expertsId}>
                                        {option.expertFullName}
                                    </option>
                                ))}
                                ))
                            </select>

                        </div>
                        <div style={{ marginTop: "7px" }}><b>{"Questions on queue: "}{questionPending}</b></div>
                    </>
                )
            } else if (props.tab == "Solved") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Question Answer: "}</b> {props.selectedRow.questionAnswer}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>
                        <div><b>{"Images: "}</b> {props.selectedRow.questionTopicImages}</div>
                        <img src={require(`../Images/${props.selectedRow.customersId}/${state.img}`)} />
                    </>
                )
            } else if (props.tab == "Customer") {
                return (
                    <>
                        <div><b>{"Cutomer Name: "}</b> {props.selectedRow.customerName}</div>
                        <div><b>{"Cutomer Phone: "}</b> {props.selectedRow.customerPhone}</div>
                        <div><b>{"Cutomer Address: "}</b> {""}</div>
                        <div><b>{"Plan Name: "}</b> {props.selectedRow.packages.packageName}</div>
                        <div><b>{"Plan Price: "}</b> {props.selectedRow.packages.packagePrice}</div>
                        <div><b>{"Plan Type: "}</b> {props.selectedRow.packages.packageType}</div>
                        <div><b>{"Plan Description: "}</b> {props.selectedRow.packages.packageDescription}</div>

                    </>
                )
            } else if (props.tab == "InProgress") {
                console.log(props.selectedRow.questionTopicImages.toString())
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Question Answer: "}</b> {props.selectedRow.questionAnswer}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>
                        <div><b>{"Give Feedback: "}</b>
                            <textarea className='inputAreaField1' placeholder="Give Feedback" onChange={() => handleQuestonFeedback(event)} value={state.questionFeedback} />
                        </div>
                        <center >
                        {state.fileType == "jpg" || state.fileType == "png" || state.fileType == "jpeg" || state.fileType == "gif"?

                            < img src={require(`../Images/${props.selectedRow.customersId}/${state.img}`)} />
                            : <button className="op" >Downlaod File</button>
                         }
                        </center>
                    </>
                )
            } else if (props.tab == "Orders") {
                return (
                    <>
                        <div><b>{"Order Requirement: "}</b> {props.selectedRow.ordersRequirement}</div>
                        <div><b>{"Address: "}</b> {props.selectedRow.ordersAddress}</div>
                        <div><b>{"Phone: "}</b> {props.selectedRow.ordersPhone}</div>
                        <div><b>{"Placed by: "}</b> {props.selectedRow.customers.customerName}</div>
                       
                    </>
                )
            }
        }
        else if (props.role == "Customer") {
            if (props.tab == "Solved") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Question Answer: "}</b> {props.selectedRow.questionAnswer}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>
                        <div><b>{"Images: "}</b> {props.selectedRow.questionTopicImages}</div>
                        <img src={require(`../Images/${props.selectedRow.customersId}/${state.img}`)} />
                    </>
                )
            }
            if (props.tab == "UnSolved") {
                return (
                    <>
                        <div><b>{"Question Context: "}</b> {props.selectedRow.questionContext}</div>
                        <div><b>{"Growing Season: "}</b> {props.selectedRow.questionTopicGrowingSeason}</div>
                        <div><b>{"Variety: "}</b> {props.selectedRow.questionsTopicVariety}</div>
                        <div><b>{"Topic Name: "}</b> {props.selectedRow.questionTopicName}</div>
                        <img src={require(`../Images/${props.selectedRow.customersId}/${state.img}`)} />
                    </>
                )
            }
        }
    }
    return (
        <Dialog open={true} className="dialogWrapper">
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, width: "400px" }}>
                        <center><b>{"Details of selected item"}</b></center>
                    </Typography>
                    
                </div>
            </DialogTitle>
                <DialogContent dividers>
                {checkTabType()}  
                </DialogContent>
            <div className="buttonClass">
                <p style={{ float: 'left', fontSize: '12px' }}>{ props.role == 'Expert'?"Asked by- "+props.selectedRow.customers.customerName:""}</p>
                {props.role == 'Admin' && props.tab == 'Solved' ? <p style={{ float: 'left', fontSize: '12px' }}>{"Answered by- " + props.selectedRow.experts.expertFullName}</p>:<></>}
                <Button variant="contained" color="success" onClick={props.handleClose} style={{ float: 'right', marginLeft: '10px' }}>Close</Button>
                {props.role == 'Expert' && props.tab == "UnSolved" ? <Button disabled={!state.anyUpdate} variant="contained" onClick={handleUpdate} color="success" style={{ float: 'right' }}>Update</Button> : <></>}
                {props.role == 'Expert' && props.tab == "InProgress" && state.editAnswer == true ? <Button disabled={!state.anyUpdate} variant="contained" onClick={handleUpdate} color="success" style={{ float: 'right' }}>Update</Button> : <></>}
                {props.role == 'Admin' && props.tab == "Expert" ? <Button variant="contained" onClick={() => handleUpdateStatus("Revoked")} color="error" style={{ float: 'right' }}>Revoke</Button> : <></>}
                {props.role == 'Admin' && props.tab =='RevokeExpert'? <Button variant="contained" onClick={() => handleUpdateStatus("-")} color="success" style={{ float: 'right' }}>Reactive</Button>:<></>}
                {props.role == 'Admin' && props.tab == 'Unsolved' ? <Button variant="contained" disabled={!state.anyUpdate} onClick={handleUpdateAssign} color="success" style={{ float: 'right' }}>Assign</Button> : <></>}
                {props.role == 'Admin' && props.tab == 'InProgress' && state.anyUpdate == false ? <Button variant="contained" onClick={handleUpdateApprove} color="success" style={{ float: 'right' }}>Approve</Button> : <></>}
                {props.role == 'Admin' && props.tab == 'InProgress' && state.anyUpdate == true? <Button variant="contained" onClick={handleUpdateFeedback} color="success" style={{ float: 'right' }}>Submit Feedback</Button>:<></>}
            </div>
        </Dialog>
    );
};

export default PopUp;