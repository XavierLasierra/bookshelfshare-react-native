/* eslint-disable no-unused-vars */
interface INavigateArguments {
    name: string,
    merge: boolean,
    params?: any
}

interface INavigation {
    push: (name: string, params: any) => void,
    navigate: (arg: INavigateArguments) => void,
    pop: () => void
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
    books: IBooksState
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
