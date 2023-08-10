import {
    ImageLibraryOptions,
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';

export const getImageAsset = async () => {
    let options: ImageLibraryOptions = {
        selectionLimit: 1,
        mediaType: 'photo' as const,
        includeBase64: false,
    };
    const response: ImagePickerResponse = await launchImageLibrary(options);
    if (response) return response.assets ? response.assets[0] : undefined;
    return undefined;
};
