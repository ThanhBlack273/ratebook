import {useState} from 'react';
import {
    ActivityIndicator,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {ScrollViewStyle, SmallBook} from '../../common/components';
import {IBook, useGetRegisteredBooksQuery} from '../../slices/books';

const RegisterBookTab = () => {
    const [page, setPage] = useState(1);
    const {data, isFetching, error} = useGetRegisteredBooksQuery(page);
    const handleMoveDown = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (
            event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height + 100 >
            event.nativeEvent.contentSize.height
        ) {
            // do something
        }
    };
    return (
        <View style={styles.coverContainer}>
            <ScrollViewStyle
                contentContainerStyle={styles.container}
                onScroll={handleMoveDown}
                scrollEventThrottle={16}>
                <View style={styles.content}>
                    {data &&
                        data.books.map((book: IBook) => (
                            <SmallBook
                                key={book.id}
                                id={book.id}
                                name={book.title + (book.subtitle ? ': ' + book.subtitle : '')}
                                authors={book.author?.join(', ') || ''}
                                imgUri={book.thumbnail || ''}
                                publisher={book.publisher || ''}
                                style={styles.bookItem}
                                // handlePress={handlePress}
                            />
                        ))}
                </View>
                {isFetching && (
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size="large"
                        color="#1E90FF"
                    />
                )}
            </ScrollViewStyle>
        </View>
    );
};

const styles = StyleSheet.create({
    coverContainer: {
        height: '100%',
        backgroundColor: 'white',
    },
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        marginTop: 10,
        width: '92%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bookItem: {
        marginTop: 10,
    },
    activityIndicator: {
        marginTop: 10,
    },
});

export default RegisterBookTab;
