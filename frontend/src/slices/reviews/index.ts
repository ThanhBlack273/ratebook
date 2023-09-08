export {
    default as reviewsApi,
    useGetReviewsQuery,
    useGetReviewsByBookQuery,
    useCreateCommentMutation,
    useEditCommentMutation,
    useHideCommentMutation,
    useDeleteCommentMutation,
    useGetReviewsByUserIdQuery,
    useAddLikeReviewMutation,
} from './reviewsApi';

export type {IGetReviewsOutput, Review} from './reviewsType';
