import {useEffect, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useSelector} from 'react-redux';

import images from '../../common/res/images';
import TextInputStyle from '../../common/components/TextInputStyle';
import LoadingButton from '../../common/components/LoadingButton';
import {DatePicker, ImagePickerAvatar, ScrollViewStyle} from '../../common/components';
import {getImageAsset} from '../../common/utils/imagePicker';
import {REGEX_PHONE_NUMBER} from '../../common/constants';
import {
    createFormData,
    isAllInValidFieldOfObject,
    isAllValidFieldOfObject,
    isFormError,
} from '../../common/utils/heaper';
import {RootState} from '../../slices/store';
import {IUpdateUserInput, useUpdateUserMutation} from '../../slices/users';
import {Asset} from 'react-native-image-picker';
import {useDeleteImageMutation, useUploadImageMutation} from '../../slices/images';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    userName: yup.string().required('Password is required'),
    phoneNumber: yup
        .string()
        .matches(REGEX_PHONE_NUMBER, 'Phone number is not valid')
        .required('A phone number is required'),
});

type ISignUpInputError =
    | {
          [key in keyof IUpdateUserInput]: string;
      }
    | null;

const UserSettingScreen = () => {
    const {user} = useSelector((state: RootState) => state.auth);
    const photoLinkkRef = useRef<string>('');

    const formik = useFormik({
        initialValues: {
            email: user?.email,
            userName: user?.userName,
            phoneNumber: user?.phoneNumber,
            avatar: user?.avatar,
            dateOfBirth: new Date(user?.dateOfBirth || Date.now()),
        } as IUpdateUserInput,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        },
    });

    const [updateUser, {data, isLoading, error}] = useUpdateUserMutation();
    const [uploadImage] = useUploadImageMutation();
    const [deleteImage] = useDeleteImageMutation();

    useEffect(() => {
        if (data) {
            Toast.show({
                type: 'success',
                text1: 'Update successfully',
            });
        }
        if (error && isFormError(error)) {
            const formErrors = error.data.error as ISignUpInputError;
            for (const key in formErrors) {
                formik.setFieldError(key, formErrors[key as keyof IUpdateUserInput]);
            }
        }
    }, [data, error]);

    useEffect(() => {
        return () => {
            if (photoLinkkRef.current) deleteImage({oldLink: [photoLinkkRef.current]}).unwrap();
        };
    }, []);

    const handleChooseImage = async () => {
        const asset = await getImageAsset();
        if (asset) {
            if (formik.values.avatar) await deleteImage({oldLink: [formik.values.avatar]});
            const formData = createFormData({
                image: asset,
            });
            const {photoLink} = await uploadImage(formData).unwrap();
            formik.setFieldValue('avatar', photoLink);
            photoLinkkRef.current = photoLink;
        }
    };

    const handleChangeDate = (e: DateTimePickerEvent, date: Date | undefined) => {
        const selectedDate = date ? date : formik.values.dateOfBirth;
        formik.setFieldValue('dateOfBirth', selectedDate);
    };

    const handleSubmit = async (values: IUpdateUserInput) => {
        const data = await updateUser(values).unwrap();
        if (data) photoLinkkRef.current = '';
    };

    return (
        <ScrollViewStyle contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContent}>
                    <Image style={styles.logoImage} source={images.logo} />
                </View>
                <View>
                    <TextInputStyle
                        label="Email"
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                        placeholder="Please provide your email"
                        error={formik.touched.email && formik.errors.email}
                        editable={false}
                    />
                    <TextInputStyle
                        label="User name"
                        onChangeText={formik.handleChange('userName')}
                        onBlur={formik.handleBlur('userName')}
                        value={formik.values.userName}
                        placeholder="Please provide your confirm password"
                        error={formik.touched.userName && formik.errors.userName}
                    />
                    <TextInputStyle
                        label="Phone number"
                        onChangeText={formik.handleChange('phoneNumber')}
                        onBlur={formik.handleBlur('phoneNumber')}
                        value={formik.values.phoneNumber}
                        placeholder="Please provide your phone number"
                        error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                    <DatePicker label="Date of birth" onChange={handleChangeDate} value={formik.values.dateOfBirth} />
                    <ImagePickerAvatar
                        uri={formik.values.avatar}
                        label="Choose your avatar"
                        style={styles.imageInput}
                        onPress={handleChooseImage}
                    />
                </View>
                <LoadingButton
                    text="Update"
                    isLoading={isLoading}
                    onPress={() => formik.handleSubmit()}
                    disabled={!(isAllValidFieldOfObject(formik.values) && isAllInValidFieldOfObject(formik.errors))}
                />
            </View>
        </ScrollViewStyle>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
    },
    content: {
        marginTop: 20,
        width: '80%',
    },
    logoContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 70,
        height: 70,
    },
    navigate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    naviagteText: {
        fontSize: 13,
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
    imageInput: {
        marginBottom: 10,
    },
    secretContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secretItem: {
        flex: 0.48,
    },
});

export default UserSettingScreen;
