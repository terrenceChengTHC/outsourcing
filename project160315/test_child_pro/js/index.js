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
				'province':$('#loc_province').val(),
				'city':$('#loc_city').val(),
				'phone':$('#mobileId').val(),
				'insuranceCash':$('#insuranceCashId').val(),
				'productCode':'PA000000CXGF-CXAX-04'
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
});