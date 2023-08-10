import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../slices/store';
import LoadingButton from './LoadingButton';
import images from '../res/images';
import {userLoggedOut} from '../../slices/auth';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(userLoggedOut());

    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            {user ? (
                <View style={styles.containerUser}>
                    <View style={styles.containerUserInfo}>
                        <Image
                            style={styles.avatarImage}
                            source={user ? {uri: user.avatar} : images.avatar}
                        />

                        <View style={styles.contentInfo}>
                            <Text style={styles.textName}>{user.userName}</Text>
                            <Text style={styles.textEmail}>{user.email}</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="logout-variant"
                        color="red"
                        style={styles.logoutIcon}
                        onPress={handleLogout}
                    />
                </View>
            ) : (
                <View style={[styles.containerUser, styles.containerUserBonus]}>
                    <Image style={styles.avatarImageDefault} source={images.avatar} />
                    <View style={styles.buttonAuth}>
                        <LoadingButton
                            text="Sign Up"
                            style={[styles.button, styles.whiteButton]}
                            onPress={() =>
                                props.navigation.navigate('Home', {
                                    screen: 'SignUp',
                                })
                            }
                        />
                        <LoadingButton
                            text="Sign In"
                            style={styles.button}
                            onPress={() =>
                                props.navigation.navigate('Home', {
                                    screen: 'SignIn',
                                })
                            }
                        />
                    </View>
                </View>
            )}
            <View style={styles.br}></View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'lightcyan',
    },
    containerUser: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    containerUserBonus: {
        justifyContent: 'space-between',
    },
    containerUserInfo: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        height: 50,
        alignItems: 'center',
    },
    br: {
        height: 2,
        backgroundColor: '#1E90FF',
        opacity: 0.3,
        marginBottom: 10,
        marginTop: 10,
    },
    avatarImage: {
        height: '100%',
        width: 50,
        overflow: 'hidden',
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 35,
    },
    avatarImageDefault: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },

    button: {
        width: 60,
        height: 30,
    },
    contentInfo: {
        marginLeft: 10,
    },
    textName: {
        color: 'black',
        fontWeight: '600',
    },
    textEmail: {
        fontSize: 13,
    },
    logoutIcon: {
        fontSize: 25,
    },
    buttonAuth: {
        display: 'flex',
        flexDirection: 'row',
    },
    whiteButton: {
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#1E90FF',
    },
});

export default CustomDrawerContent;
