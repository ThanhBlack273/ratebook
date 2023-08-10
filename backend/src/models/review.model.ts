export const Review = (sequelize, Sequelize) => {
    const Review = sequelize.define('review', {
        rate: {
            type: Sequelize.INTEGER,
            notNull: true,
        },
        content: {
            type: Sequelize.TEXT,
            notNull: true,
        },
        photoReview: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        countLike: {
            type: Sequelize.INTEGER,
        },
    });

    return Review;
};
