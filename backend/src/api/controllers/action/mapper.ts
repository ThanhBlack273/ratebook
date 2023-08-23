export const toGetAllReview = (model: any) => {
    return {
        id: model.id,
        rate: model.rate,
        content: model.content,
        photoReview: model.photoReview,
        countLike: model.countLike,
        updatedAt: model.updatedAt,
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
        toUser: model.toUser,
        fromUser: model.fromUser,
        book: model.Book,
        review: model.Review,
    };
};
