export {
    default as rateBookApi,
    useGetBooksRateBookQuery,
    usePostImageBookMutation,
    useRegisterBookMutation,
    useGetBookRateBookQuery,
    useGetRegisteredBooksQuery,
} from './rateBooksApi';

export {
    default as googleBookApi,
    useGetBooksGoogleQuery,
    useGetGGBookQuery,
} from './googleBooksAPI';

export type {
    IBook,
    IRegisterBookInput,
    IRegisterBookOutput,
    IPostImageInput,
    IPostImageOutput,
    ISearchBooksInput,
    ISearchBooksOutput,
} from './rateBooksType';
