import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../slices/store';
import CommentForm from '../../screens/detail/CommentFrom';
import HideAlert from '../../screens/detail/HideAlert';
import DeleteAlert from '../../screens/detail/DeleteAlert';
import {updateModalType} from '../../slices/books';
import RequestToReview from '../../screens/detail/RequestToReview';

const CustomModal = () => {
    const modalType = useSelector((state: RootState) => state.book.modalType);

    const dispatch = useDispatch();

    return (
        <Modal
            animationType="fade"
            visible={Boolean(modalType.type)}
            onRequestClose={() => dispatch(updateModalType({type: ''}))}
            transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.titleContent}>
                        <MaterialCommunityIcons
                            name="keyboard-backspace"
                            size={30}
                            color="#1E90FF"
                            onPress={() => dispatch(updateModalType({type: ''}))}
                            style={styles.back}
                        />
                        <Text style={styles.title}>{modalType.type}</Text>
                    </View>
                    {/* START CHILDREN CONTENT */}
                    {modalType.type === 'NEW_COMMENT' && <CommentForm bookId={modalType.value} />}
                    {modalType.type === 'HIDE_COMMENT' && <HideAlert reiviewId={modalType.value} />}
                    {modalType.type === 'DELETE_COMMENT' && <DeleteAlert reiviewId={modalType.value} />}
                    {modalType.type === 'EDIT_COMMENT' && (
                        <CommentForm
                            bookId={modalType.value.bookId}
                            data={{
                                id: modalType.value.id,
                                content: modalType.value.content,
                                images: modalType.value.images,
                                rate: Number(modalType.value.rate),
                            }}
                        />
                    )}
                    {modalType.type === 'REQUEST_TO_REVIEW' && <RequestToReview bookId={modalType.value} />}
                    {/*END CHILDREN CONTENT */}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(210, 210, 210, 0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        paddingTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    back: {
        position: 'absolute',
        alignSelf: 'center',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
});

export default CustomModal;
