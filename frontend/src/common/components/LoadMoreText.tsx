import {useState} from 'react';
import {NativeSyntheticEvent, Text, TextLayoutEventData, TextProps, View} from 'react-native';

const LoadMoreText = ({children, ...rest}: TextProps) => {
    const [show, setShow] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const toggleNumberOfLines = () => {
        setShow(!show);
    };
    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        setLengthMore(event.nativeEvent.lines.length >= 4);
    };
    return (
        <View>
            <Text
                {...rest}
                onTextLayout={onTextLayout}
                numberOfLines={show ? undefined : rest.numberOfLines}>
                {children}
            </Text>
            {lengthMore && (
                <Text onPress={toggleNumberOfLines} style={{color: 'blue'}}>
                    {show ? 'Read less' : 'Read more'}
                </Text>
            )}
        </View>
    );
};

export default LoadMoreText;
