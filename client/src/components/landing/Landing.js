import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { getQuestions } from '../../actions/question';
import InstructionSummary from '../instructions/InstructionSummary';
import QuestionPopup from './QuestionPopup';
import StudentInstrucDetail from './StudentInstrucDetail';
import { set } from 'mongoose';

const Landing = ({
  isAuthenticated,
  getPosts,
  post: { posts, loading },
  getQuestions,
  questions,
}) => {
  useEffect(() => {
    getPosts();
    getQuestions();
  }, [getPosts, getQuestions]);

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
    answer: false,
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

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const onSeeInstruction = (index, newInstruction) => {
    console.log('seeIntructions');
    console.log(posts[index]);
    setData({
      instructions: [...instructions, posts[index]],
      currentInstruction: newInstruction,
    });
  };

  const onMoveToNextIns = () => {
    const newInstruction = posts[index];

    const questionPopup =
      questions &&
      questions.filter((question) => question.postId === posts[index]._id);
    if (newInstruction) {
      console.log('co newIntruction');
      setData({
        ...data,
        instructions: [...instructions, newInstruction],
        currentInstruction: newInstruction,
      });
    }
    if (questionPopup.length > 0) {
      setData({
        ...data,
        quesDisabled: false,
        disabled: true,
        questionPopup: questionPopup,
      });
      if (answer === true) {
        setData({
          ...data,
          index: index + 1,
          quesDisabled: true,
          disabled: false,
        });
      }
    } else if (index === posts.length - 1) {
      setData({
        ...data,
        index: 0,
        disabled: true,
      });
    } else {
      setData({
        ...data,
        index: index + 1,
      });
    }
  };

  console.log('index', index);
  console.log('questionPopup', questionPopup);
  console.log('instructions', instructions);
  console.log('current Intruction', currentInstruction);

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
            onCloseQuestion={(e) => setData({ ...data, showQuestion: false })}
            onUserAnswer={(userAnswer) =>
              setData({ ...data, answer: userAnswer })
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

export default connect(mapStateToProps, { getPosts, getQuestions })(Landing);
