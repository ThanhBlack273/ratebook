import { Model } from 'sequelize';

interface iData {
    count: number;
    rows: Array<Model>;
}

class Paging implements iData {
    public count: number;
    public rows: Array<Model>;
    static getPagingData = (data: iData, page: number, limit: number) => {
        const { count: totalDatas, rows: datas } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalDatas / limit);
        return { totalDatas, datas, totalPages, currentPage };
    };
}

export default Paging;
