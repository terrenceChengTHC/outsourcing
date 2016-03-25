$(function ($) {
	function checkForm(callback){
		if($('#birthdayId').val()==""){
			layer.tips('出生日期不能为空', '#birthdayId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#insuranceCashId').val()==""){
			layer.tips('意外伤害保险保额不能为空', '#insuranceCashId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#insuranceDayCashId').val()==""){
			layer.tips('意外伤害住院日额保障金不能为空', '#insuranceDayCashId', {
				tips: [1, '#3595CC'],
				time: 2000
			});
			return false;
		}
		if($('#mobileId').val()==""){
			layer.tips('手机号码不能为空', '#mobileId', {
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
	};
	function setResShow(){
		var insurCash = $('#insuranceCashId').val();
		var rechargeType = $("input[name='rechargeType']:checked").val();
		$('span[name=insurCash]').each(function(){
			$(this).html(insurCash);
		});
		if(insurCash==28000){
			if(rechargeType=='year'){
				$("#tipsa").html("您每年需支付保费：<span>¥1473.00元</span>");
				$("#tipsb").hide();
				$("#tipsc").html("折合每天仅：<span>¥4.09元</span>");
			}else{
				$("#tipsa").html("您首期需支付三个月保费：<span>￥402.00元</span>");
				$("#tipsb").html("以后每月支付：<span>￥134.00元</span>").show();
				$("#tipsc").html("折合每天仅：<span>￥4.47元</span>");
			}
		}
		if(insurCash==38000){
			if(rechargeType=='year'){
				$("#tipsa").html("您每年需支付保费：<span>¥1698.00元</span>");
				$("#tipsb").hide();
				$("#tipsc").html("折合每天仅：<span>¥4.72元</span>");
			}else{
				$("#tipsa").html("您首期需支付三个月保费：<span>￥462.00元</span>");
				$("#tipsb").html("以后每月支付：<span>￥154.00元</span>").show();
				$("#tipsc").html("折合每天仅：<span>￥5.13元</span>");
			}
		}
		if(insurCash==48000){
			if(rechargeType=='year'){
				$("#tipsa").html("您每年需支付保费：<span>¥1923.00元</span>");
				$("#tipsb").hide();
				$("#tipsc").html("折合每天仅：<span>¥5.34元</span>");
			}else{
				$("#tipsa").html("您首期需支付三个月保费：<span>￥525.00元</span>");
				$("#tipsb").html("以后每月支付：<span>￥175.00元</span>").show();
				$("#tipsc").html("折合每天仅：<span>￥5.83元</span>");
			}
		}
	};

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
				'mediaSrc':'wlk02-xmj-s213-wltg-a31'
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
							area:['100%', '100%'],
							skin: 'layui-layer-nobg', //没有背景色
							shadeClose: true,
							content: $('#shareDiv'),
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
	$('.share-btn').on('click',function(){
		layer.closeAll();
	})
	var nowTime = new Date();
	var maxDate = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate());
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
		maxDate: maxDate
	};
	$("#birthdayId").mobiscroll(opt).date(opt);
});