import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {Platform} from 'react-native';
import {IGGBook} from '../../slices/books/googleBooksType';
import {IBook} from '../../slices/books';

interface ErrorFormServer {
    [key: string]: string | ErrorFormServer | ErrorFormServer[];
}

interface FormError {
    status: 422;
    data: {
        error: ErrorFormServer;
    };
}
interface PayloadError {
    status: number;
    data: {
        error: string;
    };
}

export const isAllValidFieldOfObject = (obj: any): Boolean => {
    let isAllValidField = true;
    for (const idx in obj) {
        isAllValidField = isAllValidField && Boolean(obj[idx]);
    }
    return isAllValidField;
};

export const isAllInValidFieldOfObject = (obj: any): Boolean => {
    let isAllValidField = false;
    for (const idx in obj) {
        isAllValidField = isAllValidField || Boolean(obj[idx]);
    }
    return !isAllValidField;
};
export const createFormData = (obj: any) => {
    const data = new FormData();

    Object.keys(obj).forEach(key => {
        if (obj[key]) {
            if (typeof obj[key] === 'object' && obj[key] !== null && 'uri' in obj[key]) {
                data.append(key, {
                    name: obj[key].fileName,
                    type: obj[key].type,
                    uri: Platform.OS === 'ios' ? obj[key].uri.replace('file://', '') : obj[key].uri,
                });
            }
            if (typeof obj[key] === 'object' && obj[key] !== null && obj[key] instanceof Date) {
                data.append(key, (obj[key] as Date).toISOString());
            } else {
                data.append(key, obj[key]);
            }
        }
    });

    return data;
};

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === 'object' && error !== null && 'status' in error;
};

export const isFormError = (error: unknown): error is FormError => {
    return (
        isFetchBaseQueryError(error) &&
        error.status === 422 &&
        typeof error.data === 'object' &&
        typeof error.data !== null
    );
};

export const isPayloadError = (payload: unknown): payload is PayloadError => {
    return (
        typeof payload === 'object' &&
        payload !== null &&
        'data' in payload &&
        'error' in (payload as any).data &&
        typeof (payload as any).data.error === 'string'
    );
};
export const transformResponseGGBook = (item: IGGBook): IBook => ({
    id: item.id,
    author: item.volumeInfo.authors,
    ISBN_10: item.volumeInfo.industryIdentifiers?.find(e => e.type === 'ISBN_10')?.identifier,
    ISBN_13: item.volumeInfo.industryIdentifiers?.find(e => e.type === 'ISBN_13')?.identifier,
    description: item.volumeInfo.description,
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail,
    publishedDate: item.volumeInfo.publishedDate,
    publisher: item.volumeInfo.publisher,
    title: item.volumeInfo.title,
    subtitle: item.volumeInfo.subtitle,
});
