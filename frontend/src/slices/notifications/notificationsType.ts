export interface IPushNotificationInput {
    to: string;
    notification: {
        body: string;
        title: string;
    };
    data: {
        deepLink: string;
    };
}

export interface IPushMultiNotificationInput {
    registration_ids: string[];
    notification: {
        body: string;
        title: string;
    };
    data: {
        deepLink: string;
    };
}
export interface INotification {
    id: number;
    isSeen: boolean;
    type: 'share' | 'request' | 'like';
    createdAt: string;
    updatedAt: string;
    fromUserId: number;
    toUserId: number;
    reviewId: number;
    toUser: {
        id: number;
        userName: string;
        avatar: string;
        device: string;
    };
    fromUser: {
        id: number;
        userName: string;
        avatar: string;
        device: string;
    };
    book?: {
        id: number;
        title: string;
        subtitle: string;
        author: string[];
        smallThumbnail: string;
        thumbnail: string;
        updatedAt: string;
    };
    review?: {
        id: number;
        rate: number;
        content: string;
        photoReview: string[];
        countLike: any;
        userId: number;
        bookId: number;
        updatedAt: string;
    };
}

export interface IGetNotificationOutput {
    totalNotis: number;
    totalPages: number;
    currentPage: number;
    notis: INotification[];
}

export interface IAddNotiInput {
    type: 'share' | 'request' | 'like';
    toUserId: number[];
    reviewId?: number;
    bookId?: number;
}
