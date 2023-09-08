import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {LoadingButton} from '../../common/components';
import {updateModalType} from '../../slices/books';
import {useHideCommentMutation} from '../../slices/reviews';

interface HideAlertProps {
    reiviewId: string;
}

const HideAlert = ({reiviewId}: HideAlertProps) => {
    const dispatch = useDispatch();

    const [hideComment, {isLoading, isSuccess}] = useHideCommentMutation();

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateModalType({type: ''}));
            Toast.show({
                text1: 'Hide successfull',
            });
        }
    }, [isSuccess]);

    const handleHideComment = async () => {
        await hideComment(reiviewId).unwrap();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Are you sure you want to hide this item? You can undo this in the future
            </Text>
            <View style={styles.buttonAuth}>
                <LoadingButton
                    text="Close"
                    style={[styles.button, styles.whiteButton]}
                    onPress={() => dispatch(updateModalType({type: ''}))}
                />
                <LoadingButton
                    text="Hide"
                    style={styles.button}
                    isLoading={isLoading}
                    onPress={handleHideComment}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    button: {
        width: 60,
        height: 30,
    },
    buttonAuth: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    whiteButton: {
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#1E90FF',
    },
});

export default HideAlert;
