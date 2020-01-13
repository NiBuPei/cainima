$('.header').load("./layout/header.html")
$('.top').load("./layout/top.html",
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
$('.footer').load("./layout/footer.html")


//***************************** */
/*************无缝轮播********* */
/****************************** */
var index = 1;
var timer = null;
var size = $('.sun-min').children().size();
var picWidth = $('img').width();

autoSlide();

function autoSlide() {
    timer = setInterval(function () {
        index++;
        changeImg();
        changeDots();
    }, 4000);
};

function changeImg() {
    var slideWidth = -1 * picWidth * index;
    $('.sun-min').animate({
        'left': slideWidth + 'px'
    }, 500);
    if (index >= size - 1) {

        $('.sun-min').animate({
            'left': -picWidth + 'px'
        }, 0);
        index = 1;
    }
    if (index < 1) {
        $('.sun-min').animate({
            'left': -(size - 2) * picWidth + 'px'
        }, 0);
        index = size - 2;
    }
}

function changeDots() {

    $('.min-nav li').eq(index - 1).addClass('active').siblings().removeClass('active');

}
$('.min-nav li').click(function (event) {
    var target = event.target;
    index = $(target).index() + 1;
    changeImg();
    changeDots();
});
$('.on').click(function () {
    index += 1;
    changeImg();
    changeDots();
})
$('.next').click(function () {
    index -= 1;
    changeImg();
    changeDots();
})
/***************************************** */
var i = 1;
var timer = null;
var Width = $(' .son-nav li').width();
var s = $('.son-nav').children().size() - 4;
$ul = $('.son-nav');

function changeli() {
    var speed = -1 * Width * i;
    $ul.animate({
        'left': speed + 'px'
    }, 500);
}

$('.on').click(function () {
    i += 1;
    if (i > s) {
        i = s;
    }
    changeli();
})
$('.next').click(function () {
    i -= 1;
    if (i < 0) {
        i = 0;
    }
    changeli();
})
/******************************************* */
/*********************************************** */

