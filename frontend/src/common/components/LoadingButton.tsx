import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface LoadingButtonProps {
    text: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    isLoading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

const LoadingButton = ({
    text,
    isLoading = false,
    onPress = undefined,
    disabled = false,
    style = {},
}: LoadingButtonProps) => {
    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={onPress} disabled={disabled || isLoading}>
                <View
                    style={[
                        {
                            ...styles.button,
                            backgroundColor: disabled ? 'gainsboro' : '#1E90FF',
                        },
                        style,
                    ]}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="yellow" />
                    ) : (
                        <Text style={styles.buttonText}>{text}</Text>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: 40,
    },
    buttonText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default LoadingButton;
