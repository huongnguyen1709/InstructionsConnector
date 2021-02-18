import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editPost } from '../../actions/post';

const EditInstruction = ({ post, editPost, history, instructionId }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });

  const { title, content } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editPost(formData, post._id);
    setFormData({
      title: '',
      content: '',
    });
    history.push('/');
  };

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)} className='white'>
        <h5 className='grey-text text-darken-3'>Edit Instruction</h5>

        <div className='input-field'>
          <label className={title ? 'active' : null} htmlFor='title'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='input-field'>
          <label className={title ? 'active' : null} htmlFor='content'>
            Instruction Content
          </label>
          <textarea
            name='content'
            value={content}
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
          <button className='btn teal lighten-1 z-depth-0'>Save</button>
        </div>
      </form>
    </div>
  );
};

EditInstruction.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  post: ownProps.location.post,
  instructionId: ownProps.match.params.id,
});

export default connect(mapStateToProps, { editPost })(EditInstruction);
