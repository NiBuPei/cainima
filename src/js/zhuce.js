$('.btn').click(function () {
    var username = $('.name').val();
    var password = $('.pwd').val();

    $.ajax({
        url: 'http://zl1697415917.gz01.bdysite.com/php/user-zhuce.php',
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
            location.href = '../index.html';
        } else {
            $('.trc').text(msg)
            $('.trc').css({
                "color":"red"
            })
        }
    })
})