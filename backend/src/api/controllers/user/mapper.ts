export const toGetLikedList = (model: any) => {
    return {
        id: model.id,
        userId: model.userId,
        book: model.Book,
    };
};

export const toGetReviewList = (model: any) => {
    return {
        id: model.id,
        rate: model.rate,
        content: model.content,
        photoReview: model.photoReview,
        countLike: model.countLike,
        updatedAt: model.updatedAt,
        book: model.Book,
        likedReviewListUser: model.likedReviewListUser,
    };
};
