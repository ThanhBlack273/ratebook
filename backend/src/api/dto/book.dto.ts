export type CreateBookDTO = {
    userId: number;
    ISBN_10: string;
    ISBN_13: string;
    title: string;
    subtitle: string;
    author: string[];
    publisher: [];
    publishedDate: Date;
    description: Text;
    smallThumbnail: Text;
    thumbnail: Text;
    small: Text;
    medium: Text;
    large: Text;
    star: string;
    countRate: number;
};

export type QueryBookDTO = {
    id: number;
    ISBN_10: string;
    ISBN_13: string;
    page: number;
};
