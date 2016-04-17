$(function(){
    $('#bannerA').addClass('animated bounceInDown');
    $('#tvA').addClass('animated bounceInLeft');
    $('#rightA').addClass('animated bounceInRight');

    $("#leftButt").on('click',function(){
        var target=$("#container");
        target.animate({left:'-30px'});
    });

});