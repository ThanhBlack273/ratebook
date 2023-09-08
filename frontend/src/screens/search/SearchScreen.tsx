import {useEffect, useMemo, useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Book, RadioGroup, ScrollViewStyle, TextInputStyle} from '../../common/components';
import {rateBookApi, useGetBooksGoogleQuery, useGetBooksRateBookQuery} from '../../slices/books';
import {SearchScreenProps} from '../../navigator/StackNavigatorTypes';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../slices/store';
import {PADDING_OFFSET, SEARCH_RADIO_ITEMS} from '../../common/constants';
import Toast from 'react-native-toast-message';

const SearchScreen = ({route, navigation}: SearchScreenProps) => {
    // States
    const [searchText, setSearchText] = useState('');
    const [mode, setMode] = useState('ratebook');
    const [query, setQuery] = useState({
        searchText,
        page: 1,
    });
    const dispatch: AppDispatch = useDispatch();

    //Call APIs
    const {data: booksOfRateBook, isFetching: isRateBookFetching} = useGetBooksRateBookQuery(query, {
        skip: mode === 'google' || query.searchText === '',
    });
    const {data: booksOfGGBook, isFetching: isGGBookFetching} = useGetBooksGoogleQuery(query, {
        skip: mode === 'ratebook' || query.searchText === '',
    });

    // Choose data render
    const bookData = useMemo(() => {
        return mode === 'ratebook' ? booksOfRateBook : booksOfGGBook;
    }, [mode, booksOfRateBook, booksOfGGBook]);

    // functions handle events
    const handleSearch = () => {
        if (searchText === query.searchText) return;
        setQuery({page: 1, searchText});
    };
    const handleMoveDown = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (
            event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height + PADDING_OFFSET >
            event.nativeEvent.contentSize.height
        ) {
            if (isGGBookFetching || isRateBookFetching) return;
            setQuery(prev => ({...prev, page: prev.page + 1}));
        }
    };
    const handlePress = async (id: string) => {
        const book = bookData?.books.find(book => book.id === id);
        if (!(book && book.ISBN_10 && book.ISBN_13)) {
            Toast.show({
                type: 'error',
                text1: 'This book can not register',
            });
            return;
        }
        const {data, isSuccess, isError} = await dispatch(
            rateBookApi.endpoints.getBookRateBook.initiate({
                ISBN_10: book.ISBN_10,
                ISBN_13: book.ISBN_13,
            }),
        );
        if (isSuccess) navigation.navigate('Detail', {id: data.id});
        if (isError && mode === 'google') {
            Toast.show({
                type: 'success',
                text1: 'You can register book',
            });
            navigation.navigate('RegisterBook', {id});
        }
    };

    return (
        <View style={styles.coverContainer}>
            <ScrollViewStyle
                contentContainerStyle={styles.container}
                onScroll={handleMoveDown}
                scrollEventThrottle={16}>
                <View style={styles.content}>
                    <TextInputStyle
                        label="Search"
                        placeholder="Please provide search input"
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                    <TouchableOpacity
                        onPress={handleSearch}
                        style={[styles.searchButton, !Boolean(searchText) && {backgroundColor: 'lightgray'}]}
                        disabled={!Boolean(searchText)}>
                        <AntDesign name="search1" color="white" style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
                <RadioGroup items={SEARCH_RADIO_ITEMS} value={mode} onChange={setMode} style={styles.radio} />
                {bookData && (
                    <>
                        <View style={styles.resultTitle}>
                            <Text style={styles.resultTitleText}>{bookData.totalBooks} results :</Text>
                        </View>
                        <View style={styles.books}>
                            {bookData.books.length === 0 && <Text>No result is found</Text>}
                            {bookData.books.length !== 0 &&
                                bookData.books.map(book => (
                                    <Book
                                        key={book.id}
                                        id={book.id}
                                        name={book.title + (book.subtitle ? ': ' + book.subtitle : '')}
                                        authors={book.author?.join(', ') || ''}
                                        imgUri={book.thumbnail || ''}
                                        publisher={book.publisher || ''}
                                        style={styles.book}
                                        handlePress={handlePress}
                                    />
                                ))}
                        </View>
                    </>
                )}
                {(isRateBookFetching || isGGBookFetching) && (
                    <ActivityIndicator style={styles.activityIndicator} size="large" color="#1E90FF" />
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
        marginTop: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
    },
    searchButton: {
        display: 'flex',
        backgroundColor: '#1E90FF',
        width: 35,
        height: 35,
        marginLeft: 'auto',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    searchIcon: {
        fontSize: 16,
    },
    radio: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-evenly',
    },
    books: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    book: {
        marginTop: 10,
        height: 130,
    },
    resultTitle: {
        width: '90%',
        marginTop: 15,
    },
    resultTitleText: {
        fontSize: 20,
        color: '#1E90FF',
        fontWeight: '700',
    },
    activityIndicator: {
        marginTop: 10,
    },
});
export default SearchScreen;
