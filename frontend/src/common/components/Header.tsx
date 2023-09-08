import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface HeaderProps extends NativeStackHeaderProps {
    style?: StyleProp<ViewStyle>;
    isNavigation?: boolean;
}

const Header = ({options, navigation, isNavigation = true, style}: HeaderProps) => {
    return (
        <View style={[styles.headerContainer, style]}>
            <View style={styles.headerContent}>
                {isNavigation && (
                    <AntDesign
                        size={20}
                        style={styles.antDesign}
                        name="arrowleft"
                        color="#1E90FF"
                        onPress={() => navigation.pop()}
                    />
                )}
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
