/* eslint-disable no-unused-vars */
interface NavigateArguments {
    name: string,
    merge: boolean,
    params?: any
}

interface Navigation {
    push: (name: string, params: any) => void,
    navigate: (arg: NavigateArguments) => void,
    pop: () => void
}

interface Route {
    params: any
}

export interface AddBookToUserProps {
    bookIsbn: string,
    token: string,
    refreshToken: string,
    userId: string,
    logo: string,
    navigation: Navigation
}

export interface AddPopUpProps {
    navigation: Navigation
}

export interface AddToShelfProps {
    navigation: Navigation,
    route: Route
}

interface TokensState {
    token: string,
    refreshToken: string
}

export interface UserRating {
    rating: number,
    user: string,
    review: string
}

interface CustomBookDataState {
    isLoaded: boolean,
    ratings: UserRating[]
}

export interface Store {
    tokens: TokensState,
    userShelves: any,
    customBookData: CustomBookDataState,
    loggedUser: any
}

export interface BarCode {
    type: string,
    data: string
}

export interface BarCodeScannerProps {
    navigation: Navigation
}

export interface BookDetailProps {
    navigation: Navigation,
    route: Route
}

interface IsbnObject {
    ISBN13: string,
    ISBN10: string
}

interface ImagesObject {
    thumbnail?: string,
    smallThumbnail: string
}

interface BookData {
    title: string,
    subtitle: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    language: string,
    description: string,
    isbn: IsbnObject,
    pageCount: number | string,
    format: string,
    categories: string[],
    images: ImagesObject
}

export interface BookElementSearchProps {
    bookData: BookData,
    navigation: Navigation,
    logo: string
}

export interface BookListFilterProps {
    listName: string,
    books: BookData[],
    setFilteredBooks: (books: BookData[]) => void
}
