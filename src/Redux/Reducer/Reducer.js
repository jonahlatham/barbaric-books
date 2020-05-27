import { combineReducers } from 'redux';

const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const bookTitle = (state = '', action) => {
  switch (action.type) {
    case 'SET_BOOK_TITLE':
      return action.payload;
    default:
      return state;
  }
};

const authorName = (state = '', action) => {
  switch (action.type) {
    case 'SET_AUTHOR_NAME':
      return action.payload;
    default:
      return state;
  }
};

const summary = (state = '', action) => {
  switch (action.type) {
    case 'SET_SUMMARY':
      return action.payload;
    default:
      return state;
  }
};

const alcoholRating = (state = '', action) => {
  switch (action.type) {
    case 'SET_ALCOHOL_RATING':
      return action.payload;
    default:
      return state;
  }
};

const alcoholDescription = (state = '', action) => {
  switch (action.type) {
    case 'SET_ALCOHOL_DESCRIPTION':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  bookTitle,
  authorName,
  summary,
  alcoholRating,
  alcoholDescription
});
