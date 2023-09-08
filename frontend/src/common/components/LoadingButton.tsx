import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface LoadingButtonProps {
    text: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    isLoading?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
}

const LoadingButton = ({
    text,
    isLoading = false,
    onPress = undefined,
    disabled = false,
    children,
    style = {},
    styleText = {},
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
                        <View style={styles.buttonContent}>
                            {children}
                            <Text style={[styles.buttonText, styleText]}>{text}</Text>
                        </View>
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
    buttonContent: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default LoadingButton;
