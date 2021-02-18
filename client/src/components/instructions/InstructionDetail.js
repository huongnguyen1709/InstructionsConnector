import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { deletePost, getPostByID } from '../../actions/post';

const InstructionDetail = ({
  user,
  post: { post, loadingById },
  deletePost,
  getPostByID,
  history,
  postId,
  isAuthenticated,
}) => {
  useEffect(() => {
    getPostByID(postId);
  }, [getPostByID, postId]);

  const onAuthor = () => {
    if (isAuthenticated && user._id && user._id === post.user) {
      return <p>Posted by You</p>;
    } else {
      return <p>Posted by {post.name}</p>;
    }
  };

  const onActionInstruction = () => {
    if (isAuthenticated && user._id && user._id === post.user) {
      return (
        <div>
          <Link
            to={'/instructions/' + post._id + '/newQuestion'}
            className='btn teal lighten-1 z-depth-0 mr-30'
          >
            Add Question
          </Link>
          <Link
            to={{
              pathname: `/instructions/${post._id}/edit`,
              post,
            }}
            className='btn teal lighten-1 z-depth-0 mr-30'
          >
            Edit
          </Link>
          <button
            onClick={(e) => {
              deletePost(post._id);
              history.push('/');
            }}
            className='btn teal lighten-1 z-depth-0'
          >
            Delete
          </button>
        </div>
      );
    }
  };

  return loadingById ? (
    <Spinner />
  ) : (
    <div className='container section'>
      <div className='card z-depth-0'>
        <div className='card-content flex-column'>
          <span className='card-title teal-text center heading'>
            {post.title}
          </span>
          <p className='mt-30'>{post.content}</p>
        </div>
        <div className='card-action grey lighten-4 grey-text flex-row'>
          <Link to='/' className='btn teal lighten-1 z-depth-0'>
            Back
          </Link>
          <span className='center'>
            {onAuthor()}
            <div>{post.date}</div>
          </span>
          {isAuthenticated ? (
            <Link
              to={'/instructions/' + post._id + '/questions'}
              className='btn teal lighten-1 z-depth-0 mr-30'
            >
              See Question
            </Link>
          ) : null}
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
  getPostByID: PropTypes.func.isRequired,
  postId: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    postId: ownProps.match.params.id,
    post: state.post,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { deletePost, getPostByID })(
  InstructionDetail
);
