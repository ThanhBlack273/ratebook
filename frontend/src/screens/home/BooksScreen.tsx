import {StyleSheet, Text, View} from 'react-native';

import {RegisteredBookTabProps} from '../../navigator';

const HomeScreen = ({route, navigation}: RegisteredBookTabProps) => {
    return (
        <View style={styles.container}>
            <Text>This is a books tab</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default HomeScreen;
