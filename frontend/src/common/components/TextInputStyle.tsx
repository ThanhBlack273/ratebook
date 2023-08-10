import {useRef, useState} from 'react';
import {
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';

interface TextInputStyleProps extends Omit<Omit<TextInputProps, 'onBlur'>, 'onFocus'> {
    label: string;
    error?: string | boolean;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    style?: StyleProp<ViewStyle>;
}

const TextInputStyle = ({
    label,
    error,
    onBlur,
    onFocus,
    style,
    ...textInputProps
}: TextInputStyleProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (onFocus) onFocus(e);
        setIsFocus(true);
    };
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (onBlur) onBlur(e);
        setIsFocus(false);
    };

    return (
        <View style={[styles.inputContainer, style]}>
            {label && (
                <Text
                    style={[
                        styles.text,
                        isFocus ? {color: '#1E90FF'} : undefined,
                        error ? {color: 'red'} : undefined,
                    ]}>
                    {label}
                </Text>
            )}
            <TextInput
                onBlur={e => handleBlur(e)}
                onFocus={e => handleFocus(e)}
                style={[
                    styles.input,
                    isFocus ? {borderBottomColor: '#1E90FF'} : undefined,
                    error ? {borderBottomColor: 'red'} : undefined,
                ]}
                {...textInputProps}
            />
            {error && <Text style={styles.textError}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 14,
        padding: 0,
        paddingTop: 2,
        paddingBottom: 4,
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
    textError: {
        color: 'red',
        padding: 0,
        margin: 0,
    },
});

export default TextInputStyle;
