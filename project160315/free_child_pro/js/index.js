$(function ($) {
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
        var minDate = $('input[type=date]').attr('min');
        var date1 = new Date(Date.parse(minDate));
        var date2 = new Date($('#birthdayId').val());
        if (date1.getTime() > date2.getTime()) {
            layer.tips('投保人不能超过16周岁', '#birthdayId', {
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
        callback();
    }

    $('#submitBtn').on('click', function () {
        checkForm(function () {
            var formData = {
                'uname':$('#nameId').val(),
                'birthday':$('#birthdayId').val(),
                'province':$('#loc_province').val(),
                'city':$('#loc_city').val(),
                'phone':$('#mobileId').val(),
                'sex':$("input[name='sex']:checked").val(),
                'productCode':'PA000000CXGF-CXAX-01'
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
                            closeBtn: 0,
                            area: ['100%', '100%'],
                            skin: 'layui-layer-nobg', //没有背景色
                            shadeClose: true,
                            content: $('#shareDiv'),
                        });
                    }else{
                        layer.msg('领取失败，请尝试重新提交');
                    }
                },
                error : function(msg) {//失败
                    layer.msg('网络错误，请尝试重新提交');
                }
            });
        })
    });
    $('#statement').on('click', function () {
        layer.open({
            type: 1,
            title: false,
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
            closeBtn: 1,
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: $('#escapeClauseDiv')
        });
    });
    $('#statementDiv').on('click', function () {
        layer.closeAll();
    });
    $('#escapeClauseDiv').on('click', function () {
        layer.closeAll();
    });
    var myDate = new Date();
    var maxDate = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
    var minDate = (myDate.getFullYear()-16)+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
    //$('input[type=date]').attr('min',minDate);
    //$('input[type=date]').attr('max',maxDate);
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
        maxDate:maxDate,
        minDate:minDate
    };
    $("#insurer_date").mobiscroll(opt).date(opt);
});