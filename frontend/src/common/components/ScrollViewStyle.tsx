import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';

const ScrollViewStyle = ({children, ...props}: ScrollViewProps) => {
    return <ScrollView {...props}>{children}</ScrollView>;
};

export default ScrollViewStyle;
