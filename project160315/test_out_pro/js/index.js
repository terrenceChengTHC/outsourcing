$(function ($) {
	function checkForm(callback){
		if($('#birthdayId').val()==""){
			layer.tips('出生日期不能为空', '#childBirthdayId', {
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
	}
    $('#submitBtn').on('click',function(){
		checkForm(function(){
			var formData = {
				'uname':'',
				'birthday':$('#childBirthdayId').val(),
				'parentBirthday':$('#parentBirthdayId').val(),
				'province':$('#loc_province').val(),
				'city':$('#loc_city').val(),
				'phone':$('#mobileId').val(),
				'insuranceCash':$('#insuranceCashId').val(),
				'sex':$("input[name='sex']:checked").val(),
				'productCode':'PA000000CXGF-CXAX-05'
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
						layer.msg('领取失败，请尝试重新提交');
					}
				},
				error : function(msg) {//失败
					layer.msg('网络错误，请尝试重新提交');
				}
			});
		})
    });
	$('.share-btn').on('click',function(){
		layer.closeAll();
	})
	var nowTime = new Date();
	var maxDate = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate());
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
		maxDate: maxDate,
		minDate: minDate
	};
	$("#birthdayId").mobiscroll(opt).date(opt);
});