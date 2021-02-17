import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => {
  return <div></div>;
};

Posts.propTypes = {};

export default Posts;

if (questionPopup.length == 0) {
  console.log('huong');
  return setData({
    ...data,
    index: index + 1,
  });
}
console.log(questionPopup.length);
console.log(questionPopup);
console.log(index);
if (questionPopup.length > 0 && answer === true) {
  console.log('vo duoc');
  console.log(questionPopup.length);
  return setData({
    ...data,
    index: index + 1,
    instructions: [...instructions, posts[index]],
    currentInstruction: currentInstruction,
    questionPopup: questionPopup,
  });
}
if (questionPopup.length > 0) {
  console.log(' there is a question');
  return setData({
    ...data,
    quesDisabled: false,
  });
}

if (index === posts.length - 1) {
  setData({
    ...data,
    index: 0,
    disabled: true,
  });
}
