import {Image, StyleSheet, Text, View} from 'react-native';

import images from '../../common/res/images';
import {User} from '../../slices/users';
import {TouchableOpacity} from 'react-native';

interface ListUsersProps {
    users: User[];
    onSelect?: React.Dispatch<React.SetStateAction<User[]>>;
}

const ListUsers = ({users, onSelect}: ListUsersProps) => {
    const handleSeleteUser = (selectedUser: User) => {
        if (!onSelect) return;
        onSelect((pre: User[]) => {
            const isSeleted = pre.some((user: User) => user.id === selectedUser.id);
            if (!isSeleted) return [...pre, selectedUser];
            return pre;
        });
    };
    return (
        <View>
            {users.map((user: User) => (
                <TouchableOpacity key={user.email} onPress={() => handleSeleteUser(user)}>
                    <View style={styles.containerUserInfo}>
                        {/* <Image style={styles.avatarImage} source={user.avatar ? {uri: user.avatar} : images.avatar} /> */}
                        <Image style={styles.avatarImage} source={user.avatar ? {uri: user.avatar} : images.avatar} />

                        <View style={styles.contentInfo}>
                            <Text style={styles.textName}>{user.userName}</Text>
                            <Text style={styles.textEmail}>{user.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    containerUserInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        height: 50,
        alignItems: 'center',
    },
    avatarImage: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 35,
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
});

export default ListUsers;
