import {rateBookApiSlice} from '../rateBookApiSlice';
import {
    IBook,
    IGetBookRateBookInput,
    IGetRegisteredBooksOutput,
    IPostImageOutput,
    IRegisterBookInput,
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
        registerBook: builder.mutation<IBook, IRegisterBookInput>({
            query: data => ({
                url: '/book/subscribe_book',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    await queryFulfilled;
                    dispatch(
                        bookApi.endpoints.getRegisteredBooks.initiate(1, {forceRefetch: true}),
                    );
                } catch (error) {
                    // do something
                }
            },
        }),
        getBookRateBook: builder.query<IBook, IGetBookRateBookInput>({
            query: data => `/book/check_exist?ISBN_10=${data.ISBN_10}&ISBN_13=${data.ISBN_13}`,
        }),
        getRegisteredBooks: builder.query<IGetRegisteredBooksOutput, number>({
            query: (page = 1) => `/book/get_all_book?page=${page}`,
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            merge: (currentCache, newItems, {arg}) => {
                if (arg === 1) currentCache.books = newItems.books;
                else currentCache.books.push(...newItems.books);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg;
            },
        }),
        getBookInfo: builder.query<IBook, number>({
            query: id => ({
                url: `/book/${id}`,
                method: 'GET',
            }),
        }),
        getRegisteredBookByUser: builder.query<IGetRegisteredBooksOutput, number>({
            query: id => ({
                url: `/user/get_list_sub?id=${id}&page=1`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetBooksRateBookQuery,
    usePostImageBookMutation,
    useRegisterBookMutation,
    useGetBookRateBookQuery,
    useGetRegisteredBooksQuery,
    useGetBookInfoQuery,
    useGetRegisteredBookByUserQuery,
} = bookApi;

export default bookApi;
