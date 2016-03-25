$(function ($) {
	function checkForm(callback){
		if($('#childBirthdayId').val()==""){
			layer.tips('出生日期不能为空', '#childBirthdayId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#parentBirthdayId').val()==""){
			layer.tips('出生日期不能为空', '#parentBirthdayId', {
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
		if($('#insuranceCashId').val()==""){
			layer.tips('保障金额不能为空', '#insuranceCashId', {
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
				'uname':'',
				'birthday':$('#childBirthdayId').val(),
				'parentBirthday':$('#parentBirthdayId').val(),
				'province':$('#loc_province').find("option:selected").text(),
				'provinceCode':$('#loc_province').val(),
				'city':$('#loc_city').find("option:selected").text(),
				'cityCode':$('#loc_city').val(),
				'phone':$('#mobileId').val(),
				'insuranceCash':$('#insuranceCashId').val(),
				'sex':$("input[name='sex']:checked").val(),
				'mediaSrc':'wlk02-xmj-s103-wltg-a31'
			}
			$.ajax({
				type : "get",   //必须get，不填也行
				url : 'http://120.76.145.3:8080/activity/webCount/count',//这里的url不需要在最后加上&innerSignCallBack=?
				data:formData,
				dataType : "jsonp",
				jsonp:'countCallBack',  //服务器端获取回调函数名的key
				jsonpCallback:'countCallBack', //回调函数名
				success:function(data) {   //成功
					var age = new Date().getFullYear() - new Date($('#childBirthdayId').val()).getFullYear();
					var feeId = age+'-'+$("input[name='rechargeType']:checked").val()+'-'+$('#insuranceCashId').val();
					$('#feeNum').html(new fee().find(feeId));
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
				error : function(msg) {//失败
					var age = new Date().getFullYear() - new Date($('#childBirthdayId').val()).getFullYear();
					var feeId = age+'-'+$("input[name='rechargeType']:checked").val()+'-'+$('#insuranceCashId').val();
					$('#feeNum').html(new fee().find(feeId));
					layer.open({
						type: 1,
						title: false,
						closeBtn: 0,
						area:['100%', '100%'],
						skin: 'layui-layer-nobg', //没有背景色
						shadeClose: true,
						content: $('#shareDiv'),
					});
				}
			});
		})
    });
	$('.share-btn').on('click',function(){
		layer.closeAll();
	})
	var nowTime = new Date();
	var maxDate = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate());
	var childMaxDate = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate()-28);
	var childMinDate = new Date(nowTime.getFullYear()-10, nowTime.getMonth(), nowTime.getDate());
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
	};
	$("#parentBirthdayId").mobiscroll(opt).date($.extend(opt,{
		maxDate: maxDate,
	}));
	$("#childBirthdayId").mobiscroll(opt).date($.extend(opt,{
		maxDate: childMaxDate,
		minDate: childMinDate
	}));
});