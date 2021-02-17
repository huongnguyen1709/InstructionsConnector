import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => {
  return <div></div>;
};

Posts.propTypes = {};

export default Posts;

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
