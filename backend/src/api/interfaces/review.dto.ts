export type CreateReviewDTO = {
    id: number;
    userId: number;
    bookId: number;

    rate: number;
    content: string;
    photoReview?: string[];
    deleted?: boolean;
    countLike?: number;
};

export type UpdateReviewDTO = {
    rate: number;
    content: string;
    photoReview?: string[];
    deleted?: boolean;
    countLike?: number;
};

export type QueryBookDTO = {
    id: number;
    ISBN_10: string;
    ISBN_13: string;
    page: number;
};
