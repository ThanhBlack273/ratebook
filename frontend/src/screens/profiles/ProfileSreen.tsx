import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ProfileScreenProps} from '../../navigator/StackNavigatorTypes';
import images from '../../common/res/images';
import {ProfileTabNavigator} from '../../navigator';
import {setCurrUser} from '../../slices/users';
import {useGetUserInfoQuery} from '../../slices/auth';

const ProfileScreen = ({route, navigation}: ProfileScreenProps) => {
    const dispatch = useDispatch();

    const {data, isFetching, isError} = useGetUserInfoQuery(Number(route.params.params?.id), {
        skip: !route.params.params?.id,
    });
    useEffect(() => {
        if (data) dispatch(setCurrUser(data));
    }, [data]);
    return (
        <View style={[styles.container]}>
            {/* <ImageBackground source={images.bg} resizeMode="cover" style={[styles.headerContainer]}>
                <View style={styles.headerContent}></View>
            </ImageBackground> */}
            <ImageBackground source={images.bg} resizeMode="cover" style={styles.containerUser}>
                <AntDesign
                    size={22}
                    style={styles.antDesign}
                    name="arrowleft"
                    color="#1E90FF"
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.containerUserInfo}>
                    <Image
                        style={styles.avatarImage}
                        source={data ? {uri: data.avatar} : images.avatar}
                    />

                    <View style={styles.contentInfo}>
                        <Text style={styles.textName}>{data?.userName}</Text>
                        <Text style={styles.textEmail}>{data?.email}</Text>
                    </View>
                </View>
            </ImageBackground>
            <ProfileTabNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    headerContent: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#1E90FF',
        fontWeight: '600',
    },
    antDesign: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    container: {
        height: '100%',
    },
    containerUser: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
        height: 160,
    },
    containerUserInfo: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        height: 75,
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
    },
    avatarImage: {
        height: '100%',
        width: 75,
        overflow: 'hidden',
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 75,
    },
    avatarImageDefault: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    contentInfo: {
        marginLeft: 10,
    },
    textName: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
    },
    textEmail: {
        fontSize: 15,
        color: 'black',
    },
});

export default ProfileScreen;
