import {Image, StyleSheet, Text, View} from 'react-native';

import {User} from '../../slices/users';
import {UserChip} from '../../common/components';

interface SeletedUsersProps {
    selectedUser: User[];
    onSelect?: React.Dispatch<React.SetStateAction<User[]>>;
}

const SeletedUsers = ({selectedUser, onSelect}: SeletedUsersProps) => {
    const handleDeleteSelectedUser = (deletedUser: User) => {
        if (!onSelect) return;
        onSelect((pre: User[]) => {
            return pre.filter((user: User) => user.id !== deletedUser.id);
        });
    };
    return (
        <View style={styles.container}>
            {selectedUser.map((user: User) => (
                <UserChip key={'chip' + user.email} user={user} onDelete={handleDeleteSelectedUser} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default SeletedUsers;
