/* eslint-disable no-unused-vars */
interface INavigateArguments {
    name: string,
    merge: boolean,
    params?: any
}

interface IEmitArguments {
    type: string,
    target: string,
    canPreventDefault?: boolean
}

interface IEvent {
    defaultPrevented: boolean
}

interface INavigation {
    push: (name: string, params?: any) => void,
    navigate: (arg: INavigateArguments) => void,
    pop: () => void,
    emit: (arg: IEmitArguments) => IEvent
}

interface IRoute {
    params: any
}

export interface IAddBookToUserProps {
    bookIsbn: string,
    token: string,
    refreshToken: string,
    userId: string,
    logo: string,
    navigation: INavigation
}

export interface IAddPopUpProps {
    navigation: INavigation
}

export interface IAddToShelfProps {
    navigation: INavigation,
    route: IRoute
}

interface ITokensState {
    token: string,
    refreshToken: string
}

export interface IUserRating {
    rating: number,
    user: string,
    review: string
}

interface ICustomBookDataState {
    isLoaded: boolean,
    ratings: IUserRating[]
}

export interface IBooksState {
    results: boolean,
    books: IBookData[]
}

export interface IStore {
    tokens: ITokensState,
    userShelves: any,
    customBookData: ICustomBookDataState,
    loggedUser: any,
    books: IBooksState,
    userSocials: any,
    userBooks: any,
    notifications: string[]
}

export interface IBarCode {
    type: string,
    data: string
}

export interface IBarCodeScannerProps {
    navigation: INavigation
}

export interface IBookDetailProps {
    navigation: INavigation,
    route: IRoute
}

interface IIsbnObject {
    ISBN13: string,
    ISBN10: string
}

interface IImagesObject {
    thumbnail?: string,
    smallThumbnail: string
}

export interface IBookData {
    title: string,
    subtitle: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    language: string,
    description: string,
    isbn: IIsbnObject,
    pageCount: number | string,
    format: string,
    categories: string[],
    images: IImagesObject
}

export interface IBookElementSearchProps {
    bookData: IBookData,
    navigation: INavigation,
    logo: string
}

export interface IBookListFilterProps {
    listName: string,
    books: IBookData[],
    setFilteredBooks: (books: IBookData[]) => void
}

export interface IBookResultsProps {
    navigation: INavigation,
    route: IRoute
}

export interface IBookSearchProps {
    navigation: INavigation,
    isbnFromCamera: string
}

export interface ICustomTabBarProps {
    state: any,
    navigation: INavigation
}

export interface IFollowingProps {
    navigation: INavigation
}

export interface IHeaderProps {
    Logo: any,
    BackButton?: boolean,
    navigation?: INavigation
}

export interface IInitialLoadingProps {
    navigation: INavigation
}

export interface IListMenuProps {
    bookIsbn: string,
    userId: string,
    token: string,
    refreshToken: string
}

export interface ILoginProps {
    navigation: INavigation
}

export interface INewShelfProps {
    navigation: INavigation,
    route: IRoute
}
