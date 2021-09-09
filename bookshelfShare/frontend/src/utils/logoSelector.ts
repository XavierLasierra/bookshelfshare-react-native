import BookIcon from '../assets/bookIcon.svg';
import SearchIcon from '../assets/searchIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';

export default function logoSelector(logoName: string) {
  switch (logoName) {
    case 'SearchIcon':
      return SearchIcon;
    case 'BookIcon':
      return BookIcon;
    case 'ProfileIcon':
      return ProfileIcon;
    default:
      return BookIcon;
  }
}
