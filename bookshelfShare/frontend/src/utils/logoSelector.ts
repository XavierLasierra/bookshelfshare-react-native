import BookIcon from '../assets/bookIcon.svg';
import SearchIcon from '../assets/searchIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';
import FollowingIcon from '../assets/followingIcon.svg';

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
    default:
      return BookIcon;
  }
}
