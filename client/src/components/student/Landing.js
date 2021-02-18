import React, { useEffect, Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { getQuestions } from '../../actions/question';
import InstructionSummary from '../instructions/InstructionSummary';
import QuestionPopup from './QuestionPopup';
import StudentInstrucDetail from './StudentInstrucDetail';
import { compose } from 'redux';

const Landing = ({
  isAuthenticated,
  getPosts,
  post: { posts, loading },
  getQuestions,
  questions,
  alert,
}) => {
  const [data, setData] = useState({
    index: 0,
    instructions: [],
    instruction: null,
    disabled: false,
    quesDisabled: true,
    showQuestion: false,
    showDetail: false,
    questionPopup: [],
    currentInstruction: null,
    answer: true,
  });

  const {
    disabled,
    quesDisabled,
    index,
    instructions,
    showQuestion,
    showDetail,
    instruction,
    questionPopup,
    currentInstruction,
    answer,
  } = data;

  useEffect(() => {
    getPosts();
    getQuestions();
  }, [getPosts, getQuestions]);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const onMoveToNextIns = () => {
    const newInstruction = posts[index];
    if (answer === true && newInstruction) {
      if (index === posts.length - 1) {
        setData({
          ...data,
          index: 0,
          disabled: true,
        });
      }

      const questionPopup =
        questions &&
        questions.filter((question) => question.postId === newInstruction._id);

      if (questionPopup && questionPopup.length > 0) {
        return setData({
          ...data,
          answer: false,
          quesDisabled: false,
          questionPopup: questionPopup,
          currentInstruction: newInstruction,
          instructions: [...instructions, newInstruction],
          index: index + 1,
        });
      }

      return setData({
        ...data,
        instructions: [...instructions, newInstruction],
        index: index + 1,
        quesDisabled: true,
        questionPopup: null,
      });
    } else if (!newInstruction) {
      return setData({
        ...data,
        disabled: true,
      });
    } else {
      console.log('you need to answer first');
      alert.show('You need to pass all the questions');
    }
  };

  return loading ? (
    <Spinner />
  ) : posts ? (
    <Fragment>
      <div className='container'>
        <div className={showDetail || showQuestion ? 'row invisible' : 'row'}>
          <div className='col s12 m6 offset-m2'>
            <div className='section'>
              {instructions &&
                instructions.map((instruction) => {
                  return (
                    <div
                      key={instruction._id}
                      className='card'
                      onClick={(e) =>
                        setData({
                          ...data,
                          showDetail: true,
                          instruction: instruction,
                        })
                      }
                    >
                      <InstructionSummary instruction={instruction} />
                    </div>
                  );
                })}
            </div>

            {/* Button to show Next Instruction Summary */}
            <button
              disabled={disabled}
              onClick={onMoveToNextIns}
              className='btn waves-effect waves-light flex-row'
            >
              See Instructions
              <i className='material-icons '>arrow_downward</i>
            </button>

            <button
              disabled={quesDisabled}
              onClick={(e) => setData({ ...data, showQuestion: true })}
              className='btn waves-effect waves-light flex-row mt-30'
            >
              Question PopUp
            </button>
          </div>
        </div>
      </div>

      <div className={showDetail ? 'popup' : null}>
        {showDetail ? (
          <StudentInstrucDetail
            instruction={instruction}
            onCloseDetail={(e) => setData({ ...data, showDetail: false })}
          />
        ) : null}
      </div>

      <div className={showQuestion ? 'popup' : null}>
        {showQuestion ? (
          <QuestionPopup
            instruction={currentInstruction}
            questions={questionPopup}
            onCloseQuestion={(e) =>
              setData({ ...data, showQuestion: false, answer: e })
            }
          />
        ) : null}
      </div>
    </Fragment>
  ) : (
    <p>There is no instruction. Please add instruction !</p>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  getPosts: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  post: state.post,
  questions: state.question.questions,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, { getPosts, getQuestions })
)(Landing);
