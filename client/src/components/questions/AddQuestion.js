import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/question';
import { Link } from 'react-router-dom';

const AddQuestion = ({ addQuestion, history, instructionId }) => {
  const [formData, setFormData] = useState({
    question: '',
    rightAnswer: '',
    answer2: '',
    answer3: '',
    answer4: '',
  });

  console.log(instructionId);
  const { question, rightAnswer, answer2, answer3, answer4 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      ...formData,
      instructionId: instructionId,
    };
    addQuestion(newQuestion);
    setFormData({
      question: '',
      rightAnswer: '',
      answer2: '',
      answer3: '',
      answer4: '',
    });
    history.push('/');
  };

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)} className='white'>
        <h5 className='grey-text text-darken-3'>Add Question</h5>

        <div className='input-field'>
          <label htmlFor='question'>Question</label>
          <input
            type='text'
            name='question'
            value={question}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='input-field'>
          <label htmlFor='rightAnswer'>Right Answer</label>
          <textarea
            name='rightAnswer'
            value={rightAnswer}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='input-field'>
          <label htmlFor='answer2'>Answer 2</label>
          <textarea
            name='answer2'
            value={answer2}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='input-field'>
          <label htmlFor='answer3'>Answer 3</label>
          <textarea
            name='answer3'
            value={answer3}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='input-field'>
          <label htmlFor='answer4'>Answer4</label>
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
            to={`/instructions/${instructionId}`}
            className='btn teal lighten-1 z-depth-0'
          >
            Cancel
          </Link>
          <button className='btn teal lighten-1 z-depth-0'>Add</button>
        </div>
      </form>
    </div>
  );
};

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  instructionId: PropTypes.string,
};
const mapStateToProps = (state, ownProps) => ({
  instructionId: ownProps.match.params.id,
});

export default connect(mapStateToProps, { addQuestion })(AddQuestion);
