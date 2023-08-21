import { Optional } from 'sequelize/types';

export type CreateNotificationDTO = {
    id: number;
    fromUserId: number;
    toUserId: number[];
    bookId?: number;
    reviewId?: number;
    isSeen: boolean;
    type: string;
};

export type UpdateReviewDTO = {
    rate: number;
    content: string;
    photoReview?: string[];
    deleted?: boolean;
    countLike?: number;
};
