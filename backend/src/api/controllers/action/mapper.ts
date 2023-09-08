export const toGetAllReview = (model: any) => {
    return {
        id: model.id,
        rate: model.rate,
        content: model.content,
        photoReview: model.photoReview,
        countLike: model.countLike,
        updatedAt: model.updatedAt,
        userId: model?.userId,
        bookId: model?.bookId,
        book: model.Book,
        user: model.User,
        likedReviewListUser: model.likedReviewListUser,
    };
};

export const toNoti = (model: any) => {
    return {
        id: model.id,
        isSeen: model.isSeen,
        type: model.type,
        createdAt: model.createdAt,
        fromUserId: model?.fromUserId,
        bookId: model?.bookId,
        toUserId: model?.toUserId,
        reviewId: model?.reviewId,
        toUser: model.toUser,
        fromUser: model.fromUser,
        book: model.Book,
        review: model.Review,
    };
};
