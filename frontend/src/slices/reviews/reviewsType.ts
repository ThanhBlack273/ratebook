export interface Review {
    id: number;
    rate: string;
    content: string;
    photoReview: string[];
    deleted: boolean;
    countLike: any;
    createdAt: string;
    updatedAt: string;
    userId: number;
    bookId: number;
    likedReviewListUser: any[];
    user: {
        id: number;
        email: string;
        userName: string;
        avatar: string;
        device: string;
    };
    book: {
        id: string;
        ISBN_10: string;
        ISBN_13: string;
        title: string;
        subtitle: string;
        author: string[];
        smallThumbnail: string;
        thumbnail: string;
    };
}

export interface IGetReviewsOutput {
    totalReviews: number;
    totalPages: number;
    currentPage: number;
    reviews: Review[];
}

export interface ICreateCommentInput {
    bookId: string;
    rate: string;
    content: string;
    photoReview: string[];
}

export interface ICreateCommentOutput {
    deleted: boolean;
    id: number;
    bookId: number;
    userId: number;
    rate: number;
    content: string;
    photoReview: string[];
    updatedAt: string;
    createdAt: string;
    countLike: any;
}

export interface IEditCommentInput {
    bookId: string;
    reviewId: number;
    rate: string;
    content: string;
    photoReview: string[];
}

export interface IEditCommentOutput {
    deleted: boolean;
    id: number;
    bookId: number;
    userId: number;
    rate: number;
    content: string;
    photoReview: string[];
    updatedAt: string;
    createdAt: string;
    countLike: any;
}
