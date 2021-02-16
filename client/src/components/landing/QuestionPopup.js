import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { disconnect } from 'mongoose';
import QuestionDetail from './QuestionDetail';
import e from 'express';

const QuestionPopup = ({ instruction, questions, onCloseQuestion }) => {
  const [data, setData] = useState({
    questionLoaded: [questions[0]],
    index: 0,
    answer: false,
  });

  const { questionLoaded, index, answer } = data;
  console.log(questionLoaded);

  const onAnswer = (userAnswer) => {
    setData({
      ...data,
      answer: userAnswer,
    });
  };

  const onHandleSubmit = () => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className='section'>
        <form onSubmit={onHandleSubmit}>
          {questions &&
            questions.map((question) => (
              <QuestionDetail
                key={question._id}
                question={question}
                instruction={instruction}
                onAnswer={(answer) => onAnswer(answer)}
              />
            ))}
          <div className='flex-row'>
            <button
              onClick={onCloseQuestion}
              className='btn teal lighten-1 z-depth-0'
            >
              Cancel
            </button>
            <button className='btn teal lighten-1 z-depth-0'>Answer</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

QuestionPopup.propTypes = {};

export default QuestionPopup;
