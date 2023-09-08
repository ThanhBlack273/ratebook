import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import NotificationItem from './NotificationItem';
import {REVIEWS_PER_PAGE} from '../../common/constants';
import {AppDispatch} from '../../slices/store';
import {notificationApi, useGetNotificationsQuery} from '../../slices/notifications';

const NotificationScreen = () => {
    const [page, setPage] = useState(1);
    const dispatch: AppDispatch = useDispatch();

    const {data, isFetching} = useGetNotificationsQuery(page);

    const handleEndReached = () => {
        if (data) {
            if (data.notis.length % REVIEWS_PER_PAGE === 0 && page !== 1) {
                setPage(pre => pre + 1);
            }
        }
    };

    const handleRefresh = () => {
        dispatch(notificationApi.endpoints.getNotifications.initiate(1, {forceRefetch: true}));
        setPage(1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.notiList}>
                <Text style={styles.title}>Your notifications recently: </Text>
                <FlatList
                    style={styles.flatlist}
                    data={data ? data.notis : []}
                    keyExtractor={item => String(item.id)}
                    onEndReached={handleEndReached}
                    onRefresh={handleRefresh}
                    refreshing={isFetching}
                    renderItem={({item}) => <NotificationItem notification={item} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    notiList: {
        width: '100%',
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        backgroundColor: '#1E90FF',
    },
    flatlist: {
        height: '100%',
    },
});

export default NotificationScreen;
