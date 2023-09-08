import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Image, Linking, Share, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Rating} from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import images from '../res/images';
import {HomeNavigationProp} from '../../navigator/StackNavigatorTypes';
import LoadMoreText from './LoadMoreText';
import {transformToDate} from '../utils/heaper';
import LoadingButton from './LoadingButton';
import CustomMenu from './CustomMenu';
import {updateModalType} from '../../slices/books';
import {useAddLikeReviewMutation} from '../../slices/reviews';
import {useAddNotificationMutation, usePushNotificationsMutation} from '../../slices/notifications';
import {RootState} from '../../slices/store';
import {buildLink} from '../utils/dynamicLink';

export interface IMenuOption {
    id: number;
    name: string;
    icon: React.JSX.Element;
    onPress: () => any;
}

interface CommentProps {
    id: number;
    userId: number;
    userName: string;
    avatar?: string;
    updatedAt: string;
    rate: string;
    content: string;
    photoReview: string[];
    device?: string;
    bookId?: string;
    likedReviewListUser?: any[];
    style?: StyleProp<ViewStyle>;
}

const Comment = ({
    id,
    userId,
    userName,
    avatar,
    updatedAt,
    rate,
    content,
    photoReview,
    device = '',
    bookId,
    likedReviewListUser,
    style,
}: CommentProps) => {
    const [isLike, setIsLike] = useState(likedReviewListUser?.length !== 0);
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation<HomeNavigationProp>();

    const [addLikeReview] = useAddLikeReviewMutation();
    const [pushNotification] = usePushNotificationsMutation();
    const [addNotification] = useAddNotificationMutation();

    const menuOptions: IMenuOption[] = useMemo(() => {
        const moreVertList = [
            {
                id: 2,
                name: 'Hide',
                icon: <MaterialIcons name="clear" color="gray" size={20} />,
                onPress: () => dispatch(updateModalType({type: 'HIDE_COMMENT', value: id})),
            },
        ];
        if (user?.id && Number(user?.id) === userId) {
            moreVertList.push(
                {
                    id: 1,
                    name: 'Edit',
                    icon: <MaterialIcons name="edit" color="#1E90FF" size={20} />,
                    onPress: () =>
                        dispatch(
                            updateModalType({
                                type: 'EDIT_COMMENT',
                                value: {
                                    id,
                                    bookId,
                                    content: content,
                                    images: photoReview,
                                    rate: Number(rate),
                                },
                            }),
                        ),
                },
                {
                    id: 3,
                    name: 'Delete',
                    icon: <MaterialIcons name="delete" color="red" size={20} />,
                    onPress: () => dispatch(updateModalType({type: 'DELETE_COMMENT', value: id})),
                },
            );
        }
        return moreVertList;
    }, [id, user, userId]);

    const handleLike = async () => {
        const resAddLike = await addLikeReview(id).unwrap();
        if (resAddLike) setIsLike(!isLike);
        if (resAddLike && !isLike && device) {
            await addNotification({
                reviewId: id,
                toUserId: [userId],
                type: 'like',
            }).unwrap();
            await pushNotification({
                to: device,
                notification: {
                    title: 'RateBook',
                    body: `${user?.userName} like your comment: '${content}'`,
                },
                data: {
                    deepLink: `frontend://detail/${bookId}`,
                },
            }).unwrap();
        }
    };

    const handleShare = async () => {
        if (!bookId) return;
        const link = await buildLink(`frontend://detail/${bookId}`);
        Share.share({message: link});
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.containerUser}>
                <View style={styles.containerUserInfo}>
                    <Image style={styles.avatarImage} source={avatar ? {uri: avatar} : images.avatar} />

                    <View style={styles.contentInfo}>
                        <Text
                            style={styles.textName}
                            onPress={() =>
                                navigation.navigate('Profile', {
                                    screen: 'ReviewTab',
                                    params: {id: userId},
                                })
                            }>
                            {userName} <Text style={styles.dateText}>{transformToDate(updatedAt)}</Text>
                        </Text>
                        <Rating startingValue={Number(rate)} type="star" imageSize={15} style={styles.stars} readonly />
                    </View>
                </View>

                <View style={styles.moreVert}>
                    <CustomMenu menuOptions={menuOptions} />
                </View>
            </View>
            <View style={styles.commentContainer}>
                <LoadMoreText style={styles.commentText} numberOfLines={3}>
                    {`\t\t\t${content}`}
                </LoadMoreText>
            </View>
            {photoReview.length !== 0 && (
                <View
                    style={styles.imgContent}
                    onTouchEnd={() => navigation.navigate('ImageCarousel', {images: photoReview})}>
                    {photoReview[0] && <Image style={styles.img} resizeMode="contain" source={{uri: photoReview[0]}} />}
                    {photoReview[1] && <Image style={styles.img} resizeMode="contain" source={{uri: photoReview[1]}} />}
                    {photoReview[2] && (
                        <View style={styles.loadMoreImage}>
                            <Image style={styles.img} resizeMode="contain" source={{uri: photoReview[2]}} />
                            <View style={styles.loadMoreNumber}>
                                <Text style={styles.loadMoreNumberText}>+{photoReview.length - 2}</Text>
                            </View>
                        </View>
                    )}
                </View>
            )}
            <View style={styles.controlAction}>
                <LoadingButton
                    text="Like"
                    style={styles.button}
                    onPress={handleLike}
                    styleText={isLike && {color: '#1E90FF'}}>
                    <AntDesign name="like1" color={isLike ? '#1E90FF' : 'grey'} size={20} />
                </LoadingButton>
                <LoadingButton text="Share" style={styles.button} onPress={handleShare}>
                    <MaterialCommunityIcons name="share" color="grey" style={styles.icon} />
                </LoadingButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    containerUser: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    containerUserInfo: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        height: 50,
        alignItems: 'center',
    },
    contentInfo: {
        marginLeft: 10,
    },
    icon: {
        fontSize: 25,
    },
    textName: {
        fontSize: 17,
        color: 'black',
        fontWeight: '600',
    },
    avatarImage: {
        height: 45,
        width: 45,
        overflow: 'hidden',
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 35,
    },
    stars: {
        marginTop: 2,
        alignSelf: 'flex-start',
    },
    dateText: {
        fontSize: 15,
        color: 'gray',
    },
    commentContainer: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    commentText: {
        color: 'black',
        fontSize: 15,
    },
    imgContent: {
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
        justifyContent: 'flex-start',
    },
    img: {
        width: 110,
        height: 110,
        marginLeft: 10,
    },
    loadMoreImage: {
        position: 'relative',
    },
    loadMoreNumber: {
        position: 'absolute',
        width: 110,
        height: 110,
        backgroundColor: 'gray',
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadMoreNumberText: {
        fontSize: 25,
        color: 'black',
        opacity: 1,
    },
    br: {
        height: 2,
        backgroundColor: '#1E90FF',
        opacity: 0.3,
        marginBottom: 10,
        marginTop: 20,
    },
    moreVert: {
        flexDirection: 'row',
    },
    controlAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    button: {
        width: 200,
        height: 35,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'lightgray',
    },
});
export default Comment;
