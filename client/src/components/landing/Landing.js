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
    showQuestion: false,
    showDetail: false,
    questionPopup: [],
    currentInstruction: null,
  });

  const {
    disabled,
    index,
    instructions,
    showQuestion,
    showDetail,
    instruction,
    questionPopup,
    currentInstruction,
  } = data;

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const onMoveToNextIns = () => {
    const currentInstruction = posts[index];
    const questionPopup =
      questions &&
      questions.filter(
        (question) => question.postId === currentInstruction._id
      );
    console.log(questionPopup);
    if (questionPopup.length > 0) {
      console.log('there is a question will be popup in next intruction');
    }

    setData({
      ...data,
      index: index + 1,
      instructions: [...instructions, posts[index]],
      questionPopup: questionPopup,
      currentInstruction: currentInstruction,
    });
  };

  const onShowQuestion = () => {
    setData({ ...data, showQuestion: true });
  };

  const onCloseDetail = () => {
    setData({
      ...data,
      showDetail: false,
    });
  };

  const onCloseQuestion = () => {
    setData({
      ...data,
      showQuestion: false,
    });
  };

  console.log(showQuestion);
  console.log(index);
  console.log(instructions);
  console.log(questionPopup);

  return loading ? (
    <Spinner />
  ) : posts ? (
    <Fragment>
      <div className={showDetail ? 'container relative' : 'container'}>
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
              onClick={onShowQuestion}
              className='btn waves-effect waves-light flex-row mt-30'
            >
              Question PopUp
            </button>
          </div>
        </div>
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
