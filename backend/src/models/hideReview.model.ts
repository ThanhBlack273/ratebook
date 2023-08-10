export const HideReview = (sequelize, Sequelize) => {
    const Hide = sequelize.define('hide_reviews', {});

    return Hide;
};
