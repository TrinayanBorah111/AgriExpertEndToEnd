import React from 'react'
import "../ComponentsCustomer/askquestion.css"
import { useState, useEffect } from 'react';
import Services from "../../Shared/HttpRequests"
//let filesArray = []
const Askquestion = () => {
    const [state, setState] = useState({
        questionContext: "",
        questionTopicName: "",
        questionsTopicVariety: "",
        questionTopicGrowingSeason: "",
        questionTopicAge: "",
        questionTopicOtherDetails: "",
        questionTopicImages: "",
        questionTopicImage:null,
        customersId: ""
    });
    const askQuestion = async (event) => {
        let payload = {
            "questionContext": state.questionContext,
            "questionTopicName": state.questionTopicName,
            "questionsTopicVariety": state.questionsTopicVariety,
            "questionTopicGrowingSeason": state.questionTopicGrowingSeason,
            "questionTopicAge": state.questionTopicAge,
            "questionTopicOtherDetails": state.questionTopicOtherDetails,
            "questionTopicImages": state.questionTopicImages.toString,
            "questionTopicImage": state.questionTopicImages,
            "customersId": "81cd9a99-60ca-44b2-8438-5611a72dc50d"
        }
        console.log(state.questionTopicImage)
        event.preventDefault();
        var formData = new FormData();
        formData.append("questionContext", state.questionContext)
        formData.append("questionTopicName", state.questionTopicName)
        formData.append("questionsTopicVariety", state.questionsTopicVariety)
        formData.append("questionTopicGrowingSeason", state.questionTopicGrowingSeason)
        formData.append("questionTopicAge", state.questionTopicAge)
        formData.append("questionTopicOtherDetails", state.questionTopicOtherDetails)
        formData.append("questionTopicImages", "sample")
        formData.append("questionTopicImage", state.questionTopicImage)
        //for (let i = 0; i < filesArray.length;i++) {
        //    formData.append(`questionTopicImage[${i}]`, filesArray[i])
        //}
        formData.append("customersId", "81cd9a99-60ca-44b2-8438-5611a72dc50d")
        let data = await Services.questionConfigurations.postQuestions(formData);
    }
    const handleQuestionContent = (e) => {
        setState({
            ...state,
            questionContext:e.target.value
            })
    }
    const handleQuestionType = (e) => {
        setState({
            ...state,
            questionTopicName: e.target.value
        })
    }
    const handleQuestionVariety = (e) => {
        setState({
            ...state,
            questionsTopicVariety: e.target.value
        })
    }
    const handleQuestionAge = (e) => {
        setState({
            ...state,
            questionTopicAge: e.target.value
        })
    }
    const handleQuestionGrowingSeason = (e) => {
        setState({
            ...state,
            questionTopicGrowingSeason: e.target.value
        })
    }
    
    const handleQuestionImage = (e) => {
        //console.log(URL.createObjectURL(e.target.files[0]))
        //filesArray.push(e.target.files[0])
        //console.log(filesArray)
        setState({
            ...state,
            questionTopicImage: e.target.files[0]
        })
        //setState({
        //    ...state,
        //    //questionTopicImages: e.target.files[0]
        //    questionTopicImage: filesArray
        //    //state.questionTopicImages.length > 0 ? state.questionTopicImages + ',' + e.target.value : e.target.value
        //})
    }
    const handleQuestionDesciption = (e) => {
        setState({
            ...state,
            questionTopicOtherDetails: e.target.value
        })
    }
    return (
        <div className='question'>
            <div className='variety'>
                <div className='crop'>
                    Question:
                    <input
                        id='textField'
                        className='ppp'
                        type="text"
                        value={state.questionContext}
                        onChange={handleQuestionContent}
                        required
                    />
                </div>
                <div className='crop'>
                    Name of the Crop/Animal/Fish type:
                    <input
                        id='textField'
                        className='ppp'
                        type="text"
                        value={state.questionTopicName}
                        onChange={handleQuestionType}
                        required
                    />
                </div>

                {/* Age-Variety */}
                <div className="varieties">
                    Variety: <input
                        id='textField'
                        value={state.questionsTopicVariety}
                        onChange={handleQuestionVariety}
                        className='vvv'
                        type='text'
                        required
                    />
                    Crop Age: <input
                        id='textField'
                        value={state.questionTopicAge}
                        onChange={handleQuestionAge}
                        className='vvv'
                        type='text'
                        required />
                    <span className='season'>Growing Season: </span><input
                        id='textField'
                        value={state.questionTopicGrowingSeason}
                        onChange={handleQuestionGrowingSeason }
                        className='vvv'
                        type='text'
                        required />
                </div>


                {/* Images */}
                <div className="imageCrop">
                    Upload Photos:
                    <input  onChange={handleQuestionImage} type='file' accept="image/*" required />
                    <input  onChange={handleQuestionImage} type='file' accept="image/*" required />
                    <input  onChange={handleQuestionImage} type='file' accept="image/*" required />
                </div>

                {/* Description */}
                <div className="description">
                    Description Of the Problem: <input
                        id='textField'
                        value={state.questionTopicOtherDetails}
                        onChange={handleQuestionDesciption}
                        className='des'
                        type="text"
                        required />
                    <span className="ddd" style={{ fontWeight: 'bold' }}>
                        *Please do not upload/submit the unrelated/irrelevant photos<br />
                        **Others include request from RP, Field Visit etc</span>
                </div>
                <button className='upload' onClick={askQuestion} >
                    Upload
                </button>
            </div>
        </div>
    )
}

export default Askquestion