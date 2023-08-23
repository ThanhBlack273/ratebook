import { Model } from 'sequelize';
export const getPagingData = (data: iData, page: number, limit: number) => {
    const { count: totalDatas, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    return { totalDatas, datas, totalPages, currentPage };
};

interface iData {
    count: number;
    rows: Array<Model>;
}
