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

const sexRating = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEX_RATING':
      return action.payload;
    default:
      return state;
  }
};

const sexDescription = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEX_DESCRIPTION':
      return action.payload;
    default:
      return state;
  }
};

const violenceRating = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIOLENCE_RATING':
      return action.payload;
    default:
      return state;
  }
};

const violenceDescription = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIOLENCE_DESCRIPTION':
      return action.payload;
    default:
      return state;
  }
};

const profanityRating = (state = '', action) => {
  switch (action.type) {
    case 'SET_PROFANITY_RATING':
      return action.payload;
    default:
      return state;
  }
};

const profanityDescription = (state = '', action) => {
  switch (action.type) {
    case 'SET_PROFANITY_DESCRIPTION':
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

const frighteningRating = (state = '', action) => {
  switch (action.type) {
    case 'SET_FRIGHTENING_RATING':
      return action.payload;
    default:
      return state;
  }
};

const frighteningDescription = (state = '', action) => {
  switch (action.type) {
    case 'SET_FRIGHTENING_DESCRIPTION':
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
  sexRating,
  sexDescription,
  violenceRating,
  violenceDescription,
  profanityRating,
  profanityDescription,
  alcoholRating,
  alcoholDescription,
  frighteningRating,
  frighteningDescription
});
