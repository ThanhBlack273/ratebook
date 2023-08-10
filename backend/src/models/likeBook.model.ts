export const LikeBook = (sequelize, Sequelize) => {
    const Like = sequelize.define('like_books', {});

    return Like;
};
