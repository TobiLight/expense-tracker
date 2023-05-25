import type { User } from '$lib/types';
import { users } from './users';

export const getUserByUsername = (username: string): User => {
    const user = getAllUsers().filter(user => user.username === username)[0];
    return user;
}

export const validatePassword = (password: string, dbPassword: string) => {
    return password === dbPassword;
}

export const getAllUsers = (): User[] => {
   return users
}