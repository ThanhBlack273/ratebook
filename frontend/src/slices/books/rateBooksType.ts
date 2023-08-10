import {Asset} from 'react-native-image-picker';

export interface IBook {
    id: number;
    ISBN_10?: string;
    ISBN_13?: string;
    title: string;
    subtitle?: string;
    author?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ISearchBooksOutput {
    totalBooks: number;
    totalPages: number;
    currentPage: number;
    books: IBook[];
}

export interface ISearchBooksInput {
    searchText: string;
    page: number;
}

export interface IPostImageInput {
    photoBook: undefined | Asset;
    oldLink: string;
}

export interface IPostImageOutput {
    photoLink: string;
}

export interface IRegisterBookInput {
    title: string;
    subtitle: string;
    author: string[];
    publisher: string;
    publishedDate: string;
    ISBN_10: string;
    ISBN_13: string;
    description: string;
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
}

export interface IRegisterBookOutput {
    title: string;
    subtitle: string;
    author: string[];
    publisher: string;
    publishedDate: string;
    ISBN_10: string;
    ISBN_13: string;
    description: string;
    photoLink: string;
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
}

export interface IGetRegisteredBooksOutput {
    totalBooks: number;
    totalPages: number;
    currentPage: number;
    books: IBook[];
}
