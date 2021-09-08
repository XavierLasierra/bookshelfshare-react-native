import BookIcon from '../assets/bookIcon.svg';
import SearchIcon from '../assets/searchIcon.svg';

export default function logoSelector(logoName: string) {
  switch (logoName) {
    case 'SearchIcon':
      return SearchIcon;
    case 'BookIcon':
      return BookIcon;
    default:
      return BookIcon;
  }
}
