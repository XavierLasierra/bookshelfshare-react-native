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
    user: IUser,
    review: string
}

interface ICustomBookDataState {
    isLoaded: boolean,
    ratings: IUserRating[]
}

export interface IUser {
    _id: string,
    username: string,
    email: string,
    photo: string,
    followers?: IUser[],
    following?: IUser[],
    books?: {
        read: string[],
        reading: string[],
        toRead: string[],
        wishlist: string[]
    }
}

export interface ICurrentUserState {
    results: boolean,
    user: IUser
}

export interface IBooksState {
    results: boolean,
    books: IBookData[]
}

export interface IUserBooksState {
    reading: string[],
    toRead: string[],
    wishlist: string[],
    read: string[],
}

interface ICustomInformation {
    notes?: string,
    location: number[]
}

interface IShelfBook {
    bookIsbn: string,
    customInformation: ICustomInformation
    bookData?: IBookData
}

export interface IShelf {
    users: IUser[],
    name: string,
    shelf: number[],
    books: IShelfBook
}

export interface IStore {
    tokens: ITokensState,
    userShelves: any,
    customBookData: ICustomBookDataState,
    loggedUser: any,
    books: IBooksState,
    userSocials: any,
    userBooks: IUserBooksState,
    notifications: string[],
    currentUser: any
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
    images: IImagesObject,
    _id: string
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

export interface IOtherUserProfileProps {
    navigation: INavigation,
    route: IRoute
}

export interface IProfileProps {
    navigation: INavigation
}

export interface IProfileDetailProps {
    handleBookResultsPage: (title: string, books: string[]) => void,
    userBooks: IUserBooksState,
    shelves: any
}

export interface IRatingProps {
    ratings: IUserRating[],
    isbn: string,
    token: string,
    refreshToken: string,
    userId: string
}

export interface IRatingElementProps {
    rating: IUserRating,
    yours?: boolean
}

export interface IRegisterProps {
    navigation: INavigation
}

export interface IShelfBookElement {
    bookData: IBookData,
    logo: string,
    navigation: INavigation,
    location: number[],
    shelfName: string
}

export interface IShelfBooksList {
    shelfData: any,
    logo: string,
    navigation: INavigation,
    shelfName: string
}

interface IShelfBookItem {
    customInformation: ICustomInformation,
    bookData: IBookData
}

export interface IShelfBooksListElement {
    item : IShelfBookItem
}
