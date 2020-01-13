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


var id = querystring('id');

$.ajax({
    url: 'http://zl1697415917.gz01.bdysite.com/php/user-xiangqin.php',
    data: {
        id,
    },
    dataTye: 'json',
    success: (data) => {
        var dataObj = eval("(" + data + ")");
        var { code, msg, data } = dataObj;
        var { img, name, price, des, img2, img3, img4 } = data;
        var html = `
            <div class="suya">
                <div class="nu-a">
                    <div class="img">
                        <img src="${img}" alt="">
                        <div class="minbox"></div>
                    </div>
                    <div class="fang">
                        <img src="${img}" alt="">
                    </div>
                </div>
                <div class="nu-b">
                    <div class="nubs">
                        <img src="${img}" alt="">
                        <img src="${img2}" alt="">
                        <img src="${img3}" alt="">
                        <img src="${img4}" alt="">
                    </div>
                </div>
                <div class="nu-c">
                    <div class="get-a">${name}
                    </div>
                    <span class="shh">${des}</span>
                    <div class="get-b">
                        <div class="rb-a">
                            <span>售价</span>
                            ￥<div>${price}</div>
                        </div>
                        <div class="rb-b">
                            <span class="span">服务</span>
                            <div class="sver">
                                <div><a href=""></a>
                                    <span>满99包邮</span></div>
                                <div><a href=""></a>
                                    <span>有品三方</span></div>
                                <div><a href=""></a>
                                    <span>7天无理由</span></div>
                                <div class="SS"><a href=""></a>
                                    <span>由小米有品提供配送服务，上海铮峰实业有限公司提供售后</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="get-c">
                        <div>物流</div>
                        <span>预计2020年01月15日开始发货</span>
                    </div>
                    <div class="get-d">
                        <div class="mm">16327<span>人支持<img src="" alt=""></span></div>
                        <div>达成<span>3265</span>%</div>
                    </div>
                    <div class="get-e">
                        <div class="ll">13044843元<span>已筹<img src="" alt=""></span></div>
                        <div>剩余<span>4</span>天</div>
                    </div>
                    <div class="get-g">
                        <span>数量</span>
                        <div class="div-n" href="">-</div>
                        <div class="in" href="">1</div>
                        <div class="div-e">+</div>
                    </div>
                    <div class="get-h">
                        <a class="tyr">加入购物车</a>
                        <div>
                            <a href=""></a>
                            <span></span>
                        </div>
                        <div>
                            <a href=""></a>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        `
        $('.box').html(html);
    }
})


// var i = 1

// var num = $('.in').html();
// num = i;
// $('.div-e').click(function(){
//     num +=i;
// })

// $('.div-n').click(function(){
//     num -=i;
// })
var $imgs = $('.nubs img')

$(document).on('click', '.nubs img', function () {
    var sun = $(this).attr(
        'src'
    )
    $('.nu-a img').attr(
        'src', sun
    )
})



$(document).on('mousemove', '.img', function (e) {
    var r = $('.minbox').width() / 2;
    var Max = $('.img').width() - 2 * r;
    $('.minbox').css({
        display: 'block'
    })
    $('.fang').css({
        display: 'block'
    })
    var ev = event || e

    var x = ev.x;
    var y = ev.y;

    var sleft = $('.img').offset().left;
    var stop = $('.img').offset().top;

    var X = x - sleft - r;
    var Y = y - stop - r;

    if (X < 0) {
        X = 0;
    }
    if (Y < 0) {
        Y = 0;
    }
    if (X > Max) {
        X = Max;
    }
    if (Y > Max) {
        Y = Max
    }
    // console.log(Max);
    $('.minbox').css({
        top: Y,
        left: X
    })
    // console.log(X, Y);

    $('.fang img').css({
        top: -2 * Y,
        left: -2 * X
    })

})

$(document).on('mouseleave', '.img', function () {
    $('.minbox').css({
        display: 'none'
    })
    $('.fang').css({
        display: 'none'
    })
})

///添加数据//////////*******/////////// */
$(document).on('click', '.tyr', function () {
    if (getCookie('login_user')) {
        var img = $('.fang img').attr('src');
        var num = $('.in').html();
        var price = $('.rb-a div').html();
        var name = $('.get-a').html();
        $.ajax({
            url: 'http://zl1697415917.gz01.bdysite.com/php/user-gouwu.php',
            data: {
                img,
                num,
                price,
                id,
                name
            },
            dataType: 'json'
        }).then(function (data) {
            var {
                code,
                msg
            } = data;
            if (code) {
                location.href = '../html/gouwu.html';
            } else {
            }
        })

    }
    else {
        layer.msg('请先登录')
    }

})

