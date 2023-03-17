import React, { useState } from 'react';
import axios from 'axios';
import '../ComponentsCustomer/askquestion.css';

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Question:', question);
    axios.post('/api/questions', { question })
      .then(response => {
        console.log('Question added successfully!', response.data);
        setSubmitSuccess(true);
        setQuestion('');
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="alert success">
          Question submitted successfully!
        </div>
      )}
      <label htmlFor="question-input">
        Ask a question:
        <input
          type="text"
          id="question-input"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question here..."
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
