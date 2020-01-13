$('.btn').click(function () {
    var username = $('.name').val();
    var password = $('.pwd').val();

    $.ajax({
        url: 'http://zl1697415917.gz01.bdysite.com/php/user-login.php',
        data: {
            username,
            password
        },
        dataType: 'json'
    }).then(function (data) {
        var {
            code,
            msg
        } = data;
        if (code) {
            setCookie('login_user', username, 7);
            location.href = '../index.html';
        } else {
            $('.ons').text(msg)
            $('.ons').css({
                "color":"red"
            })
        }
    })
})  