import {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';

import images from '../../common/res/images';
import TextInputStyle from '../../common/components/TextInputStyle';
import LoadingButton from '../../common/components/LoadingButton';
import {SignInProps} from '../../navigator';
import {isAllInValidFieldOfObject, isAllValidFieldOfObject} from '../../common/utils/heaper';
import {ISignInInput} from '../../slices/auth';
import {useSignInMutation} from '../../slices/auth';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignInScreen = ({route, navigation}: SignInProps) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        },
    });
    const [signIn, {data, isLoading, error}] = useSignInMutation();

    useEffect(() => {
        if (data) {
            Toast.show({
                text1: 'Sign in successfully',
                onHide: () =>
                    navigation.navigate('Books', {
                        screen: 'RegisteredBook',
                    }),
            });
        }
    }, [data]);

    const handleSubmit = async (values: ISignInInput) => {
        await signIn(values).unwrap();
    };

    return (
        <View style={styles.container}>
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
                </View>
                <LoadingButton
                    text="Sign In"
                    onPress={() => formik.handleSubmit()}
                    isLoading={isLoading}
                    disabled={
                        !(
                            isAllValidFieldOfObject(formik.values) &&
                            isAllInValidFieldOfObject(formik.errors)
                        )
                    }
                />
                <View style={styles.navigate}>
                    <Text style={styles.naviagteText} onPress={() => navigation.navigate('SignUp')}>
                        Sign up
                    </Text>
                    <Text
                        style={styles.naviagteText}
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password?
                    </Text>
                </View>
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
});
export default SignInScreen;
