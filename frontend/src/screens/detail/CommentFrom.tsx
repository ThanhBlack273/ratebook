import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useEffect, useRef} from 'react';
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-toast-message';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LoadingButton, TextInputStyle} from '../../common/components';
import {
    createFormData,
    isAllInValidFieldOfObject,
    isAllValidFieldOfObject,
} from '../../common/utils/heaper';
import {getImageAsset} from '../../common/utils/imagePicker';
import {useDeleteImageMutation, useUploadImageMutation} from '../../slices/images';
import {useCreateCommentMutation, useEditCommentMutation} from '../../slices/reviews';
import {updateModalType} from '../../slices/books';
import {RootState} from '../../slices/store';

interface CommentFormProps {
    bookId?: string;
    data?: {
        id: number;
        rate: number;
        content: string;
        images: Array<string>;
    };
}

const validationSchema = yup.object({
    rate: yup.number().max(5).min(0).required('Email is required'),
    content: yup
        .string()
        .min(1, 'content should be of minimum 1 characters length')
        .required('content is required'),
});

const CommentForm = ({bookId = '', data}: CommentFormProps) => {
    const dispatch = useDispatch();
    const modalType = useSelector((state: RootState) => state.book.modalType);

    const formik = useFormik({
        initialValues: {
            rate: data?.rate || 0,
            content: data?.content || '',
            images: data?.images || [],
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        },
    });

    const [deleteImage] = useDeleteImageMutation();
    const [uploadImage, {isLoading: isLoadingImage, error}] = useUploadImageMutation();
    const [createComment, {isSuccess: isSuccessCreate, isLoading: isLoadingCreate}] =
        useCreateCommentMutation();
    const [editComment, {isSuccess: isSuccessEdit, isLoading: isLoadingEdit}] =
        useEditCommentMutation();

    const imagesRef = useRef<string[]>([]);

    useEffect(() => {
        if (isSuccessCreate || isSuccessEdit) {
            dispatch(updateModalType({type: ''}));
            Toast.show({
                text1:
                    modalType.type === 'NEW_COMMENT'
                        ? 'Add comment successfully'
                        : 'Edit comment successfully',
            });
        }
    }, [isSuccessCreate, isSuccessEdit]);

    useEffect(() => {
        return () => {
            const handleUnmount = () => {
                if (imagesRef.current.length === 0) return;
                deleteImage({oldLink: imagesRef.current}).unwrap();
            };
            handleUnmount();
        };
    }, []);

    const handleFinishRating = (value: number) => {
        formik.setFieldValue('rate', value);
    };

    const handleChooseImage = async () => {
        const asset = await getImageAsset();
        if (asset) {
            const formData = createFormData({
                image: asset,
            });
            const {photoLink} = await uploadImage(formData).unwrap();
            imagesRef.current = [...formik.values.images, photoLink];
            formik.setFieldValue('images', imagesRef.current);
        }
    };

    const handleRemove = async (image: string) => {
        const data = await deleteImage({oldLink: [image]}).unwrap();
        if (data) {
            const newImageList = formik.values.images.filter(e => e !== image);
            formik.setFieldValue('images', newImageList);
        }
    };

    const handleSubmit = async (values: typeof formik.values) => {
        if (modalType.type === 'NEW_COMMENT')
            await createComment({
                bookId,
                content: values.content,
                rate: String(values.rate),
                photoReview: values.images,
            }).unwrap();
        if (modalType.type === 'EDIT_COMMENT' && data)
            await editComment({
                bookId,
                reviewId: data?.id,
                content: values.content,
                rate: String(values.rate),
                photoReview: values.images,
            }).unwrap();
    };

    return (
        <View style={{width: '100%', marginTop: 15}}>
            <Rating
                startingValue={formik.values.rate}
                type="star"
                imageSize={25}
                onFinishRating={handleFinishRating}
            />
            <TextInputStyle
                label="Content"
                multiline={true}
                numberOfLines={4}
                onChangeText={formik.handleChange('content')}
                onBlur={formik.handleBlur('content')}
                value={formik.values.content}
                placeholder="Please provide your content"
                error={formik.touched.content && formik.errors.content}
                styleInput={{textAlignVertical: 'top'}}
            />
            <View>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>Upload Images</Text>
                <View style={styles.image}>
                    {formik.values.images.map(image => (
                        <View key={image} style={styles.avatarImage}>
                            <AntDesign
                                style={styles.iconRemove}
                                name="closecircle"
                                color="red"
                                size={20}
                                onPress={() => handleRemove(image)}
                            />
                            <Image style={styles.imageItem} source={{uri: image}} />
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={handleChooseImage}>
                        {isLoadingImage ? (
                            <ActivityIndicator size="small" color="#1E90FF" />
                        ) : (
                            <Text>+</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <LoadingButton
                text={modalType.type === 'NEW_COMMENT' ? 'Add comment' : 'Edit commet'}
                onPress={() => formik.handleSubmit()}
                isLoading={isLoadingEdit || isLoadingCreate}
                disabled={
                    !(
                        isAllValidFieldOfObject(formik.values) &&
                        isAllInValidFieldOfObject(formik.errors)
                    )
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    avatarImage: {
        height: 60,
        width: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        marginTop: 10,
        position: 'relative',
    },
    imageItem: {
        height: 60,
        width: 60,
    },
    addButton: {
        height: 60,
        width: 60,
        backgroundColor: '#f2f2fC',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        marginTop: 10,
    },
    iconRemove: {
        position: 'absolute',
        zIndex: 1,
        top: -10,
        right: -10,
    },
});
export default CommentForm;
