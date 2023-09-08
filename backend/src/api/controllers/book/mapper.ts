export const toGetBookById = (model: any) => {
    return {
        id: model.id,
        ISBN_10: model.ISBN_10,
        ISBN_13: model.ISBN_13,
        title: model.title,
        subtitle: model.subtitle,
        author: model.author,
        publisher: model.publisher,
        publishedDate: model.publishedDate,
        description: model.description,
        smallThumbnail: model.smallThumbnail,
        thumbnail: model.thumbnail,
        star: model.star,
        countRate: model.countRate,
        userId: model?.userId,
        updatedAt: model.updatedAt,

        user: model.User,
        likedListUser: model.likedListUser,
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
        userId: model?.userId,
        user: model.User,
        likedReviewListUser: model.likedReviewListUser,
    };
};
