import {StyleProp, StyleSheet, Text, View, ViewStyle, Image} from 'react-native';
import images from '../res/images';

interface BookProps {
    id: number;
    name: string;
    imgUri: string;
    authors: string;
    publisher: string;
    handlePress: Function;
    style?: StyleProp<ViewStyle>;
}

const Book = ({id, name, imgUri, authors, publisher, handlePress, style}: BookProps) => {
    return (
        <View style={[styles.container, style]}>
            <Image style={styles.bookImg} source={imgUri ? {uri: imgUri} : images.bookDefault} />
            <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={3} onPress={() => handlePress(id)}>
                    {name}
                </Text>

                {authors && (
                    <Text numberOfLines={2}>
                        by <Text style={styles.authorText}>{authors}</Text>
                    </Text>
                )}
                {publisher && (
                    <Text numberOfLines={2}>
                        Published by <Text style={styles.publishedByText}>{publisher}</Text>
                    </Text>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 155,
        backgroundColor: 'lightcyan',
        borderWidth: 2,
        borderColor: '#1E90FF',
    },
    bookImg: {
        width: 100,
        height: '100%',
    },
    bookInfo: {
        padding: 10,
        width: 250,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: 'steelblue',
    },
    authorText: {
        fontSize: 15,
        fontWeight: '600',
    },
    publishedByText: {
        fontSize: 15,
        fontWeight: '600',
    },
});
export default Book;
