import {StyleProp, StyleSheet, Text, View, ViewStyle, Image} from 'react-native';
import images from '../res/images';

interface BookProps {
    id: string;
    name: string;
    imgUri?: string;
    authors: string;
    publisher?: string;
    handlePress: Function;
    style?: StyleProp<ViewStyle>;
}

const Book = ({id, name, imgUri, authors, publisher, handlePress, style}: BookProps) => {
    return (
        <View style={[styles.container, style]}>
            <Image style={styles.bookImg} source={imgUri ? {uri: imgUri} : images.bookDefault} />
            <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={2} onPress={() => handlePress(id)}>
                    {name}
                </Text>

                {authors && (
                    <Text numberOfLines={1}>
                        by <Text style={styles.authorText}>{authors}</Text>
                    </Text>
                )}
                {publisher && (
                    <Text numberOfLines={1}>
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
        backgroundColor: '#e9fff0',
        borderRightWidth: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderColor: 'green',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
