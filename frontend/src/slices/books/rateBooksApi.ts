import {rateBookApiSlice} from '../rateBookApiSlice';
import {
    IBook,
    IGetRegisteredBooksOutput,
    IPostImageInput,
    IPostImageOutput,
    IRegisterBookInput,
    IRegisterBookOutput,
    ISearchBooksInput,
    ISearchBooksOutput,
} from './rateBooksType';

export const bookApi = rateBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        getBooksRateBook: builder.query<ISearchBooksOutput, ISearchBooksInput>({
            query: data => {
                return `/book/search_book?search=${data.searchText}&page=${data.page}`;
            },
            serializeQueryArgs: ({queryArgs}) => {
                return queryArgs.searchText;
            },
            merge: (currentCache, newItems) => {
                currentCache.books.push(...newItems.books);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg?.page !== previousArg?.page;
            },
        }),
        postImageBook: builder.mutation<IPostImageOutput, FormData>({
            query: data => ({
                url: '/image/up_image',
                method: 'POST',
                body: data,
                formData: true,
            }),
        }),
        registerBook: builder.mutation<IRegisterBookOutput, IRegisterBookInput>({
            query: data => ({
                url: '/book/subscribe_book',
                method: 'POST',
                body: data,
            }),
        }),
        getBookRateBook: builder.query<IBook, string>({
            query: id => `/book?id=${id}`,
        }),
        getRegisteredBooks: builder.query<IGetRegisteredBooksOutput, number>({
            query: page => `/book/get_all_book?page=${page}`,
        }),
    }),
});

export const {
    useGetBooksRateBookQuery,
    usePostImageBookMutation,
    useRegisterBookMutation,
    useGetBookRateBookQuery,
    useGetRegisteredBooksQuery,
} = bookApi;

export default bookApi;
