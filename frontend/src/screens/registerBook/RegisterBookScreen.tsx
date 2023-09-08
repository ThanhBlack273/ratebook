import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import {useEffect, useRef} from 'react';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';

import {DatePicker, ImagePickerBook, LoadingButton, TextInputStyle} from '../../common/components';
import {createFormData, isAllInValidFieldOfObject, isAllValidFieldOfObject} from '../../common/utils/heaper';
import {RegisterBookScreenProps} from '../../navigator/StackNavigatorTypes';
import {getImageAsset} from '../../common/utils/imagePicker';
import {useGetGGBookQuery, useRegisterBookMutation} from '../../slices/books';
import {useDeleteImageMutation, useUploadImageMutation} from '../../slices/images';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publisher: yup.string().required('Publisher is required'),
    publishedDate: yup.string().required('Publisher is required'),
    ISBN_10: yup.string().required('ISBN_10 is required'),
    ISBN_13: yup.string().required('ISBN_13 is required'),
});

const initialValues = {
    title: '',
    subtitle: '',
    author: '',
    publisher: '',
    publishedDate: new Date(),
    ISBN_10: '',
    ISBN_13: '',
    description: '',
    photoLink: '',
};

const RegisterBookScreen = ({route, navigation}: RegisterBookScreenProps) => {
    // State, ref variable
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        },
    });
    const photoLinkkRef = useRef<string>('');

    // Call API
    const [uploadImage] = useUploadImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [registerBook, {data: registedBook, isLoading}] = useRegisterBookMutation();
    const {data: bookData, isFetching} = useGetGGBookQuery(route.params.id as string, {
        skip: !route.params.id,
    });

    // Effect component
    useEffect(() => {
        if (bookData) {
            formik.setValues({
                author: bookData.author?.join(', ') || '',
                description: bookData.description || '',
                ISBN_10: bookData.ISBN_10 || '',
                ISBN_13: bookData.ISBN_13 || '',
                photoLink: bookData.smallThumbnail || bookData.small || '',
                publishedDate: bookData.publishedDate ? new Date(bookData.publishedDate) : new Date(),
                publisher: bookData.publisher || '',
                subtitle: bookData.subtitle || '',
                title: bookData.title || '',
            });
        }
    }, [bookData]);

    useEffect(() => {
        if (registedBook) {
            photoLinkkRef.current = '';
            Toast.show({
                text1: 'Register successfully',
                onHide: () =>
                    navigation.navigate('Books', {
                        screen: 'RegisteredBook',
                    }),
            });
        }
    }, [registedBook]);

    useEffect(() => {
        return () => {
            if (photoLinkkRef.current && !photoLinkkRef.current.includes('.google'))
                deleteImage({oldLink: [photoLinkkRef.current]}).unwrap();
        };
    }, []);

    // functions handle events
    const handleChooseImage = async () => {
        const asset = await getImageAsset();
        if (asset) {
            if (formik.values.photoLink && !formik.values.photoLink.includes('.google'))
                await deleteImage({oldLink: [formik.values.photoLink]});
            const formData = createFormData({
                image: asset,
            });
            const {photoLink} = await uploadImage(formData).unwrap();
            formik.setFieldValue('photoLink', photoLink);
            photoLinkkRef.current = photoLink;
        }
    };

    const handleSubmit = async (values: typeof initialValues) => {
        await registerBook({
            ...values,
            publishedDate: values.publishedDate.toISOString(),
            author: [values.author],
            thumbnail: values.photoLink,
            smallThumbnail: values.photoLink,
        }).unwrap();
    };

    const handleChangeDate = (e: DateTimePickerEvent, date: Date | undefined) => {
        const publishedDate = date ? date : formik.values.publishedDate;
        formik.setFieldValue('publishedDate', publishedDate);
    };

    if (isFetching) return <ActivityIndicator style={styles.activityIndicator} size="large" color="#1E90FF" />;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.containerMainInfor}>
                    <ImagePickerBook uri={formik.values.photoLink} onPress={handleChooseImage} />
                    <View style={styles.mainInforText}>
                        <TextInputStyle
                            label="Title"
                            onChangeText={formik.handleChange('title')}
                            onBlur={formik.handleBlur('title')}
                            value={formik.values.title}
                            placeholder="Please provide your title"
                            error={formik.touched.title && formik.errors.title}
                        />
                        <TextInputStyle
                            label="Subtitle"
                            onChangeText={formik.handleChange('subtitle')}
                            onBlur={formik.handleBlur('subtitle')}
                            value={formik.values.subtitle}
                            placeholder="Please provide your subtitle"
                            error={formik.touched.subtitle && formik.errors.subtitle}
                        />
                    </View>
                </View>
                <View style={styles.moreInfoBook}>
                    <TextInputStyle
                        label="Author"
                        onChangeText={formik.handleChange('author')}
                        onBlur={formik.handleBlur('author')}
                        value={formik.values.author}
                        placeholder="Please provide book's author"
                        error={formik.touched.author && formik.errors.author}
                    />
                    <TextInputStyle
                        label="Publisher"
                        onChangeText={formik.handleChange('publisher')}
                        onBlur={formik.handleBlur('publisher')}
                        value={formik.values.publisher}
                        placeholder="Please provide book's publisher"
                        error={formik.touched.publisher && formik.errors.publisher}
                    />
                    <DatePicker
                        label="Published date"
                        onChange={handleChangeDate}
                        value={formik.values.publishedDate}
                    />
                    <TextInputStyle
                        label="ISBN 10"
                        onChangeText={formik.handleChange('ISBN_10')}
                        onBlur={formik.handleBlur('ISBN_10')}
                        value={formik.values.ISBN_10}
                        placeholder="Please provide book's ISBN 10"
                        error={formik.touched.ISBN_10 && formik.errors.ISBN_10}
                    />
                    <TextInputStyle
                        label="ISBN 13"
                        onChangeText={formik.handleChange('ISBN_13')}
                        onBlur={formik.handleBlur('ISBN_13')}
                        value={formik.values.ISBN_13}
                        placeholder="Please provide book's ISBN 13"
                        error={formik.touched.ISBN_13 && formik.errors.ISBN_13}
                    />
                    <TextInputStyle
                        label="Description"
                        onChangeText={formik.handleChange('description')}
                        onBlur={formik.handleBlur('description')}
                        value={formik.values.description}
                        placeholder="Please provide book's description"
                        error={formik.touched.description && formik.errors.description}
                    />
                </View>
                <LoadingButton
                    text="Register"
                    onPress={() => formik.handleSubmit()}
                    isLoading={isLoading}
                    disabled={
                        !(
                            isAllValidFieldOfObject(formik.values, ['subtitle']) &&
                            isAllInValidFieldOfObject(formik.errors)
                        )
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        marginTop: 20,
        width: '80%',
    },
    containerMainInfor: {
        flexDirection: 'row',
    },
    mainInforText: {
        width: '65%',
    },
    moreInfoBook: {
        marginTop: 15,
    },
    activityIndicator: {
        marginTop: 10,
    },
});
export default RegisterBookScreen;
