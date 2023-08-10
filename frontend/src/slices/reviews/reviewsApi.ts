import bookApi from '../books/rateBooksApi';
import {rateBookApiSlice} from '../rateBookApiSlice';
import {RootState} from '../store';
import {
    ICreateCommentInput,
    ICreateCommentOutput,
    IEditCommentInput,
    IEditCommentOutput,
    IGetReviewsOutput,
} from './reviewsType';

const reviewsApi = rateBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query<IGetReviewsOutput, number>({
            query: data => ({
                url: `/action/review/getall?page=${data}`,
                method: 'GET',
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.reviews.push(...newItems.reviews);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg;
            },
        }),
        getReviewsByBook: builder.query<IGetReviewsOutput, {id: number; page: number}>({
            query: data => ({
                url: `/book/${data.id}/get_review_list?page=${data.page}`,
                method: 'GET',
            }),
            serializeQueryArgs: ({queryArgs}) => {
                return queryArgs.id;
            },
            merge: (currentCache, newItems, {arg}) => {
                if (arg.page === 1) currentCache.reviews = newItems.reviews;
                else currentCache.reviews.push(...newItems.reviews);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg?.page !== previousArg?.page;
            },
        }),
        getReviewsByUserId: builder.query<IGetReviewsOutput, {id: number; page: number}>({
            query: data => ({
                url: `/user/get_list_reviewed?id=${data.id}&page=${data.page}`,
                method: 'GET',
            }),
            serializeQueryArgs: ({queryArgs}) => {
                return queryArgs.id;
            },
            merge: (currentCache, newItems, {arg}) => {
                if (arg.page === 1) currentCache.reviews = newItems.reviews;
                else currentCache.reviews.push(...newItems.reviews);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg?.page !== previousArg?.page;
            },
        }),
        createComment: builder.mutation<ICreateCommentOutput, ICreateCommentInput>({
            query: data => ({
                url: '/action/review/add_review',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    await queryFulfilled;
                    dispatch(
                        bookApi.endpoints.getBookInfo.initiate(Number(arg.bookId), {
                            forceRefetch: true,
                        }),
                    );
                    dispatch(
                        reviewsApi.endpoints.getReviewsByBook.initiate(
                            {
                                id: Number(arg.bookId),
                                page: 1,
                            },
                            {forceRefetch: true},
                        ),
                    );
                } catch (error) {
                    // do something
                }
            },
        }),
        editComment: builder.mutation<IEditCommentOutput, IEditCommentInput>({
            query: data => ({
                url: `/action/review/${data.reviewId}`,
                method: 'PATCH',
                body: {
                    content: data.content,
                    rate: Number(data.rate),
                    photoReview: data.photoReview,
                },
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    await queryFulfilled;
                    dispatch(
                        bookApi.endpoints.getBookInfo.initiate(Number(arg.bookId), {
                            forceRefetch: true,
                        }),
                    );
                    dispatch(
                        reviewsApi.endpoints.getReviewsByBook.initiate(
                            {
                                id: Number(arg.bookId),
                                page: 1,
                            },
                            {forceRefetch: true},
                        ),
                    );
                } catch (error) {
                    // do something
                }
            },
        }),
        hideComment: builder.mutation({
            query: reviewId => ({
                url: `/action/review/${reviewId}/add_hide`,
                method: 'POST',
                body: {},
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch, getState}) {
                try {
                    await queryFulfilled;
                    dispatch(
                        reviewsApi.endpoints.getReviewsByBook.initiate(
                            {
                                id: (getState() as RootState).book.currDetailBook,
                                page: 1,
                            },
                            {forceRefetch: true},
                        ),
                    );
                } catch (error) {
                    // do something
                }
            },
        }),
        deleteComment: builder.mutation({
            query: reviewId => ({
                url: `/action/review/${reviewId}/delete`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch, getState}) {
                try {
                    await queryFulfilled;
                    dispatch(
                        bookApi.endpoints.getBookInfo.initiate(
                            (getState() as RootState).book.currDetailBook,
                            {
                                forceRefetch: true,
                            },
                        ),
                    );
                    dispatch(
                        reviewsApi.endpoints.getReviewsByBook.initiate(
                            {
                                id: (getState() as RootState).book.currDetailBook,
                                page: 1,
                            },
                            {forceRefetch: true},
                        ),
                    );
                } catch (error) {
                    // do something
                }
            },
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewsByBookQuery,
    useCreateCommentMutation,
    useEditCommentMutation,
    useHideCommentMutation,
    useDeleteCommentMutation,
    useGetReviewsByUserIdQuery,
} = reviewsApi;

export default reviewsApi;
