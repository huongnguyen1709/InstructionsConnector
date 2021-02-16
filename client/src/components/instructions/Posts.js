import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => {
  return <div></div>;
};

Posts.propTypes = {};

export default Posts;



<div className={showDetail ? 'popup' : null}>
          {showDetail ? (
            <StudentInstrucDetail
              instruction={instruction}
              onCloseDetail={onCloseDetail}
            />
          ) : null}
        </div>

        <div className={showQuestion ? 'popup' : null}>
          {showQuestion ? (
            <QuestionPopup
              instruction={currentInstruction}
              questions={questionPopup}
              onCloseQuestion={onCloseQuestion}
            />
          ) : null}
        </div>