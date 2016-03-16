$(function ($) {
    $('#submitBtn').on('click',function(){
		layer.open({
		    type: 1,
		    title: false,
		    closeBtn: 0,
		    area:['100%', '100%'],
		    skin: 'layui-layer-nobg', //没有背景色
		    shadeClose: true,
		    content: $('#shareDiv')
		});
    })
});