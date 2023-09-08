import React, {useState} from 'react';
import {Image, Linking, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

import images from '../../common/res/images';
import {selectStrByNotiType} from '../../common/utils/heaper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {INotification, useSetIsSeenMutation} from '../../slices/notifications';

interface NotificationItemProps {
    notification: INotification;
    style?: StyleProp<ViewStyle>;
}

const NotificationItem = ({style, notification}: NotificationItemProps) => {
    const [isSeen, setIsSeen] = useState(notification.isSeen);

    const [putIsSeen, {data, isLoading}] = useSetIsSeenMutation();

    const handlePress = () => {
        if (!isSeen) {
            putIsSeen(notification.id);
            setIsSeen(true);
        }
        const bookId = notification.review?.bookId || notification.book?.id;
        Linking.openURL(`frontend://detail/${bookId}`);
    };

    return (
        <TouchableHighlight onPress={handlePress}>
            <View style={[styles.container, isSeen && styles.seen, style]}>
                <Image
                    style={styles.bookImg}
                    source={notification.fromUser.avatar ? {uri: notification.fromUser.avatar} : images.avatar}
                />
                <View style={styles.bookInfo}>
                    <Text numberOfLines={3}>
                        <Text style={styles.username}>{notification.fromUser.userName}</Text>
                        <Text style={styles.content}>{selectStrByNotiType(notification)}</Text>
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 90,
        backgroundColor: 'rgba(215, 244, 255, 1)',
        borderRightWidth: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderColor: '#1E90FF',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bookImg: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginLeft: 10,
    },
    bookInfo: {
        padding: 10,
        width: 250,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    content: {
        fontSize: 16,
    },
    seen: {
        backgroundColor: 'white',
        borderColor: 'grey',
    },
});

export default NotificationItem;
