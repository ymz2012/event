;(function($){

    var WinWidth  = $(window).width();                        //获取屏幕的宽
    var speed = 0.8;                                            //动画的速度
    var resetTimer;
    var scrollTimer;
    var ind = 0;
    var maxInd=0;
    var _winScrollTop = 0,
        _winHeight = $(window).height();
    //让所有图片位移
    function reset(cb){
        $(".yiMaLi").css({
            '-webkit-transform':'translate3d('+WinWidth+'px,0,0)'
        });
        resetTimer=setTimeout(function(){
            clearTimeout(resetTimer);
            cb && cb()
        });
    }
    var IndArr=[];
    //判断距离顶部的值
     function ifInset(){
         _winScrollTop = window.scrollY;
         $(".yiMaLi").each(function(){
             var $self = $(this);
             var _offsetTop = $self.offset().top;
             if (_offsetTop  <= (_winHeight + _winScrollTop)) {
                 if(maxInd!=$(".yiMaLi").length-1){
                     IndArr.push($self.index());
                     maxInd=Math.max.apply(this,IndArr);
                 }
             }
         });
     }
    var nextTimer =null;
    //让图片位移回去
     function transition(){
             nextTimer=setTimeout(function(){
                 clearTimeout(nextTimer);
                 $(".yiMaLi").eq(ind).css({
                     '-webkit-transform':'translate3d(0,0,0)',
                     '-webkit-transition':'-webkit-transform '+speed+'s cubic-bezier(.49,.59,.43,1.21)'
                 });

                 if(ind < maxInd){
                     ind++;
                     nextTimer=setTimeout(function(){transition();console.log(speed);},speed*1000/2);
                 }else{
                     ind=maxInd;
                 }
             })
     }
    //蒙层
function blackDiv(){
    for(var i=0;i<$(".yiMaLi").length;i++){

        var selfH =$(".yiMaLi").eq(i).height();
        $(".yiMaLi").eq(i).append("<div class='blackDiv' style='width:100%;height:"+selfH+"px;position:absolute;left:0;top:0;opacity:0.2;background:#000'></div>")
    }

}
    blackDiv();

    reset(function(){

        ifInset();
        transition();
        $(window).on("scroll",function(e){
            clearTimeout(scrollTimer);

            ifInset();
            scrollTimer=setTimeout(function(){

                transition();

            },150)

        })
    });
})(Zepto);