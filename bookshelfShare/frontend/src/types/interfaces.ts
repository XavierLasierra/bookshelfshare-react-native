export interface AddBookToUserProps {
    bookIsbn: string,
    token: string,
    refreshToken: string,
    userId: string,
    logo: string,
    navigation: Navigation
}

interface Navigation {
    push: () => void
}
