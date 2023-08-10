import {useNavigation} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {HomeNavigatorProps} from '../../navigator/DrawerNavigatorTypes';

const HomeHeader = (props: NativeStackHeaderProps) => {
    const navigation = useNavigation<HomeNavigatorProps>();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <AntDesign
                    size={20}
                    name="bars"
                    color="#1E90FF"
                    onPress={navigation.toggleDrawer}
                />
                <Text style={styles.title}>Rate books</Text>
                <AntDesign
                    size={20}
                    name="search1"
                    color="#1E90FF"
                    onPress={() =>
                        navigation.navigate('Home', {
                            screen: 'Search',
                        })
                    }
                />
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
});

export default HomeHeader;
