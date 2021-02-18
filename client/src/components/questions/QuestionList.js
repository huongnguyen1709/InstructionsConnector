import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getQuestions } from '../../actions/question';
import { getPostByID } from '../../actions/post';
import Spinner from '../layout/Spinner';

const QuestionList = ({
  getQuestions,
  question: { questions, loading },
  instructionId,
  getPostByID,
  post,
}) => {
  useEffect(() => {
    getQuestions();
    getPostByID(instructionId);
  }, [getQuestions, getPostByID, instructionId]);

  console.log(questions);

  questions =
    questions &&
    questions.filter((question) => {
      return question.postId === instructionId;
    });
  console.log(questions);

  const onShowQuestion = () => {
    if (questions && questions.length > 0) {
      return questions.map((question) => {
        if (question) {
          return (
            <Link
              to={{
                pathname: `/instructions/${question.postId}/questions/${question._id}/edit`,
                question,
              }}
              key={question._id}
            >
              <div className='card mt-60'>
                <div className='card-content grey-text text-darken-3'>
                  <h6 className='bold'>{question.question}</h6>
                  <div className='mt-30'>
                    <h6>
                      <span className='bold'> Option 1:</span> &nbsp;{' '}
                      <span className='italic'>{question.answer2}</span>
                    </h6>
                    <h6>
                      <span className='bold'> Option 2:</span> &nbsp;{' '}
                      <span className='italic'>{question.answer3}</span>
                    </h6>
                    <h6>
                      <span className='bold'> Option 3:</span> &nbsp;{' '}
                      <span className='italic'>{question.answer4}</span>
                    </h6>
                    <h6>
                      <span className='bold'> Right Answer:</span> &nbsp;{' '}
                      <span className='italic red-text'>
                        {question.rightAnswer}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          );
        } else {
          return (
            <h6 className='mt-60 center' key='no-question'>
              There is no question. Please add question !
            </h6>
          );
        }
      });
    } else {
      return (
        <h6 className='mt-60 center'>
          There is no question. Please add question !
        </h6>
      );
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='row'>
      <div className='col s12 m4 offset-m4'>
        <div className='card z-depth-0 instruction-summary'>
          <div className='card-content grey-text text-darken-3'>
            <span className='card-title teal-text center heading'>
              {post.title}
            </span>
            {onShowQuestion()}
            <Link
              to={`/instructions/${instructionId}`}
              className='btn teal lighten-1 z-depth-0 mt-60'
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

QuestionList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  getPostByID: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  instructionId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  question: state.question,
  instructionId: ownProps.match.params.id,
  post: state.post.post,
});

export default connect(mapStateToProps, { getQuestions, getPostByID })(
  QuestionList
);
