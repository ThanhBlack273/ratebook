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

const ImagePickerAvatar = ({uri, label, onPress, style}: ImagePickerAvatarProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={uri ? {uri} : images.avatar} />
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
    avatar: {
        position: 'relative',
    },
    avatarImage: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 30,
    },
    addButton: {
        position: 'absolute',
        height: 20,
        width: 20,
        backgroundColor: '#f2f2fC',
        borderRadius: 20,
        bottom: 0,
        left: 0,
    },
    addButtonIcon: {
        height: 20,
        width: 20,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: 'gray',
        marginLeft: 10,
    },
});

export default ImagePickerAvatar;
