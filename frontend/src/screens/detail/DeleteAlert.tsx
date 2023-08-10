import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {LoadingButton} from '../../common/components';
import {updateModalType} from '../../slices/books';
import {useDeleteCommentMutation} from '../../slices/reviews';

interface DeleteAlertProps {
    reiviewId: string;
}

const DeleteAlert = ({reiviewId}: DeleteAlertProps) => {
    const dispatch = useDispatch();

    const [deleteComment, {isLoading, isSuccess}] = useDeleteCommentMutation();

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateModalType({type: ''}));
            Toast.show({
                text1: 'Delete successfull',
            });
        }
    }, [isSuccess]);

    const handleDeleteComment = async () => {
        await deleteComment(reiviewId).unwrap();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Are you sure you want to delete this item? You can undo this in the future
            </Text>
            <View style={styles.buttonAuth}>
                <LoadingButton
                    text="Close"
                    style={[styles.button, styles.whiteButton]}
                    onPress={() => dispatch(updateModalType({type: ''}))}
                />
                <LoadingButton
                    text="Delete"
                    style={styles.button}
                    isLoading={isLoading}
                    onPress={handleDeleteComment}
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

export default DeleteAlert;
