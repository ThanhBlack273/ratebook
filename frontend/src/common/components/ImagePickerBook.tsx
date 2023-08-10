import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
} from 'react-native';

import images from '../res/images';

interface ImagePickerAvatarProps {
    uri: string;
    label?: string;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    style?: StyleProp<ViewStyle>;
}

const ImagePickerBook = ({uri, label, onPress, style}: ImagePickerAvatarProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.book}>
                <Image style={styles.avatarImage} source={uri ? {uri} : images.bookDefault} />
                <TouchableOpacity style={styles.addButton} onPress={onPress}>
                    <Image style={styles.addButtonIcon} source={images.addButton} />
                </TouchableOpacity>
            </View>
            <Text style={styles.textLabel}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    book: {
        position: 'relative',
    },
    avatarImage: {
        height: 130,
        width: 100,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 1,
    },
    addButton: {
        position: 'absolute',
        height: 40,
        width: 40,
        backgroundColor: '#f2f2fC',
        borderRadius: 20,
        bottom: 5,
        right: 5,
    },
    addButtonIcon: {
        height: 40,
        width: 40,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: 'gray',
        marginLeft: 10,
    },
});

export default ImagePickerBook;
