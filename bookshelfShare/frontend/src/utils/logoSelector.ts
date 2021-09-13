import BookIcon from '../assets/bookIcon.svg';
import SearchIcon from '../assets/searchIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';
import FollowingIcon from '../assets/followingIcon.svg';
import ShelfIcon from '../assets/shelfIcon.svg';

export default function logoSelector(logoName: string) {
  switch (logoName) {
    case 'SearchIcon':
      return SearchIcon;
    case 'BookIcon':
      return BookIcon;
    case 'ProfileIcon':
      return ProfileIcon;
    case 'FollowingIcon':
      return FollowingIcon;
    case 'ShelfIcon':
      return ShelfIcon;
    default:
      return BookIcon;
  }
}
