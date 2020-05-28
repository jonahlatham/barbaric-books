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

const comments = (state = '', action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return action.payload;
    case 'SUBMIT':
      return '';
    default:
      return state;
  }
};

const setBook = (state = '', action) => {
  switch (action.type) {
    case 'SET_BOOK':
      return action.payload;
    default:
      return state;
  }
};

const bookTitle = (state = '', action) => {
  switch (action.type) {
    case 'SET_BOOK_TITLE':
      return action.payload;
    case 'RESET':
      return '';
    default:
      return state;
  }
};

const authorName = (state = '', action) => {
  switch (action.type) {
    case 'SET_AUTHOR_NAME':
      return action.payload;
    case 'RESET':
      return '';
    default:
      return state;
  }
};

const summary = (state = '', action) => {
  switch (action.type) {
    case 'SET_SUMMARY':
      return action.payload;
    case 'RESET':
      return '';
    default:
      return state;
  }
};

const reviews = (state = [], action) => {
  switch (action.type) {
    case 'SET_INITIAL_REVIEWS_STATE':
      return action.payload.map(e => {
        return {
          id: e.Id,
          genreRating: '',
          description: ''
        };
      });
    case 'UPDATE_GENRE_RATING':
      return state.map(e => {
        if (e.id === action.payload.id) {
          e.genreRating = action.payload.genreRating;
        }
        return e;
      });
    case 'UPDATE_GENRE_DESCRIPTION':
      return state.map(e => {
        if (e.id === action.payload.id) {
          e.description = action.payload.description;
        }
        return e;
      });
    case 'RESET':
      return state.map(e => {
        return {
          id: e.Id,
          genreRating: '',
          description: ''
        };
      });
    default:
      return state;
  }
};

export default combineReducers({
  user,
  bookTitle,
  authorName,
  summary,
  reviews,
  setBook,
  comments
});
