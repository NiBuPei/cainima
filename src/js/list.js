$('.header').load("../layout/header.html")
$('.top').load("../layout/top.html", function () {
    layui.use('layer', function () {
        var layer = layui.layer;

        var key = '';
        var order = 'price';
        var sort = 'asc';
        $(document).on('click', '#btn', function () {
            // console.log(123);

            key = $('#input').val();
            // console.log(key);
            List();
        })

        function List() {
            $(document).ready(function () {
                $.ajax({
                    url: 'http://zl1697415917.gz01.bdysite.com/php/user-list.php',
                    data: {
                        key,
                        order,
                        sort
                    },
                    dataTye: 'json',
                    success: (data) => {

                        var dataObj = eval("(" + data + ")");
                        var { code, data } = dataObj;

                        if (code) {
                            var html = '';
                            data.forEach(({ id, name, price, img, desc }) => {
                                // console.log(name)
                                html += `
                                    <li>
                                        <a href="./xiangqing.html?id=${id}" target="_blank">
                                        <img src="${img}" alt="">
                                        <h1>${name}</h1>
                                        <p>${desc}</p>
                                        <span>￥${price}</span>
                                        </a>
                                    </li>
                                    `
                            });
                            // console.log(html);

                            $('.son-nav').html(html);
                        }
                    }
                })
            })
        }
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


var key = '';
var order = 'price';
var sort = 'asc';

$(document).on('click', '#bu-a', function () {
    key = '';
    order = 'price';
    sort = 'asc';
    List();
})

$(document).on('click', '#bu-b', function () {
    console.log(666);
    key = '';
    order = 'price';
    sort = 'desc';
    List();
})


$(document).on('click', '#bu-c', function () {
    key = '';
    order = 'name';
    sort = 'asc';
    List();
})

List();

function List() {
    $(document).ready(function () {
        $.ajax({
            url: 'http://zl1697415917.gz01.bdysite.com/php/user-list.php',
            data: {
                key,
                order,
                sort
            },
            dataTye: 'json',
            success: (data) => {

                var dataObj = eval("(" + data + ")");
                var { code, data } = dataObj;

                if (code) {
                    var html = '';
                    data.forEach(({ id, name, price, img, des }) => {
                        // console.log(name)
                        html += `
                    <li>
                        <a href="./xiangqing.html?id=${id}" target="_blank">
                        <img src="${img}" alt="">
                        <h1>${name}</h1>
                        <p>${des}</p>
                        <span>￥${price}</span>
                        </a>
                    </li>
                    `
                    });
                    // console.log(html);

                    $('.son-nav').html(html);
                }
            }
        })
    })
}


// function List() {
//     $(document).ready(function () {
//         $.ajax({
//             url: 'http://localhost/php/user-list.php',
//             data:{
//                 key,
//                 order,
//                 sort
//             },
//             dataTye: 'json',
//             success: (data) => {

//                 var dataObj = eval("(" + data + ")");
//                 var { code, data } = dataObj;

//                 if (code) {
//                     var html = '';
//                     data.forEach(({ id, name, price, img, desc }) => {
//                         // console.log(name)
//                         html += `
//                     <li>
//                         <a href="./xiangqing.html?id=${id}" target="_blank">
//                         <img src="${img}" alt="">
//                         <h1>${name}</h1>
//                         <p>${desc}</p>
//                         <span>￥${price}</span>
//                         </a>
//                     </li>
//                     `
//                     });
//                     // console.log(html);

//                     $('.son-nav').html(html);
//                 }
//             }
//         })
//     })
// }
// .then(function (data) {
//     // var { code, data } = data;
//     console.log(data)
//     // if () {
//         // var html = '';
//         // data.forEach(({ id, name, price, img, desc }) => {
//         //     html += `
//         //         <li>
//         //             <a href="./xiangqing.html?id=${id}" target="_blank">
//         //             <img src="${img}" alt="">
//         //             <h1>${name}</h1>
//         //             <p>${desc}</p>
//         //             <span>￥${price}</span>
//         //             </a>
//         //         </li>
//         //         `
//         // });
//         // console.log(html);

//         // $('.son-nav').html(html);
//     // }
// })