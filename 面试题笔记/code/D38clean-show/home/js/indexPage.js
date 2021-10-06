var flag = null;

$(function() {
    // 默认加载第一页的数据
    var num = 1;
    flag = true;
    imgList(num);

    // 判断懒加载的时机，滚动条是否触底
    $(window).scroll(function () {
        // 滚动条和顶部高度
        var scrollTop = Math.ceil($(this).scrollTop());

        // 当前视口的高度
        var _h = $(this).height();

        // 当前页面的高度
        var h = $(document).height();

        if (scrollTop + _h >= h) {
            if (flag) {
                num++;
                imgList(num);
            }
        }
    })
});
// 加载后端接口数据的方法
function imgList(size) {
    $.ajax({
        type: 'get',
        url: `http://127.0.0.1:2000/home?page=${size}`,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var data = res.data;

            if (res.status === 200) {
                if (data.length == 0) return;

                $.each(data, function(index, item) {
                    var str = `
                        <li class="lists">
                        <img src=${item.imgUrl} width="150" height="150">
                        <label>
                            <b class="discount">${item.newPrice}</b>
                            <span class="price-text">${item.oldPrice}</span>
                        </label>
                    `

                    $('.index-main ul').append(str);
                })
            } else {
                flag = false;
                $('.button').show();
            }
        }
    })
}