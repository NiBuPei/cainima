
var login = getCookie('login_user');
console.log(login);
if (getCookie('login_user')) { // 登录状态
    $('.login').html(getCookie('login_user'))
    $('.syue').html('退出')
} else {
    $('.login').html('登录')
}

$('.syue').click(function () {
    removeCookie('login_user');
    location.reload();
})