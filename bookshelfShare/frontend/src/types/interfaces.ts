/* eslint-disable no-unused-vars */
interface NavigateArguments {
    name: string,
    merge: boolean,
    params?: any
}

interface Navigation {
    push: () => void,
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
