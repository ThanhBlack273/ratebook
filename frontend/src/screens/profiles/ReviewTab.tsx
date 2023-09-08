import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import {Book, Comment} from '../../common/components';
import {Review} from '../../slices/reviews';
import {rateBookApi} from '../../slices/books';
import {useDispatch, useSelector} from 'react-redux';
import {HomeNavigationProp} from '../../navigator/StackNavigatorTypes';
import {REVIEWS_PER_PAGE} from '../../common/constants';
import {ReviewTabProps} from '../../navigator';
import {useGetReviewsByUserIdQuery} from '../../slices/reviews/reviewsApi';
import {RootState} from '../../slices/store';

// #fdffcd
const ReviewBookItem = ({review}: {review: Review}) => {
    const currUser = useSelector((state: RootState) => state.profile.currUser);
    const navigation = useNavigation<HomeNavigationProp>();

    const handlePress = (id: string) => {
        navigation.navigate('Detail', {id});
    };

    return (
        <View style={styles.container}>
            <Book
                id={String(review.book?.id)}
                authors={review.book?.author.join(', ') || ''}
                handlePress={handlePress}
                name={review.book?.title + ': ' + review.book?.subtitle}
                imgUri={review.book?.thumbnail || review.book?.smallThumbnail}
                style={styles.containerBook}
            />
            <Comment
                id={review.id}
                content={review.content}
                updatedAt={review.updatedAt}
                photoReview={review.photoReview}
                rate={review.rate}
                bookId={String(review.bookId)}
                likedReviewListUser={review.likedReviewListUser}
                userId={currUser ? Number(currUser.id) : 0}
                userName={currUser ? currUser.userName : ''}
                avatar={currUser ? currUser.avatar : ''}
            />
        </View>
    );
};

const ReviewBookTab = ({route, navigation}: ReviewTabProps) => {
    const currUser = useSelector((state: RootState) => state.profile.currUser);
    const [page, setPage] = useState(1);

    const {data, isFetching, error} = useGetReviewsByUserIdQuery(
        {id: Number(currUser?.id), page},
        {skip: !Boolean(currUser?.id)},
    );
    const dispatch = useDispatch();

    const handleEndReach = () => {
        if (data) {
            if (data.reviews.length % REVIEWS_PER_PAGE === 0) {
                setPage(pre => pre + 1);
            }
        }
    };
    const handleRefresh = () => {
        dispatch(rateBookApi.util.resetApiState());
        setPage(1);
    };
    return (
        <View style={stylesTab.container}>
            {data && (
                <FlatList
                    data={data.reviews}
                    renderItem={({item}) => <ReviewBookItem review={item} />}
                    keyExtractor={item => String(item.id)}
                    onEndReachedThreshold={0.1}
                    onEndReached={handleEndReach}
                    refreshing={isFetching}
                    onRefresh={handleRefresh}
                />
            )}
            {isFetching && <ActivityIndicator style={stylesTab.activityIndicator} size="large" color="#1E90FF" />}
        </View>
    );
};

const stylesTab = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    activityIndicator: {
        marginTop: 10,
    },
});
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    containerBook: {
        width: '95%',
        height: 110,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#fdffcd',
        borderRightWidth: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderColor: '#ffc93c',
    },
});
export default ReviewBookTab;
