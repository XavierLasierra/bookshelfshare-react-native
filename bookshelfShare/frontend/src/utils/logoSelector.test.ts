import BookIcon from '../assets/bookIcon.svg';
import SearchIcon from '../assets/searchIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';
import FollowingIcon from '../assets/followingIcon.svg';
import ShelfIcon from '../assets/shelfIcon.svg';
import logoSelector from './logoSelector';

describe('Given a logoSelector function', () => {
  describe('When it is triggered', () => {
    [
      {
        param: 'SearchIcon',
        result: SearchIcon
      },
      {
        param: 'BookIcon',
        result: BookIcon
      },
      {
        param: 'ProfileIcon',
        result: ProfileIcon
      },
      {
        param: 'FollowingIcon',
        result: FollowingIcon
      },
      {
        param: 'ShelfIcon',
        result: ShelfIcon
      }
    ].forEach(({ param, result }) => {
      describe(`And it is called with ${param}`, () => {
        test(`Then should return svg ${param}`, () => {
          const returnedValue = logoSelector(param);
          expect(returnedValue).toBe(result);
        });
      });
    });
    describe('And it is called with and invalid string', () => {
      test('Then should return svg BookIcon', () => {
        const returnedValue = logoSelector('something');
        expect(returnedValue).toBe(BookIcon);
      });
    });
  });
});
