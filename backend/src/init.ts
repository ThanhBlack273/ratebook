// require('dotenv').config();

import { User, Book, Review, LikeBook, HideReview, LikeReview, Notification } from './models';

// const dbInit = () =>
//     Promise.all([
//         User.sync({ force: true }),
//         Book.sync({ force: true }),
//         Review.sync({ force: true }),
//         LikeReview.sync({ force: true }),
//         HideReview.sync({ force: true }),
//         LikeBook.sync({ force: true }),
//     ]);

// const dbInit = () =>
//     Promise.all([
//         User.sync({}),
//         Book.sync({}),
//         Review.sync({}),
//         LikeReview.sync({}),
//         HideReview.sync({}),
//         LikeBook.sync({}),
//     ]);

// const dbInit = async () => {
//     await User.sync({ force: true });
//     await Book.sync({ force: true });
//     await Review.sync({ force: true });
//     await LikeReview.sync({ force: true });
//     await HideReview.sync({ force: true });
//     await LikeBook.sync({ force: true });
//     await Notification.sync({ force: true });
// };

const dbInit = async () => {
    await User.sync({});
    await Book.sync({});
    await Review.sync({});
    await LikeReview.sync({});
    await HideReview.sync({});
    await LikeBook.sync({});
    await Notification.sync({});
};

export default dbInit;
