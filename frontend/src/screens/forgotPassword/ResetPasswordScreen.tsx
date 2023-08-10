import {useFormik} from 'formik';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

import {LoadingButton, ScrollViewStyle, TextInputStyle} from '../../common/components';
import {isAllInValidFieldOfObject, isAllValidFieldOfObject} from '../../common/utils/heaper';
import images from '../../common/res/images';
import {IResetPasswordInput, useResetPasswordMutation, useSignUpMutation} from '../../slices/auth';
import {ResetPasswordScreenProps} from '../../navigator/StackNavigatorTypes';

const validationSchema = yup.object({
    newPassword: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Password confirm is required'),
});

const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
};

const ResetPasswordScreen = ({route, navigation}: ResetPasswordScreenProps) => {
    const [resetPassword, {data, isLoading, error}] = useResetPasswordMutation();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit({...values, token: route.params.token});
        },
    });

    useEffect(() => {
        if (data) {
            Toast.show({
                type: 'success',
                text1: 'Verify fuccessfully',
                onHide: () => navigation.navigate('SignIn'),
            });
        }
    }, [data]);

    const handleSubmit = async (values: IResetPasswordInput) => {
        await resetPassword(values).unwrap();
    };
    return (
        <ScrollViewStyle contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContent}>
                    <Image style={styles.logoImage} source={images.logo} />
                </View>
                <View>
                    <TextInputStyle
                        label="New password"
                        secureTextEntry
                        onChangeText={formik.handleChange('newPassword')}
                        onBlur={formik.handleBlur('newPassword')}
                        value={formik.values.newPassword}
                        placeholder="Please provide your new password"
                        error={formik.touched.newPassword && formik.errors.newPassword}
                    />
                    <TextInputStyle
                        label="Password confirm"
                        secureTextEntry
                        onChangeText={formik.handleChange('confirmNewPassword')}
                        onBlur={formik.handleBlur('confirmNewPassword')}
                        value={formik.values.confirmNewPassword}
                        placeholder="Please provide your password confirm"
                        error={
                            formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                        }
                    />
                </View>
                <LoadingButton
                    text="Submit"
                    isLoading={isLoading}
                    onPress={() => formik.handleSubmit()}
                    disabled={
                        !(
                            isAllValidFieldOfObject(formik.values) &&
                            isAllInValidFieldOfObject(formik.errors)
                        )
                    }
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
        minHeight: '100%',
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

export default ResetPasswordScreen;
