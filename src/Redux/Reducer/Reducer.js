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
export default combineReducers({ user, bookTitle });
