import {transformResponseGGBook} from '../../common/utils/heaper';
import {googleBookApiSlice} from '../googleApiSlice';
import {IGGBook, IGGBookList, ISearchGGBooksInput, ISearchGGBooksOutput} from './googleBooksType';
import {IBook} from './rateBooksType';

const BOOKS_PER_PAGE = 10;

export const googleBooksApi = googleBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        getBooksGoogle: builder.query<ISearchGGBooksOutput, ISearchGGBooksInput>({
            query: data =>
                `/books/v1/volumes?q=${data.searchText}&startIndex=${
                    (data.page - 1) * BOOKS_PER_PAGE
                }&maxResults=${BOOKS_PER_PAGE}`,
            transformResponse: (response: IGGBookList, meta, arg): ISearchGGBooksOutput => {
                return {
                    totalBooks: response.totalItems,
                    books: response.items.map(transformResponseGGBook),
                };
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
        getGGBook: builder.query<IBook, string>({
            query: id => `/books/v1/volumes/${id}`,
            transformResponse: (response: IGGBook, meta, arg): IBook => {
                return transformResponseGGBook(response);
            },
        }),
    }),
});

export const {useGetBooksGoogleQuery, useGetGGBookQuery} = googleBooksApi;

export default googleBooksApi;
