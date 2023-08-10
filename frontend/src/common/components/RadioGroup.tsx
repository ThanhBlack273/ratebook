import {StyleProp, View, ViewStyle} from 'react-native';
import RadioItem from './RadioItem';

interface Item {
    label: string;
    value: string;
}

interface RadioGroupProps {
    items: Item[];
    value: any;
    onChange: React.Dispatch<any>;
    style?: StyleProp<ViewStyle>;
}

const RadioGroup = ({items, value, onChange, style}: RadioGroupProps) => {
    const handleChange = (value: unknown) => {
        onChange(value);
    };
    return (
        <View style={style}>
            {items.map((item: Item) => (
                <RadioItem
                    key={item.label}
                    isChecked={item.value === value}
                    label={item.label}
                    value={item.value}
                    handleChange={handleChange}
                />
            ))}
        </View>
    );
};

export default RadioGroup;
