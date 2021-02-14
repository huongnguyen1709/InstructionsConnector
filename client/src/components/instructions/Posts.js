import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => {
  return <div></div>;
};

Posts.propTypes = {};

export default Posts;

useEffect(
  (postId, getPostByID) => {
    console.log('haha dashboard');
    getPostByID(postId);
  },
  [getPostByID]
);
console.log(user);
console.log(postId);
console.log(post);

const onAuthor = () => {
  if (user._id && user._id === post.user) {
    return <p>Posted by You</p>;
  } else {
    return <p>Posted by {post.name}</p>;
  }
};

const onActionInstruction = () => {
  if (user._id && user._id === post.user) {
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
