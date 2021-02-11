import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_QUESTIONS,
  QUESTION_ERROR,
  DELETE_QUESTION,
  ADD_QUESTION,
  EDIT_QUESTION,
} from './types';

// Get questions
export const getQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/questions');

    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete question
export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/questions/${id}`);

    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    });

    dispatch(setAlert('Question Removed', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add question
export const addQuestion = (newQuestion) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/questions', newQuestion, config);
    dispatch({
      type: ADD_QUESTION,
      payload: res.data,
    });

    dispatch(setAlert('Question Added', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit question
export const editQuestion = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/questions/${id}`, formData, config);
    console.log(res.data);
    dispatch({
      type: EDIT_QUESTION,
      payload: res.data,
    });

    dispatch(setAlert('Question Edited', 'success'));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
