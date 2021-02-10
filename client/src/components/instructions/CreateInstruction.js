import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Link } from 'react-router-dom';

const CreateInstruction = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const { title, content } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      title: '',
      content: '',
    });
    history.push('/');
  };

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)} className='white'>
        <h5 className='grey-text text-darken-3'>New Instruction</h5>

        <div className='input-field'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='input-field'>
          <label htmlFor='content'>Instruction Content</label>
          <textarea
            name='content'
            value={content}
            className='materialize-textarea'
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>

        <div className='flex-row'>
          <Link to='/' className='btn teal lighten-1 z-depth-0'>
            Back
          </Link>
          <button className='btn teal lighten-1 z-depth-0'>Create</button>
        </div>
      </form>
    </div>
  );
};

CreateInstruction.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(CreateInstruction);
