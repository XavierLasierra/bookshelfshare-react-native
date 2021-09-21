/* eslint-disable no-unused-vars */
interface NavigateArguments {
    name: string,
    merge: boolean
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

export interface Store {
    tokens: TokensState,
    userShelves: any
}
