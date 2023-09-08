import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {LoadingButton, TextInputStyle} from '../../common/components';
import {updateModalType} from '../../slices/books';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {User, useGetUsersQuery} from '../../slices/users';
import ListUsers from './ListUsers';
import SeletedUsers from './SeletedUsers';
import {useAddNotificationMutation, usePushMultiNotificationsMutation} from '../../slices/notifications';
import {RootState} from '../../slices/store';

interface RequestToReviewProps {
    bookId: string;
}

const RequestToReview = ({bookId}: RequestToReviewProps) => {
    const {user} = useSelector((state: RootState) => state.auth);
    const [searchText, setSearchText] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [selectedUser, setSelectedUser] = useState<User[]>([]);
    const dispatch = useDispatch();

    const {data, isFetching, isError} = useGetUsersQuery(debounceValue, {skip: !debounceValue});
    const [pushMultiNotification] = usePushMultiNotificationsMutation();
    const [addNotification, {isLoading, isSuccess}] = useAddNotificationMutation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(searchText);
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [searchText]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateModalType({type: ''}));
            Toast.show({
                text1: 'Request successfull',
            });
        }
    }, [isSuccess]);

    const handleRequestToReview = async () => {
        if (selectedUser.length === 0) return;
        const resAddNoti = await addNotification({
            bookId: Number(bookId),
            toUserId: selectedUser.map((user: User) => user.id),
            type: 'request',
        }).unwrap();
        if (resAddNoti) {
            pushMultiNotification({
                registration_ids: selectedUser.map((user: User) => user.device),
                notification: {
                    title: 'RateBook',
                    body: `${user?.userName} request to review a book`,
                },
                data: {
                    deepLink: `frontend://detail/${bookId}`,
                },
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInputStyle
                    label="Search"
                    placeholder="Please provide search input"
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
                <TouchableOpacity
                    style={[styles.searchButton, !Boolean(searchText) && {backgroundColor: 'lightgray'}]}
                    disabled={!Boolean(searchText)}>
                    <AntDesign name="search1" color="white" style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
            {isFetching && <ActivityIndicator size="small" color="#1E90FF" />}
            {data && (
                <View>
                    <ListUsers users={data} onSelect={setSelectedUser} />
                </View>
            )}
            {selectedUser.length !== 0 && (
                <View>
                    <Text style={styles.titleSelected}>The users are selected:</Text>
                    <SeletedUsers selectedUser={selectedUser} onSelect={setSelectedUser} />
                </View>
            )}

            <View style={styles.buttonAuth}>
                <LoadingButton
                    text="Close"
                    style={[styles.button, styles.whiteButton]}
                    onPress={() => dispatch(updateModalType({type: ''}))}
                />
                <LoadingButton
                    text="Request"
                    style={styles.button}
                    isLoading={isLoading}
                    onPress={handleRequestToReview}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    content: {
        width: '95%',
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

    button: {
        width: 60,
        height: 30,
    },
    buttonAuth: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    whiteButton: {
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#1E90FF',
    },
    titleSelected: {
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default RequestToReview;
