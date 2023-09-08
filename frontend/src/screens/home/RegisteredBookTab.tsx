import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
    ActivityIndicator,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {LoadingButton, ScrollViewStyle, SmallBook} from '../../common/components';
import {IBook, useGetRegisteredBooksQuery} from '../../slices/books';
import {RegisteredBookTabProps} from '../../navigator';
import {BOOKS_PER_PAGE, PADDING_OFFSET, SORT_BY} from '../../common/constants';

const RegisterBookTab = ({route, navigation}: RegisteredBookTabProps) => {
    const [page, setPage] = useState(1);
    const {data, isFetching} = useGetRegisteredBooksQuery(page);

    const handlePress = (id: string) => {
        navigation.navigate('Detail', {id});
    };

    const handleMoveDown = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (
            event.nativeEvent.contentOffset.y +
                event.nativeEvent.layoutMeasurement.height +
                PADDING_OFFSET >
            event.nativeEvent.contentSize.height
        ) {
            if (data && data.books.length % BOOKS_PER_PAGE === 0) {
                setPage(pre => pre + 1);
            }
        }
    };

    return (
        <View style={styles.coverContainer}>
            <ScrollViewStyle
                contentContainerStyle={styles.container}
                onScroll={handleMoveDown}
                scrollEventThrottle={16}>
                <View style={styles.controlBar}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.text]}>Sort by</Text>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue="latest">
                                {SORT_BY.map(item => (
                                    <Picker.Item
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <LoadingButton
                        text="Register"
                        style={styles.button}
                        onPress={() => navigation.navigate('RegisterBook', {id: ''})}
                    />
                </View>
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
                                handlePress={handlePress}
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
    controlBar: {
        marginTop: 5,
        flexDirection: 'row',
        width: '92%',
        justifyContent: 'flex-end',
        alignContent: 'center',
    },
    content: {
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10,
    },
    pickerContainer: {
        width: 120,
    },
    picker: {
        color: 'gray',
        width: '110%',
        height: 20,
    },
    text: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        width: 60,
        height: 30,
    },
});

export default RegisterBookTab;
