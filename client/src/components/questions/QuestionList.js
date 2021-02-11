import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QuestionList = (props) => {
  return (
    <Link
      to={
        '/instruction/' +
        instructionId +
        '/' +
        title +
        '/question/' +
        ques.id +
        '/edit'
      }
      key={ques.id}
    >
      <div className='card mt-60'>
        <div className='card-content grey-text text-darken-3'>
          <h6 className='bold'>{ques.question}</h6>
          <div className='mt-30'>
            <h6>
              <span className='bold'> Option 1:</span> &nbsp;{' '}
              <span className='italic'>{ques.answer2}</span>
            </h6>
            <h6>
              <span className='bold'> Option 2:</span> &nbsp;{' '}
              <span className='italic'>{ques.answer3}</span>
            </h6>
            <h6>
              <span className='bold'> Option 3:</span> &nbsp;{' '}
              <span className='italic'>{ques.answer4}</span>
            </h6>
            <h6>
              <span className='bold'> Right Answer:</span> &nbsp;{' '}
              <span className='italic red-text'>{ques.rightAnswer}</span>
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

QuestionList.propTypes = {};

export default QuestionList;
