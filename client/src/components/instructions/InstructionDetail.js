import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/post';

const InstructionDetail = ({ user: { _id }, post, deletePost }) => {
  const onAuthor = () => {
    if (_id && _id === post.user) {
      return <p>Posted by You</p>;
    } else {
      return <p>Posted by {post.name}</p>;
    }
  };
  console.log(_id);
  console.log(post.user);

  const onActionInstruction = () => {
    if (_id && _id === post.user) {
      return (
        <div>
          <Link
            to={'/instruction/' + post._id + '/edit'}
            className='btn teal lighten-1 z-depth-0 mr-30'
          >
            Edit
          </Link>
          <Link
            to={'/instruction/' + post._id + '/newQuestion'}
            className='btn teal lighten-1 z-depth-0 mr-30'
          >
            Add Question
          </Link>

          <button
            onClick={(e) => deletePost(post._id)}
            className='btn teal lighten-1 z-depth-0'
          >
            Delete
          </button>
        </div>
      );
    } else {
      return (
        <Link
          to={'/instruction/' + post._id + '/question'}
          className='btn teal lighten-1 z-depth-0 mr-30'
        >
          See Question
        </Link>
      );
    }
  };

  return (
    <div className='container section'>
      <div className='card z-depth-0'>
        <div className='card-content flex-column'>
          <span className='card-title teal-text center heading'>
            {post.title}
          </span>
          <p className='mt-30'>{post.text}</p>
        </div>
        <div className='card-action grey lighten-4 grey-text flex-row'>
          <Link to='/' className='btn teal lighten-1 z-depth-0'>
            Back
          </Link>
          <span className='center'>
            {onAuthor()}
            <div>{post.date}</div>
          </span>
          {onActionInstruction()}
        </div>
      </div>
    </div>
  );
};

InstructionDetail.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  post: ownProps.location.post,
  user: ownProps.location.user,
});

export default connect(mapStateToProps, { deletePost })(InstructionDetail);
