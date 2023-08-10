import {Picker, PickerProps} from '@react-native-picker/picker';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface PickerStyleProps extends PickerProps {
    label?: string;
    error?: string;
    items: Array<{
        label: string;
        value: string;
    }>;
}

const PickerStyle = ({label, error, items, ...props}: PickerStyleProps) => {
    return (
        <View style={styles.inputContainer}>
            {label && (
                <Text style={[styles.text, error ? {color: 'red'} : undefined]}>{label}</Text>
            )}
            <View style={styles.pickerContainer}>
                <Picker style={styles.picker} {...props}>
                    {items.map(item => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
            {error && <Text style={styles.textError}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    pickerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 35,
    },
    picker: {
        width: '110%',
        position: 'relative',
        top: -10,
        left: -15,
    },
    pickerItem: {},
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

export default PickerStyle;
