import {StyleProp, StyleSheet, Text, View, ViewStyle, Image} from 'react-native';
import images from '../res/images';

interface SmallBookProps {
    id: string;
    name: string;
    imgUri: string;
    authors: string;
    publisher: string;
    handlePress: Function;
    style?: StyleProp<ViewStyle>;
}

const SmallBook = ({id, name, imgUri, authors, publisher, handlePress, style}: SmallBookProps) => {
    return (
        <View style={[styles.container, style]}>
            <Image style={styles.bookImg} source={imgUri ? {uri: imgUri} : images.bookDefault} />
            <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={1} onPress={() => handlePress(id)}>
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
        width: '48%',
        backgroundColor: 'white',

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
        width: '100%',
        height: 200,
    },
    bookInfo: {
        padding: 5,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: 'steelblue',
    },
    authorText: {
        fontSize: 14,
        fontWeight: '600',
    },
    publishedByText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
export default SmallBook;
