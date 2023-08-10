import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({options, navigation}: NativeStackHeaderProps) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <AntDesign
                    size={20}
                    style={styles.antDesign}
                    name="arrowleft"
                    color="#1E90FF"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>{options.title}</Text>
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
        left: 0,
    },
});

export default Header;
