import React from 'react';
import PropTypes from 'prop-types';

const InstructionSummary = ({ user, instruction, isAuthenticated }) => {
  const onAuthor = () => {
    if (isAuthenticated && user._id && user._id === instruction.user) {
      return <p>Posted by You</p>;
    } else {
      return <p>Posted by {instruction.name}</p>;
    }
  };

  return (
    <div className='card z-depth-0 instruction-summary'>
      <div className='card-content grey-text text-darken-3'>
        <span className='card-title font-weight-350'>{instruction.title}</span>

        <div className='mt-30'>
          {onAuthor()}
          <p className='grey-text'>{instruction.date}</p>
        </div>
      </div>
    </div>
  );
};

InstructionSummary.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  instruction: PropTypes.object.isRequired,
};

export default InstructionSummary;
