import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import {Book, Comment} from '../../common/components';
import {IBook, rateBookApi, useGetRegisteredBookByUserQuery} from '../../slices/books';
import {useDispatch, useSelector} from 'react-redux';
import {HomeNavigationProp} from '../../navigator/StackNavigatorTypes';
import {BOOKS_PER_PAGE} from '../../common/constants';
import {RegisterTabProps} from '../../navigator';
import {RootState} from '../../slices/store';

// #e9fff0
const ReviewBookItem = ({book}: {book: IBook}) => {
    const navigation = useNavigation<HomeNavigationProp>();

    const handlePress = (id: string) => {
        navigation.navigate('Detail', {id});
    };

    return (
        <View style={styles.container}>
            <Book
                id={String(book.id)}
                authors={book.author?.join(', ') || ''}
                handlePress={handlePress}
                name={book.title + ': ' + book.subtitle}
                imgUri={book.thumbnail || book.smallThumbnail}
                style={styles.containerBook}
            />
        </View>
    );
};

const ReviewBookTab = ({route, navigation}: RegisterTabProps) => {
    const currUser = useSelector((state: RootState) => state.profile.currUser);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const {data, isFetching, error} = useGetRegisteredBookByUserQuery(
        {id: Number(currUser?.id), page},
        {
            skip: !currUser,
        },
    );

    const handleEndReach = () => {
        if (data) {
            if (data.books.length % BOOKS_PER_PAGE === 0) {
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
                    data={data.books}
                    renderItem={({item}) => <ReviewBookItem book={item} />}
                    keyExtractor={item => String(item.id)}
                    onEndReachedThreshold={0.1}
                    onEndReached={handleEndReach}
                    refreshing={isFetching}
                    onRefresh={handleRefresh}
                />
            )}
            {isFetching && (
                <ActivityIndicator
                    style={stylesTab.activityIndicator}
                    size="large"
                    color="#1E90FF"
                />
            )}
        </View>
    );
};

const stylesTab = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    activityIndicator: {
        marginTop: 10,
    },
});
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    containerBook: {
        width: '95%',
        height: 110,
        alignSelf: 'center',
        marginTop: 10,
    },
});
export default ReviewBookTab;
