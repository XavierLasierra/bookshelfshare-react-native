import { BOOKSS_API } from '@env';
import axios from 'axios';
import transformQuery from '../../utils/transformQuery';
import booksActions from './books.actions';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: Action): void
}

interface Action {
    type: string,
    data?: any
}

interface Query {
    isbn?: string
}

export default function searchBooks(query: Query, token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      console.log(refreshToken);
      const transformedQuery = transformQuery(query);
      const { data } = await axios.get(BOOKSS_API.concat(`/books/search?${transformedQuery}`), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data);

      dispatch({
        type: booksActions.LOAD_BOOKS,
        data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
