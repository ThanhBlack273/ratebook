import {useEffect, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import {useFormik} from 'formik';
import * as yup from 'yup';

import images from '../../common/res/images';
import TextInputStyle from '../../common/components/TextInputStyle';
import LoadingButton from '../../common/components/LoadingButton';
import {DatePicker, ImagePickerAvatar, PickerStyle, ScrollViewStyle} from '../../common/components';
import {getImageAsset} from '../../common/utils/imagePicker';
import {ISignUpInput, useSignUpMutation} from '../../slices/auth';
import {QUESTION_LIST, REGEX_PHONE_NUMBER} from '../../common/constants';
import {SignUpProps} from '../../navigator';
import {
    createFormData,
    isAllInValidFieldOfObject,
    isAllValidFieldOfObject,
    isFormError,
} from '../../common/utils/heaper';
import {useDeleteImageMutation, useUploadImageMutation} from '../../slices/images';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Password confirm is required'),
    userName: yup.string().required('Password is required'),
    phoneNumber: yup
        .string()
        .matches(REGEX_PHONE_NUMBER, 'Phone number is not valid')
        .required('A phone number is required'),
    secretAsk: yup.string().required('A secret question is required'),
    secretAns: yup.string().required('A secret answer is required'),
});

const initialValues: ISignUpInput = {
    email: '',
    password: '',
    passwordConfirm: '',
    userName: '',
    phoneNumber: '',
    secretAsk: 'What is your mother name',
    secretAns: '',
    avatar: '',
    dateOfBirth: new Date(),
};

type ISignUpInputError =
    | {
          [key in keyof ISignUpInput]: string;
      }
    | null;

const SignUpScreen = ({route, navigation}: SignUpProps) => {
    const [uploadImage] = useUploadImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [signUp, {data, isLoading, error}] = useSignUpMutation();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        },
    });
    const photoLinkkRef = useRef<string>('');

    useEffect(() => {
        if (data) {
            Toast.show({
                type: 'success',
                text1: 'Sign up successfully',
                onHide: () => navigation.navigate('SignIn'),
            });
        }
        if (error && isFormError(error)) {
            const formErrors = error.data.error as ISignUpInputError;
            for (const key in formErrors) {
                formik.setFieldError(key, formErrors[key as keyof ISignUpInput]);
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

    const handleSubmit = async (values: ISignUpInput) => {
        const data = await signUp(values).unwrap();
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
                    />
                    <TextInputStyle
                        label="Password"
                        secureTextEntry
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        value={formik.values.password}
                        placeholder="Please provide your password"
                        error={formik.touched.password && formik.errors.password}
                    />
                    <TextInputStyle
                        label="Password confirm"
                        secureTextEntry
                        onChangeText={formik.handleChange('passwordConfirm')}
                        onBlur={formik.handleBlur('passwordConfirm')}
                        value={formik.values.passwordConfirm}
                        placeholder="Please provide your password confirm"
                        error={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
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
                    <View style={styles.secretContainer}>
                        <View style={styles.secretItem}>
                            <PickerStyle
                                label="Secret question"
                                items={QUESTION_LIST}
                                selectedValue={formik.values.secretAsk}
                                onValueChange={value => formik.setFieldValue('secretAsk', value.toString())}
                                onBlur={formik.handleBlur('secretAsk')}
                            />
                        </View>
                        <View style={styles.secretItem}>
                            <TextInputStyle
                                label="Secret answer"
                                onChangeText={formik.handleChange('secretAns')}
                                onBlur={formik.handleBlur('secretAns')}
                                value={formik.values.secretAns}
                                placeholder="Please provide a secret answer"
                                error={formik.touched.secretAns && formik.errors.secretAns}
                            />
                        </View>
                    </View>
                    <DatePicker label="Date of birth" onChange={handleChangeDate} value={formik.values.dateOfBirth} />
                    <ImagePickerAvatar
                        uri={formik.values.avatar}
                        label="Choose your avatar"
                        style={styles.imageInput}
                        onPress={handleChooseImage}
                    />
                </View>
                <LoadingButton
                    text="Sign In"
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

export default SignUpScreen;
