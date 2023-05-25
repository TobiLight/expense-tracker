export type User = {
    id: number,
    fullname?: string
    username: string
    password: string
}

export type ClientUser = {
    fullname?: string
    username: string
    password: string
    cpassword: string
}