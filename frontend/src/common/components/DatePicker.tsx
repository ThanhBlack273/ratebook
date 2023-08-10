import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNDateTimePicker, {
    AndroidNativeProps,
    DateTimePickerEvent,
    IOSNativeProps,
    WindowsNativeProps,
} from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TextInputStyle from './TextInputStyle';

interface DatePickerIOSProps extends Omit<IOSNativeProps, 'onChange' | 'value'> {
    onChange: (e: DateTimePickerEvent, data: Date | undefined) => void;
    value: Date;
}
interface DatePickerAndroidProps extends Omit<AndroidNativeProps, 'onChange' | 'value'> {
    onChange: (e: DateTimePickerEvent, data: Date | undefined) => void;
    value: Date;
}
interface DatePickerWindowProps extends Omit<WindowsNativeProps, 'onChange' | 'value'> {
    onChange: (e: DateTimePickerEvent, data: Date | undefined) => void;
    value: Date;
}

const DatePicker = ({
    onChange,
    value,
    ...props
}: DatePickerIOSProps | DatePickerAndroidProps | DatePickerWindowProps) => {
    const [show, setShow] = useState(false);
    const handleChange = (e: DateTimePickerEvent, date: Date | undefined) => {
        setShow(false);
        onChange(e, date);
    };
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInputStyle
                    label="Date of birth"
                    showSoftInputOnFocus={false}
                    value={value.toDateString()}
                    editable={false}
                />
            </View>
            <AntDesign
                style={styles.icon}
                name="calendar"
                size={20}
                color="black"
                onPress={() => setShow(true)}
            />
            {show && <RNDateTimePicker onChange={handleChange} value={value} {...props} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        width: '100%',
    },
    icon: {
        position: 'absolute',
        right: 0,
    },
});

export default DatePicker;
