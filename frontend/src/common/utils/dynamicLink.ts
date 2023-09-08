import dynamicLinks, {FirebaseDynamicLinksTypes} from '@react-native-firebase/dynamic-links';
import {Linking} from 'react-native';

export const buildLink = async (deepLink: string) => {
    const link = await dynamicLinks().buildShortLink(
        {
            link: `https://ratebooknec.page.link/u9DC?deepLink=${deepLink}`,
            domainUriPrefix: 'https://ratebooknec.page.link',
            android: {
                packageName: 'com.frontend',
            },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
    );

    return link;
};

export const dynamicLinksListener = async () => {
    const link = await dynamicLinks().getInitialLink();
    if (link) handleDynamicLink(link);
};

export const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
    const navigateLink = link.url.slice(link.url.indexOf('=') + 1);
    setTimeout(() => {
        if (navigateLink) Linking.openURL(navigateLink);
    }, 2000);
};
