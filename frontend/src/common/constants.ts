import {LinkingOptions} from '@react-navigation/native';

export const REGEX_PHONE_NUMBER =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const PADDING_OFFSET = 1;
export const BOOKS_PER_PAGE = 10;
export const REVIEWS_PER_PAGE = 10;
export const QUESTION_LIST = [
    {
        label: 'What is your mother name',
        value: 'What is your mother name',
    },
    {
        label: 'What is your father name',
        value: 'What is your father name',
    },
];

export const SORT_BY = [
    {
        label: 'A - Z',
        value: 'AZ',
    },
    {
        label: 'Z - A',
        value: 'ZA',
    },
    {
        label: 'Latest',
        value: 'latest',
    },
    {
        label: 'Oldest',
        value: 'oldest',
    },
];

export const SEARCH_RADIO_ITEMS = [
    {
        label: 'From RateBook',
        value: 'ratebook',
    },
    {
        label: 'From Google',
        value: 'google',
    },
];

export const LINKING: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['frontend://'],
    config: {
        screens: {
            Home: {
                screens: {
                    Detail: {
                        path: 'detail/:id',
                        parse: {
                            id: (id: any) => `${id}`,
                        },
                    },
                },
            },
        },
    },
};
