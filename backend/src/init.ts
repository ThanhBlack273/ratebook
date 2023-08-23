// require('dotenv').config();

import { User, Book, Review, LikeBook, HideReview, LikeReview, Notification } from './models';
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
