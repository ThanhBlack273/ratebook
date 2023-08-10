import {StyleSheet, Text, View} from 'react-native';

interface RadioItem {
    isChecked: boolean;
    label: string;
    value: string;
    handleChange: Function;
}

const RadioItem = ({isChecked, label, handleChange, value}: RadioItem) => {
    return (
        <View onTouchStart={() => handleChange(value)} style={styles.container}>
            <View style={[styles.content, isChecked && {borderColor: '#1E90FF'}]}>
                {isChecked ? <View style={styles.checked} /> : null}
            </View>
            <Text style={[styles.radioText, isChecked && {color: '#1E90FF'}]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    content: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#1E90FF',
    },
    radioText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
    },
});

export default RadioItem;
