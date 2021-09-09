import { BOOKSS_API } from '@env';
import axios from 'axios';
import transformQuery from '../../utils/transformQuery';
import booksActions from './books.actions';
import notificationsActions from './notifications.actions';
import refreshUserToken from './tokens.creator';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: any): void
}

interface Query {
    isbn?: string,
    inauthor?: string,
    intitle?: string,
    inpublisher?: string
}

export function searchBooks(query: Query, token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      const transformedQuery = transformQuery(query);
      const { data } = await axios.get(BOOKSS_API.concat(`/books/search?${transformedQuery}`), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: booksActions.LOAD_BOOKS,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(searchBooks(query, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.ISBN_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function clearBooks() {
  return {
    type: booksActions.CLEAR_BOOKS
  };
}

export function getRatings(isbn: string, token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(BOOKSS_API.concat(`/books/rating/${isbn}`), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: booksActions.LOAD_RATINGS,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(getRatings(isbn, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.ISBN_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function clearBook() {
  return {
    type: booksActions.CLEAR_BOOK
  };
}

export function saveRating(isbn: string, ratingInfo: any, token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      if (isbn === 'Not found') {
        return dispatch({
          type: notificationsActions.REVIEW_ISBN_NOT_FOUND
        });
      }

      const { data } = await axios.post(BOOKSS_API.concat(`/books/rating/${isbn}`), ratingInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return dispatch({
        type: booksActions.UPDATE_RATINGS,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          return dispatch(saveRating(isbn, ratingInfo, newToken, refreshToken));
        } catch {
          return dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        return dispatch({
          type: notificationsActions.ISBN_ERROR
        });
      } else {
        return dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function getBooksData(bookIsbnArray: string[], token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(BOOKSS_API.concat('/books/getData'), bookIsbnArray, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: booksActions.LOAD_BOOKS,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(getBooksData(bookIsbnArray, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.ISBN_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}
