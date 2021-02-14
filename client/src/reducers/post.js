import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  GET_POST_BY_ID,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  loadingById: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST_BY_ID:
      console.log(payload);
      return {
        ...state,
        post: payload,
        loading: false,
        loadingById: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
