import {useEffect} from 'react';
import {useFormik} from 'formik';
import {Image, StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';

import {LoadingButton, PickerStyle, ScrollViewStyle, TextInputStyle} from '../../common/components';
import {isAllInValidFieldOfObject, isAllValidFieldOfObject} from '../../common/utils/heaper';
import {ForgotPasswordScreenProps} from '../../navigator/StackNavigatorTypes';
import {QUESTION_LIST} from '../../common/constants';
import images from '../../common/res/images';
import {IForgotPasswordInput, useForgotPasswordMutation} from '../../slices/auth';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    secretAsk: yup.string().required('A secret question is required'),
    secretAns: yup.string().required('A secret answer is required'),
});

const initialValues = {
    email: '',
    secretAsk: 'What is your mother name',
    secretAns: '',
};

const ForgotPasswordScreen = ({route, navigation}: ForgotPasswordScreenProps) => {
    const [forgotPassword, {data, isLoading, error}] = useForgotPasswordMutation();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        },
    });

    useEffect(() => {
        if (data) {
            Toast.show({
                type: 'success',
                text1: 'Verify fuccessfully',
                onHide: () => navigation.navigate('ResetPassword', {token: data.token}),
            });
        }
    }, [data]);

    const handleSubmit = async (values: IForgotPasswordInput) => {
        await forgotPassword(values).unwrap();
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
                    <View style={styles.secretItem}>
                        <PickerStyle
                            label="Secret question"
                            items={QUESTION_LIST}
                            selectedValue={formik.values.secretAsk}
                            onValueChange={value =>
                                formik.setFieldValue('secretAsk', value.toString())
                            }
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

export default ForgotPasswordScreen;
