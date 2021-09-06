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
