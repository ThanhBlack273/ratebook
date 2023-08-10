export {
    default as reviewsApi,
    useGetReviewsQuery,
    useGetReviewsByBookQuery,
    useCreateCommentMutation,
    useEditCommentMutation,
    useHideCommentMutation,
    useDeleteCommentMutation,
    useGetReviewsByUserIdQuery,
} from './reviewsApi';

export type {IGetReviewsOutput, Review} from './reviewsType';
