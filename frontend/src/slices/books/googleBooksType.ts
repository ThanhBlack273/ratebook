import {IBook} from './rateBooksType';
export interface IGGBook {
    id: number;
    volumeInfo: {
        title: string;
        subtitle: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        industryIdentifiers?: {
            type: string;
            identifier: string;
        }[];
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
    };
}

export interface IGGBookList {
    totalItems: number;
    items: IGGBook[];
}

export interface ISearchGGBooksInput {
    searchText: string;
    page: number;
}
export interface ISearchGGBooksOutput {
    totalBooks: number;
    books: IBook[];
}
