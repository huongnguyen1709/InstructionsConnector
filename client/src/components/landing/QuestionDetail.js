import React from 'react';
import PropTypes from 'prop-types';

const QuestionDetail = ({ question, instruction, onAnswer }) => {
  const handleOptionChange = (e) => {
    const selectedAnswer = e.target.value;
    const answer = selectedAnswer === question.rightAnswer ? true : false;
    onAnswer(answer);
  };

  return (
    <div key={question.id} className='card z-depth-0'>
      <div className='card-content flex-column'>
        <span className='card-title teal-text center heading'>
          {instruction.title}
        </span>

        <h6>{question.question}</h6>
        <h6>
          <label>
            <input
              className='with-gap'
              name={`${question._id}`}
              type='radio'
              value={question.rightAnswer}
              onChange={handleOptionChange}
            />
            <span>{question.rightAnswer}</span>
          </label>
        </h6>
        <h6>
          <label>
            <input
              className='with-gap'
              name={`${question._id}`}
              type='radio'
              value={question.answer2}
              onChange={handleOptionChange}
            />
            <span>{question.answer2}</span>
          </label>
        </h6>
        <h6>
          <label>
            <input
              className='with-gap'
              name={`${question._id}`}
              type='radio'
              value={question.answer3}
              onChange={handleOptionChange}
            />
            <span>{question.answer3}</span>
          </label>
        </h6>
        <h6>
          <label>
            <input
              className='with-gap'
              name={`${question._id}`}
              type='radio'
              value={question.answer4}
              onChange={handleOptionChange}
            />
            <span>{question.answer4}</span>
          </label>
        </h6>
      </div>
    </div>
  );
};

QuestionDetail.propTypes = {};

export default QuestionDetail;
