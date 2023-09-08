import {rateBookApiSlice} from '../rateBookApiSlice';

const imagesApi = rateBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadImage: builder.mutation<{photoLink: string}, FormData>({
            query: data => ({
                url: '/image/up_image',
                method: 'POST',
                body: data,
                formData: true,
            }),
        }),
        deleteImage: builder.mutation<{}, {oldLink: string[]}>({
            query: data => ({
                url: '/image/del_image',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useUploadImageMutation, useDeleteImageMutation} = imagesApi;

export default imagesApi;
