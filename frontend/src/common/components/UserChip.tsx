import {Image, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {User} from '../../slices/users';
import images from '../res/images';

interface UserChipProps {
    user: User;
    onDelete?: (user: User) => void;
}

const UserChip = ({user, onDelete}: UserChipProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    {/* <Image style={styles.avatarImage} source={user.avatar ? {uri: user.avatar} : images.avatar} /> */}
                    <Image style={styles.avatarImage} source={user.avatar ? {uri: user.avatar} : images.avatar} />
                </View>
                <View>
                    <Text style={styles.name}>{user.userName}</Text>
                </View>
                {onDelete && (
                    <MaterialIcons name="highlight-remove" color="red" size={25} onPress={() => onDelete(user)} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'cyan',
        padding: 5,
        borderRadius: 30,
        margin: 3,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarImage: {
        height: 30,
        width: 30,
        overflow: 'hidden',
        borderColor: '#1E90FF',
        borderWidth: 1,
        borderRadius: 30,
    },
    name: {
        color: 'black',
        marginLeft: 5,
        marginRight: 5,
    },
});

export default UserChip;
