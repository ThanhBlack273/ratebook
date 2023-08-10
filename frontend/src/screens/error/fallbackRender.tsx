import {ErrorBoundaryProps, FallbackProps} from 'react-error-boundary';
import {Text, View} from 'react-native';

function fallbackRender(props: FallbackProps) {
    return (
        <View>
            <Text>Something went wrong</Text>
        </View>
    );
}

export default fallbackRender;
