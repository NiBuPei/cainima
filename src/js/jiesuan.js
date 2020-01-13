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
            url: 'http://zl1697415917.gz01.bdysite.com/php/user-jiesuanget.php',
            dataTye: 'json',
            success: (data) => {
                var dataObj = eval("(" + data + ")");
                var { code, data } = dataObj;
                if (code) {
                    var html = '';
                    var yuio = 0;
                    data.forEach(({ id, jinge, price, img, name, num, heji }) => {
                        html += `
                        <li class="nav-s" date="${id}">
                            <img src="${img}" alt="">
                            <span class="srt">${name}</span>
                            <div class="count">
                                <div class="input" value="1">${num}</div>
                            </div>
                            <span>${price}</span>
                            <div class="yung"><span class="sty">${jinge}</span></div>
                        </li>
                    `
                        yuio = heji * 1;
                    });

                    $('.nav').html(html);
                    $('.gun span').html(yuio);
                }
            }
        })
    })


    $.ajax({//三级联动
        url: "http://api.yytianqi.com/citylist/id/2",
        dataType: "json",
        success: (data) => {
            var provinceList = resetData(data);//数据源
            var cityList;
            showList($('#province'), provinceList, '<option>省份/直辖市</option>');//刷新
            $("#province").change(function () {
                var cityId = $(this).val()//拿到省代码 用于查市
                // console.log(cityId);
                cityList = provinceList.filter(({ city_id }) => city_id === cityId)[0].list;
                showList($('#city'), cityList, '<option>--城市--</option>');//刷新
                if (cityId === "CH099" || cityId === "CH098") {
                    // console.log(123);
                    $("#area").css({
                        "display": "none"
                    });
                } else {
                    $("#area").css({
                        "display": "inline"
                    })
                }
            });
            $("#city").change(function () {
                var area = $(this).val()    //拿到市代码 用于查区  
                var areaList = cityList.filter(({ city_id }) => city_id === area)[0].list;
                showList($('#area'), areaList, '<option>--区/县--</option>');//刷新
                $('.sung').css('display', 'block')
            })
        }
    });
    function resetData(result) {//初始化数据
        var { list } = result;
        var zxs = list.filter(({ city_id }) => city_id == "CH01" || city_id == "CH02" || city_id == "CH03" || city_id == "CH04");
        var xzq = list.filter(({ city_id }) => city_id == "CH33" || city_id == "CH32");
        var [, , , , ...src] = list;
        src = src.filter(({ city_id }) => city_id != "CH33" && city_id != "CH32");
        var pro = {
            "city_id": "CH099",
            "name": "直辖市",
            "en": "",
            "list": zxs
        }
        var tb = {
            "city_id": "CH098",
            "name": "特别行政区",
            "en": "",
            "list": xzq
        }
        src.push(pro, tb);
        return src;
    }

    function showList(ele, list, text) {//刷新
        var html = text;
        list.forEach(({ name, city_id }) => {
            html += `<option  value="${city_id}">${name}</option>`
        });
        ele.html(html);
    }

    var syu;
    var sty;
    var srt;
    var storage = window.localStorage;
    $('#province').off('change').change(function () {
        var shen = $("#province").find("option:selected").text();
        storage.setItem(syu, shen);  //存地址
    })
    $('#city').off('change').change(function () {
        var shi = $("#city").find("option:selected").text();
        //存地址
        storage.setItem(sty, shi);
    })
    $('#area').off('change').change(function () {
        var qu = $("#area").find("option:selected").text();
        //存地址
        storage.setItem(srt, qu);
    })
    var html = '';
    var A = storage.getItem(syu);
    var B = storage.getItem(sty);
    var C = storage.getItem(srt);
    if (A != null && B != null && C != null) {
        sytu();
        $('.sung').html('修改地址');
    }


    $(document).on('click', '.sung', function () {
        var A = storage.getItem(syu);
        var B = storage.getItem(sty);
        var C = storage.getItem(srt);
        html += `
        <li>
            <div class="gyu-s">
                <span>${A}</span>省<span>${B}</span>市<span>${C}</span>区
            </div> 
            <div class="gyu-y">删除</div>
        </li>
        `
        $('.gyu-nav').html(html);
    })

    $(document).on('click', '.gyu-y', function () {
        storage.clear();
        $(this).parent().html('')
    })
    function sytu() {
        html += `
        <li>
            <div class="gyu-s">
                <span>${A}</span>省<span>${B}</span>市<span>${C}</span>区
            </div> 
            <div class="gyu-y">删除</div>
        </li>
        `
        $('.gyu-nav').html(html);
    }

    //提交
    $(document).on('click', '.xuxia', function () {
        var set = $('.sung').css('display')
        if (set == 'block' || $('.sung').html('修改地址')) {
            layer.msg('下单成功');
            $.ajax({
                url: "http://zl1697415917.gz01.bdysite.com/php/user-jiesuanset.php",
                dataType: "json",
            })
            $.ajax({
                url: "http://zl1697415917.gz01.bdysite.com/php/user-gouwudelete.php",
                dataType: "json",
            })
            location.href = '../../index.html'
        } else {
            layer.msg('请填写地址');
        }
    })

})