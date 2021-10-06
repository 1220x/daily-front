module.exports = {
    arr: [
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/1.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/2.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/3.png', oldPrice: 310, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/2.png', oldPrice: 320, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/1.png', oldPrice: 330, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/3.png', oldPrice: 340, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/2.png', oldPrice: 350, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/1.png', oldPrice: 360, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/1.png', oldPrice: 370, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/4.jpg', oldPrice: 380, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/2.png', oldPrice: 390, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/3.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/4.jpg', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/1.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/2.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/3.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/4.jpg', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/3.png', oldPrice: 300, newPrice: 200 },
        { imgUrl: 'http://127.0.0.1:2000/static/imgs/2.png', oldPrice: 300, newPrice: 200 }
    ],
    /**
     * 实现分页的方法
     * @name getTableData
     * @desc 分页方法
     * @param { Number } page 当前页码，默认1
     * @param { Number } pageSize 每页最多显示条数，默认10
     * @param { Array } totalData 总的数据集，默认为空数组
     * @return { Object }
     * data     当前页展示的数据，数组
     * page     当前页面
     * pageSize 每页最多显示条数
     * length   总的数据条数
     * **/
    getTableData: (page = 1, pageSize = 10, totalData = []) => {
        const { length } = totalData;
        const tableData = {
            data: [],
            page,
            pageSize,
            length,
            status: true    // 代表有数据
        };

        if (pageSize >= length) {
            // pageSize大于等于总数据长度，说明只有一页数据或是没有数据
            tableData.data = totalData;
            tableData.page = 1; // 直接取第一页
        } else {
            // 计算当前页(不含)之前的所有数据总条数
            const num = pageSize * (page - 1);
            // const num = pageSize * page;
            if (num < length) {
                // 如果当前页所有数据之和小于(不能等于)总的数据集长度，则说明当前页面没有超出最大页码
                // 当前页第一条数据在总数据中的索引
                const startIndex = num;
                const endIndex = num + pageSize - 1;
                tableData.data = totalData.filter((_, index) => {
                    return index >= startIndex && index <= endIndex;
                });
            } else {
                // 当前页码超出最大页面，则计算实际最后一页的page，自动返回最后一页的数据
                const size = parseInt(length / pageSize);
                const rest = length % pageSize;

                if (rest > 0) {
                    // 余数大于0，说明实际最后一页数据不足pageSize
                    // 当前页码重置，取size + 1
                    tableData.page = size + 1;
                    tableData.data = totalData.filter((_, index) => index >= (size * pageSize) && index <= length);
                    tableData.status = false;
                } else if (rest == 0) {
                    // 余数等于0，最后一页数据恰好是pageSize
                    // tableData.page = size + 1;
                    // tableData.data = totalData.filter((_, index) => index >= (size * pageSize) && index <= length);

                    tableData.status = false;
                    // tableData.page = size;
                    // tableData.data = totalData.filter((_, index) => index >= (pageSize * (size - 1)) && index < length);
                    // tableData.data = ['数据到底了'];
                }
            }
        }

        return tableData;
    }
}