import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QuestionDetail from './QuestionDetail';

const QuestionPopup = ({
  instruction,
  questions,
  onCloseQuestion,
  onUserAnswer,
}) => {
  const [data, setData] = useState({
    index: 0,
    answer: false,
  });

  const { index, answer } = data;

  const onAnswer = (userAnswer) => {
    setData({
      ...data,
      answer: userAnswer,
    });
  };
  console.log(answer);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    onUserAnswer(answer);
    if (answer === true && index < questions.length - 1) {
      setData({
        ...data,
        index: index + 1,
      });
    } else {
      onCloseQuestion();
    }
  };

  return (
    <Fragment>
      <div className='section'>
        <form onSubmit={onHandleSubmit}>
          <QuestionDetail
            question={questions[index]}
            instruction={instruction}
            onAnswer={(answer) => onAnswer(answer)}
          />
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
