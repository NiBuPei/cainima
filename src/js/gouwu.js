$('.header').load("../layout/header.html")
$('.top').load("../layout/top.html",
    function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            $(document).on('click', '#btn', function () {
                location.href = '../html/list.html';
            })
            $(document).on('click', '#sece', function () {
                if (getCookie('login_user')) {
                    location.href = '../html/gouwu.html';
                }
                else {
                    layer.msg('请先登录')
                }
            })
        })
    })
$('.footer').load("../layout/footer.html")


layui.use('layer', function () {
    var layer = layui.layer;

    $(document).ready(function () {
        $.ajax({
            url: 'http://zl1697415917.gz01.bdysite.com/php/user-gouwuget.php',
            dataTye: 'json',
            success: (data) => {
                var dataObj = eval("(" + data + ")");
                var { code, data } = dataObj;
                if (code) {
                    var html = '';
                    data.forEach(({ id, price, img, name, num }) => {
                        // console.log(name)
                        html += `
                        <tr class="ids" date="${id}">
                            <td class="checkbox">
                                <input class="check-one check" type="checkbox" />
                            </td>
                            <td class="goods">
                                <img src="${img}" alt="" /><span>${name}</span>
                            </td>
                            <td class="sprice">
                                <span>￥</span>
                                <span id="price">${price}</span>
                            </td>
                            <td class="count">
                                <div class="duce">-</div>
                                <div class="input" value="1">${num}</div>
                                <div class="add">+</div>
                            </td>
                            <td class="subt">
                                <span>￥</span>
                                <span id="pre">${price}</span>
                            </td>
                            <td class="opera">
                                <span class="delete">×</span>
                            </td>
                        </tr>
                    `
                    });

                    $('.tbody').html(html);
                }
            }
        })
    })

    //勾选///////////////////////////////////////////////////////

    $(".check-all").click(function () {//全选  
        $('.check-one').prop('checked', $(this).prop('checked'));
        showmo(); //刷新数字
    });
    $('.tbody').on('change', '.check-one', function () {//单选
        if ($('.check-one:checked').length === $('.check-one').length) {
            $('.check-all').prop('checked', true);
            showmo();
        } else {
            $('.check-all').prop('checked', false);
            showmo();
        }
    });

    /********************************************************** *///点击加减
    $(".tbody").on("click", ".add", function () {//+
        var pan = $(this).prev();
        var cnt = pan.text();
        cnt++;
        pan.html(cnt);
        PriceLine(pan, cnt);
        showmo();
    });
    $(".tbody").on("click", ".duce", function () { //-
        var pan = $(this).siblings(".input");
        var cnt = pan.text();
        if (cnt > 1) {
            cnt--;
            pan.text(cnt);
            PriceLine(pan, cnt);
        }
        showmo();
    });

    function PriceLine(cnt, num) {
        var parent = cnt.parent();
        var nextparent = parent.next();
        var price = nextparent.children("#price");
        var DaPrice = price.text(); //单价
        var total = cnt.parent().nextAll(".sub").children(".total");
        total.text(DaPrice * num);
    }
    /*************************************************************** */
    $(".tbody").on('click', '.delete', function () {//删除
        // var id = $(this).attr('id');  //id值没有取出
        var id = $(this).parent().parent().attr('date')
        var name = $('.goods span').html();
        //  console.log(id);
        $.ajax({
            url: "http://zl1697415917.gz01.bdysite.com/php/user-gouwuset.php",
            data: {
                id,
                name
            },
            dataType: "json",
            success: ({ code, msg }) => {
                // console.log(code);
                if (code) {
                    layer.msg(msg);
                } else {
                    layer.msg(msg);
                }
            }
        })
        var parent = $(this).parent().parent();
        parent.remove();

    });

    $(document).on('click', '.closing', function () { //添加数据
        list = $(".check-one");
        var price;
        var id;
        var num = 0;
        var name;
        var jinge = 0;
        var img;
        var heji = $("#priceTotal").text();
        // console.log(list);
        // console.log(heji);


        for (var i = 0; i < list.length; i++) {
            if (list[i].checked) {
                id = $(list[i]).parent().parent().attr('date')
                // console.log(id)
                price = $(list[i]).parent().nextAll(".sprice").children("#price").text();
                num = $(list[i]).parent().nextAll(".count").children(".input").text();
                sun = $(list[i]).parent().nextAll(".subt").children("#pre");
                name = $(list[i]).parent().nextAll(".goods").children('span').text();
                img = $(list[i]).parent().nextAll(".goods").children('img').attr('src')
                sun.text(price * num);
                jinge = parseInt(sun.text());
            }
            $.ajax({
                url: 'http://zl1697415917.gz01.bdysite.com/php/user-jiesuan.php',
                data: {
                    img,
                    num,
                    price,
                    id,
                    name,
                    jinge,
                    heji
                },
                dataType: 'json'
            }).then(function (data) {
                var {
                    code,
                    msg
                } = data;
                if (code) {
                    layer.msg(msg);
                    location.href = '../html/jiesuan.html';
                } else {
                    layer.msg(msg);
                }
            })
        }
    })

    function showmo() { //刷新总金额
        list = $(".check-one");
        var price = 0;
        var nu = 0;
        var sun;
        var a = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].checked) {
                price = $(list[i]).parent().nextAll(".sprice").children("#price").text();
                var num = $(list[i]).parent().nextAll(".count").children(".input").text();
                sun = $(list[i]).parent().nextAll(".subt").children("#pre");

                sun.text(price * num)

                a += parseInt(sun.text());
                nu += parseInt(num * 1);
            } else {
                $(list[i]).parent().nextAll(".subt").children(".total").text(0);
            }

        }
        $("#priceTotal").text(a);
        $("#selectedTotal").text(nu);
    }

    function showlist() { //刷新购物车
        $.ajax({
            url: 'http://zl1697415917.gz01.bdysite.com/php/user-gouwuget.php',
            dataTye: 'json',
            success: (data) => {
                var dataObj = eval("(" + data + ")");
                var { code, data } = dataObj;
                if (code) {
                    var html = '';
                    data.forEach(({ price, img, name, num }) => {
                        // console.log(name)
                        html += `
                        <tr date="${id}">
                            <td class="checkbox">
                                <input class="check-one check" type="checkbox" />
                            </td>
                            <td class="goods">
                                <img src="${img}" alt="" /><span>${name}</span>
                            </td>
                            <td class="sprice">
                                <span>￥</span>
                                <span id="price">${price}</span>
                            </td>
                            <td class="count">
                                <span class="duce">-</span>
                                <div class="input" value="1">${num}</div>
                                <span class="add">+</span>
                            </td>
                            <td class="subt">
                                <span>￥</span>
                                <span id="pre">${price}</span>
                            </td>
                            <td class="opera">
                                <span class="delete">×</span>
                            </td>
                        </tr>
                    `
                    });

                    $('.tbody').html(html);
                }

            }
        });
    }

});  
