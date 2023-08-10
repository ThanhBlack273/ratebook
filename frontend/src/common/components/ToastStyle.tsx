import Toast, {BaseToast, ErrorToast, BaseToastProps} from 'react-native-toast-message';

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{borderLeftColor: 'green', backgroundColor: '#C1FFD5'}}
            contentContainerStyle={{paddingHorizontal: 15}}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
            }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{borderLeftColor: 'red', backgroundColor: '#FFCCCB'}}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
            }}
        />
    ),
};

const ToastStyle = () => <Toast config={toastConfig} autoHide={true} visibilityTime={2000} />;

export default ToastStyle;
