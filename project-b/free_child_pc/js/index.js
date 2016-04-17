$(function(){
    var configure = {
        showIndex : 1
    }

    $('#bannerA').addClass('animated bounceInDown');
    $('#tvA').addClass('animated bounceInLeft');
    $('#rightA').addClass('animated bounceInRight');

    var unslider = $('.show-container').unslider({
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
        $('.page-point').removeClass('on');
        $('#nav'+configure.showIndex).addClass('on');
    }
});