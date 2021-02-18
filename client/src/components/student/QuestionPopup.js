import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import QuestionDetail from './QuestionDetail';

const QuestionPopup = ({
  instruction,
  questions,
  onCloseQuestion,
  onCancelQuestion,
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

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (answer === true && index < questions.length - 1) {
      setData({
        ...data,
        index: index + 1,
      });
    } else onCloseQuestion(answer);
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
              onClick={onCancelQuestion}
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

QuestionPopup.propTypes = {
  instruction: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  onCloseQuestion: PropTypes.func.isRequired,
  onCancelQuestion: PropTypes.func,
};

export default QuestionPopup;
