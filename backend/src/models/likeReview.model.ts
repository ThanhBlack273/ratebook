export const LikeReview = (sequelize, Sequelize) => {
    const Like = sequelize.define('like_reviews', {});

    return Like;
};
