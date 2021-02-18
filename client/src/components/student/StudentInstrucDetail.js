import React from 'react';
import PropTypes from 'prop-types';

const StudentInstrucDetail = ({ instruction, onCloseDetail }) => {
  console.log('student instruc detail');
  return (
    <div className='section'>
      <div className='card z-depth-0'>
        <div className='card-content flex-column'>
          <span className='card-title teal-text center heading'>
            {instruction.title}
          </span>
          <p className='mt-30'>{instruction.content}</p>
        </div>
        <div className='card-action grey lighten-4 grey-text flex-row'>
          <button
            onClick={onCloseDetail}
            className='btn teal lighten-1 z-depth-0'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

StudentInstrucDetail.propTypes = {
  instruction: PropTypes.object.isRequired,
  onCloseDetail: PropTypes.func.isRequired,
};

export default StudentInstrucDetail;
