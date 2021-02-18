import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editQuestion, deleteQuestion } from '../../actions/question';

const EditQuestion = ({
  prevQuestion,
  editQuestion,
  deleteQuestion,
  history,
  instructionId,
  questionId,
}) => {
  const [formData, setFormData] = useState({
    question: prevQuestion.question,
    rightAnswer: prevQuestion.rightAnswer,
    answer2: prevQuestion.answer2,
    answer3: prevQuestion.answer3,
    answer4: prevQuestion.answer4,
  });

  const { question, rightAnswer, answer2, answer3, answer4 } = formData;
  console.log(question);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editQuestion(formData, prevQuestion._id);
    history.push(`/instructions/${instructionId}`);
  };

  const onDeleteQuestion = () => {
    deleteQuestion(prevQuestion._id);
    history.push(`/instructions/${instructionId}`);
  };

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)} className='white'>
        <h5 className='grey-text text-darken-3'>Edit Question</h5>

        <div className='input-field'>
          <label className={question ? 'active' : null} htmlFor='question'>
            Question
          </label>
          <input
            type='text'
            name='question'
            value={question}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='input-field'>
          <label
            className={rightAnswer ? 'active' : null}
            htmlFor='rightAnswer'
          >
            Right Answer
          </label>
          <textarea
            name='rightAnswer'
            value={rightAnswer}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='input-field'>
          <label className={answer2 ? 'active' : null} htmlFor='answer2'>
            Answer 2
          </label>
          <textarea
            name='answer2'
            value={answer2}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='input-field'>
          <label className={answer3 ? 'active' : null} htmlFor='answer3'>
            Answer 3
          </label>
          <textarea
            name='answer3'
            value={answer3}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='input-field'>
          <label className={answer4 ? 'active' : null} htmlFor='answer4'>
            Answer 4
          </label>
          <textarea
            name='answer4'
            value={answer4}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='flex-row'>
          <Link
            to={`/instructions/${instructionId}/questions`}
            className='btn teal lighten-1 z-depth-0'
          >
            Cancel
          </Link>
          <div>
            <button className='btn teal lighten-1 z-depth-0 mr-30'>Save</button>
            <button
              onClick={onDeleteQuestion}
              className='btn teal lighten-1 z-depth-0'
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

EditQuestion.propTypes = {
  prevQuestion: PropTypes.object.isRequired,
  instructionId: PropTypes.string,
  editQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  prevQuestion: ownProps.location.question,
  instructionId: ownProps.match.params.instructionId,
});

export default connect(mapStateToProps, { editQuestion, deleteQuestion })(
  EditQuestion
);
