import {useNavigation} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeNavigatorProps} from '../../navigator/DrawerNavigatorTypes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../slices/store';
import {resetActiveNotisCount} from '../../slices/notifications';

const HomeHeader = (props: NativeStackHeaderProps) => {
    const {activeNotisCount} = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();
    const navigation = useNavigation<HomeNavigatorProps>();

    const handleNavigateToNotification = () => {
        dispatch(resetActiveNotisCount());
        navigation.navigate('Home', {
            screen: 'Notification',
        });
    };
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <AntDesign size={20} name="bars" color="#1E90FF" onPress={navigation.toggleDrawer} />
                <Text style={styles.title}>Rate books</Text>
                <View style={styles.contentRedirect}>
                    <View style={styles.notifications}>
                        <Ionicons
                            size={22}
                            name="notifications"
                            color="#1E90FF"
                            onPress={handleNavigateToNotification}
                        />
                        {activeNotisCount !== 0 && <Text style={styles.notificationNumber}>+{activeNotisCount}</Text>}
                    </View>
                    <AntDesign
                        size={20}
                        name="search1"
                        color="#1E90FF"
                        style={{marginLeft: 15}}
                        onPress={() =>
                            navigation.navigate('Home', {
                                screen: 'Search',
                            })
                        }
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'lightcyan',
    },
    headerContent: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#1E90FF',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    contentRedirect: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notifications: {
        position: 'relative',
    },
    notificationNumber: {
        position: 'absolute',
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
        alignContent: 'center',
        fontWeight: '700',
        width: 15,
        height: 15,
        borderRadius: 25,
        fontSize: 10,
        top: -5,
        right: -5,
    },
});

export default HomeHeader;
