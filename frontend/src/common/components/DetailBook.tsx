import {Rating} from 'react-native-ratings';
import {StyleProp, StyleSheet, Text, View, ViewStyle, Image} from 'react-native';

import images from '../res/images';
import {transformToDate} from '../utils/heaper';
import LoadMoreText from './LoadMoreText';

interface BookProps {
    id: string;
    name: string;
    imgUri?: string;
    authors: string;
    publisher?: string;
    publishedDate?: string;
    description?: string;
    star?: number;
    countRate?: number;
    style?: StyleProp<ViewStyle>;
}

const DetailBook = ({
    id,
    name,
    imgUri,
    authors,
    publisher,
    publishedDate,
    style,
    countRate,
    description,
    star,
}: BookProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.conentImg}>
                <Image
                    style={styles.bookImg}
                    source={imgUri ? {uri: imgUri} : images.bookDefault}
                />
            </View>
            <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={2}>
                    {name}
                </Text>

                {authors && (
                    <Text numberOfLines={1}>
                        By <Text style={styles.textWeight}>{authors}</Text>
                    </Text>
                )}
                {publisher && (
                    <Text numberOfLines={2}>
                        Published by{' '}
                        <Text style={styles.textWeight}>{`${publisher} (${transformToDate(
                            publishedDate,
                        )})`}</Text>
                    </Text>
                )}
            </View>
            <View style={styles.bookInfo}>
                <Text style={[styles.textWeight, styles.descriptionTitle]}>Description</Text>
                <LoadMoreText style={styles.description} numberOfLines={2}>
                    {description}
                </LoadMoreText>
            </View>
            <View style={styles.bookInfo}>
                <Text style={[styles.textWeight, styles.descriptionTitle]}>Customer reviews</Text>
                <View style={styles.containerRating}>
                    <Text style={styles.averageRating}>{star}</Text>
                    <Rating
                        startingValue={star}
                        type="star"
                        imageSize={20}
                        style={styles.stars}
                        readonly
                    />
                    <Text style={styles.totalReviews}>{`(${countRate} reviews)`}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    bookImg: {
        width: 150,
        height: 200,
        borderWidth: 1,
        borderColor: '#1E90FF',
        backgroundColor: 'lightcyan',
    },
    conentImg: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bookInfo: {
        backgroundColor: 'white',
        padding: 15,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E90FF',
    },
    textWeight: {
        fontSize: 16,
        fontWeight: '600',
    },
    descriptionTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#1E90FF',
    },
    description: {
        fontSize: 15,
    },
    stars: {
        marginLeft: 10,
    },
    containerRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    averageRating: {
        fontSize: 18,
        fontWeight: '600',
    },
    totalReviews: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
    },
});
export default DetailBook;
