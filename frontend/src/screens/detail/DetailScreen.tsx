import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {Comment, DetailBook, LoadingButton} from '../../common/components';

import {updateCurrDetailBook, updateModalType, useGetBookInfoQuery} from '../../slices/books';
import {DetailBookScreenProps} from '../../navigator/StackNavigatorTypes';
import {reviewsApi, useGetReviewsByBookQuery} from '../../slices/reviews';
import {REVIEWS_PER_PAGE} from '../../common/constants';
import {RootState} from '../../slices/store';

const DetailScreen = ({route, navigation}: DetailBookScreenProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const {data: book, isFetching: isFetchingBook} = useGetBookInfoQuery(Number(route.params.id));
    const {data: reviewsResponse, isFetching: isFetchingReviews} = useGetReviewsByBookQuery({
        id: Number(route.params.id),
        page: page,
    });

    useEffect(() => {
        dispatch(updateCurrDetailBook(Number(route.params.id)));
    }, []);

    const handleEndReached = () => {
        if (reviewsResponse) {
            if (reviewsResponse.reviews.length % REVIEWS_PER_PAGE === 0 && page !== 1) {
                setPage(pre => pre + 1);
            }
        }
    };

    const handleRefresh = () => {
        dispatch(reviewsApi.util.resetApiState());
        setPage(1);
    };

    if (isFetchingBook) return <ActivityIndicator size="large" color="#1E90FF" />;

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.content}
                data={reviewsResponse?.reviews}
                keyExtractor={item => String(item.id)}
                onEndReached={handleEndReached}
                onRefresh={handleRefresh}
                refreshing={isFetchingBook}
                ListHeaderComponent={
                    book ? (
                        <DetailBook
                            id={book.id}
                            authors={book.author?.join(', ') || ''}
                            name={book.title}
                            imgUri={book.thumbnail || book.smallThumbnail}
                            publisher={book.publisher}
                            publishedDate={book.publishedDate}
                            star={book.star}
                            countRate={book.countRate}
                            description={book.description}
                            style={styles.bookContainer}
                        />
                    ) : null
                }
                renderItem={({item}) => (
                    <Comment
                        id={item.id}
                        content={item.content}
                        updatedAt={item.updatedAt}
                        photoReview={item.photoReview}
                        rate={item.rate}
                        userId={item.user.id}
                        userName={item.user.userName}
                        avatar={item.user.avatar}
                        bookId={route.params.id}
                        style={styles.comment}
                        moreVert={user && String(user.id) === String(item.user.id)}
                    />
                )}
                ListFooterComponent={
                    !isFetchingReviews && reviewsResponse?.reviews.length === 0 ? (
                        <View style={styles.noComments}>
                            <Text>No comments</Text>
                        </View>
                    ) : null
                }
            />
            {isFetchingReviews && <ActivityIndicator size="large" color="#1E90FF" />}
            <View style={styles.control}>
                <LoadingButton
                    text="Request to review"
                    style={[styles.button, styles.whiteButton]}
                />
                <LoadingButton
                    text="New comment"
                    style={styles.button}
                    onPress={() =>
                        dispatch(updateModalType({type: 'NEW_COMMENT', value: route.params.id}))
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    content: {
        height: '100%',
    },
    bookContainer: {
        alignSelf: 'center',
    },
    control: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',
    },
    button: {
        width: 210,
        height: 35,
        borderWidth: 1,
        borderColor: '#1E90FF',
    },
    whiteButton: {
        backgroundColor: 'white',
    },
    comment: {
        marginBottom: 10,
    },
    noComments: {
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default DetailScreen;
