$(function ($) {
	function checkForm(callback){
		if($('#nameId').val()==""){
			layer.tips('姓名不能为空', '#nameId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#birthdayId').val()==""){
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
			layer.tips('投保人不能超过59周岁', '#birthdayId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#loc_province').val()==""){
			layer.tips('常住省份不能为空', '#loc_province', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#loc_city').val()==""){
			layer.tips('常住城市不能为空', '#loc_city', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#mobileId').val()==""){
			layer.tips('电话号码不能为空', '#mobileId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test($('#mobileId').val()))){
			layer.tips('手机号码有误，请重填', '#mobileId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		callback();
	}
    $('#submitBtn').on('click',function(){
		checkForm(function(){
			var formData = {
				'uname':$('#nameId').val(),
				'birthday':$('#birthdayId').val(),
				'province':$('#loc_province').val(),
				'city':$('#loc_city').val(),
				'phone':$('#mobileId').val(),
				'productCode':'PA000000CXGF-CXAX-01'
			}
			$.ajax({
				type: "post",
				url: "http://simon168com.huhuhu.net/activity/webCount/count",
				data: formData,
				dataType: "json",
				success: function(data){
					layer.open({
						type: 1,
						title: false,
						closeBtn: 0,
						area:['100%', '100%'],
						skin: 'layui-layer-nobg', //没有背景色
						shadeClose: true,
						content: $('#shareDiv'),
					});
				},
				error: function(data){
					layer.msg('网络错误，请尝试重新提交');
				}
			});
		})
    });
	$('#statement').on('click',function(){
		layer.open({
		    type: 1,
		    title: false,
		    closeBtn: 1,
		    skin: 'layui-layer-nobg', //没有背景色
		    shadeClose: true,
		    content: $('#statementDiv')
		});
    });
	$('#escapeClause').on('click',function(){
		layer.open({
		    type: 1,
		    title: false,
		    closeBtn: 1,
		    skin: 'layui-layer-nobg', //没有背景色
		    shadeClose: true,
		    content: $('#escapeClauseDiv')
		});
    });
	$('#statementDiv').on('click',function(){
		layer.closeAll();
	});
	$('#escapeClauseDiv').on('click',function(){
		layer.closeAll();
	});
	var myDate = new Date();
	var maxDate = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
	var minDate = (myDate.getFullYear()-59)+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
	$('input[type=date]').attr('min',minDate);
	$('input[type=date]').attr('max',maxDate);
});