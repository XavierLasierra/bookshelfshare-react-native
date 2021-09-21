/* eslint-disable no-unused-vars */
interface NavigateArguments {
    name: string,
    merge: boolean
}

interface Navigation {
    push: () => void,
    navigate: (arg: NavigateArguments) => void
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
