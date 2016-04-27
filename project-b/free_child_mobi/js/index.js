$(function(){
    var configure = {
        showIndex : 1
    }

    $('#bannerA').addClass('animated bounceInLeft');
    $('#tvA').addClass('animated bounceInDown');
    $('#quesA').addClass('animated bounceInUp');

    var unslider = $('.content').unslider({
        speed: 500,               //  幻灯片切换速度（毫秒）
        delay: false,              //  每张幻灯片停留时间 (毫秒)
        complete: function() {},  //  当幻灯结束时执行动作
        keys: true,               //  开启键盘支持（左右键切换）
        dots: true,               //  显示原点导航
        fluid: false,              //  支持响应式，部分非响应式网站可能不支持
        arrows:{},
        nav:0
    });

    $("a[name='foward']").on('click',function(){
        var fn = this.className.split(' ')[1];
        movePage(fn);
    });

    $('.option').on('click',function(){
        $(this).parent().find('.option').each(function(){
            $(this).removeClass('on');
        });
        $(this).addClass('on');
        movePage('next');
    });

    var nowTime = new Date();
    var minDate = new Date(nowTime.getFullYear()-59, nowTime.getMonth(), nowTime.getDate()-1);
    var opt = {
        preset: 'date', //日期
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yy-mm-dd', // 日期格式
        setText: '确定', //确认按钮名称
        cancelText: '取消',//取消按钮名籍我
        dateOrder: 'yymmdd', //面板中日期排列格式
        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
        maxDate: nowTime,
        minDate: minDate
    };
    $("#birthdayId").mobiscroll(opt).date(opt);

    function movePage(fn){
        unslider.data('unslider')[fn]();
        if(fn=='prev'){
            if(configure.showIndex==1){
                configure.showIndex=4;
            }else{
                configure.showIndex-=1;
            }
        }
        if(fn=='next'){
            if(configure.showIndex==4){
                configure.showIndex=1;
            }else{
                configure.showIndex+=1;
            }
        }
    }

    function checkForm(callback) {
        if ($('#nameId').val() == "") {
            layer.tips('姓名不能为空', '#nameId', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        if ($('#birthdayId').val() == "") {
            layer.tips('出生日期不能为空', '#birthdayId', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        if ($('#loc_province').val() == "") {
            layer.tips('常住省份不能为空', '#loc_province', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        if ($('#loc_city').val() == "") {
            layer.tips('常住城市不能为空', '#loc_city', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        if ($('#mobileId').val() == "") {
            layer.tips('电话号码不能为空', '#mobileId', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        if (!(/^1[3|4|5|7|8]\d{9}$/.test($('#mobileId').val()))) {
            layer.tips('手机号码有误，请重填', '#mobileId', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        var sexTag = $("select[name='sex']").find("option:selected").val();
        if (sexTag==-1) {
            layer.tips('请选择性别', 'select[name="sex"]', {
                tips: [1, '#3595CC'],
                time: 2000
            });
            return false;
        }
        callback();
    }

    $('#submitBtn').on('click', function () {
        checkForm(function () {
            var formData = {
                'uname':$('#nameId').val(),
                'birthday':$('#birthdayId').val(),
                'province':$('#loc_province').find("option:selected").text(),
                'provinceCode':$('#loc_province').val(),
                'city':$('#loc_city').find("option:selected").text(),
                'cityCode':$('#loc_city').val(),
                'phone':$('#mobileId').val(),
                'sex':$("select[name='sex']").find("option:selected").val(),
                'productCode':'PA000000CXGF-CXAX-01',
                'mediaSrc':'wlk05-xmj-ywx-wltg-a31|01-child'
            }
            $.ajax({
                type : "get",   //必须get，不填也行
                url : 'http://120.76.145.3:8080/activity/webCount/count',//这里的url不需要在最后加上&innerSignCallBack=?
                data:formData,
                dataType : "jsonp",
                jsonp:'countCallBack',  //服务器端获取回调函数名的key
                jsonpCallback:'countCallBack', //回调函数名
                success:function(data) {   //成功
                    if(data.tag=='succ'){
                        layer.open({
                            type: 1,
                            title: false,
                            area: ['390px', '420px'],
                            closeBtn: 1,
                            skin: 'layui-layer-nobg', //没有背景色
                            shadeClose: true,
                            content: $('#succDiv')
                        });
                    }else{
                        layer.msg('您的免费保险已领取过，请下次再来噢');
                    }
                },
                error : function(msg) {//失败
                    layer.msg('您的免费保险已领取过，请下次再来噢');
                }
            });
        })
    });

    $('#statement').on('click', function () {
        layer.open({
            type: 1,
            title: false,
            area: ['300', '360px'],
            closeBtn: 1,
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: $('#statementDiv')
        });
    });
    $('#escapeClause').on('click', function () {
        layer.open({
            type: 1,
            title: false,
            area: ['300', '400px'],
            closeBtn: 1,
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: $('#escapeClauseDiv')
        });
    });
    $('#detailButton').on('click', function () {
        layer.open({
            type: 1,
            title: false,
            area: ['300px', '340px'],
            closeBtn: 1,
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: $('#succDiv')
        });
    });


});