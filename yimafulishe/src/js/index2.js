function Slider(){
    this.Width = $(window).width();
    this.Height = $(window).height();
    this.Height2 = $(window).height()/2;

    this.init();

}

Slider.prototype = {
    init : function(){
        var _this = this;
        this.initDom();
        this.bindEven();
        this.slideDown();
        //this.resetCss(
            //this.leftSlide();
        //);
        //3秒后执行
        setTimeout(function(){
            _this.leftSlide();
        },1000);


    },
    initDom : function(){
        console.log(this.Height);
        console.log(this.Height*1/10)

    },
    bindEven : function(){

    },
    //背景图上下滑动
    backSlide : function(){
        var _this = this;

        /*if(_this.direction){
            console.log(55555)
            $(".yiMaLi").css({
                'background-position':'0 -30px',
                '-webkit-transition':'all 0.5s'
            }).on("webkitTransitionEnd",function(){
                $(".yiMaLi").css({
                    '-webkit-transition':'none'
                });
            });
        }else{

            $(".yiMaLi").css({
                'background-position':'0 -10px',
                '-webkit-transition':'all 0.5s'
            }).on("webkitTransitionEnd",function(){
                $(".yiMaLi").css({
                    '-webkit-transition':'none'
                });
            });
        }*/
    },
    //实现屏幕上下弹性滑动
    slideDown : function(){
        var _this = this;
        var wrapEven = {
            startFun : function(e){
                _this.disY = e.touches[0].clientY;

                $("#yiMaUl").css({
                    '-webkit-transition':'none'
                });
                _this.setTop = $("#yiMaUl").offset().top;
            },
            moveFun : function(e){
                _this.disy = e.touches[0].clientY;
                _this.disCha = _this.disy - _this.disY+_this.setTop;

                _this.direction = (_this.disY - _this.disy) >= 0 ? true : false ;
                _this.backSlide();
                //限制下拉的高度
                if(_this.disCha >= 30){
                    _this.disCha = 30;
                }
                //限制上拉的高度
                if(_this.disCha <= -($("#yiMaUl").height() - _this.Height)-30){
                    _this.disCha = -($("#yiMaUl").height() - _this.Height)-30;
                }


                $("#yiMaUl").css({
                    '-webkit-transform':'translate3d(0,'+_this.disCha+'px,0)'
                });
            },
            endFun : function(){
                /**/
                //向下滑动
                if(!_this.direction){

                    //背景图动画
                    /*$(".yiMaLi").css({
                        'background-position':'0 top',
                        '-webkit-transition':'all 0.5s'
                    }).on("webkitTransitionEnd",function(){
                        $(".yiMaLi").css({
                            '-webkit-transition':'none'
                        });
                    });
*/
                    if(_this.disCha >= 0){
                        $("#yiMaUl").css({
                            '-webkit-transform':'translate3d(0,'+0+'px,0)',
                            '-webkit-transition':'-webkit-transform 0.3s'
                        });
                    }else{
                        $("#yiMaUl").css({
                            '-webkit-transform':'translate3d(0,'+_this.disCha+'px,0)',
                            '-webkit-transition':'-webkit-transform 0.3s'
                        });
                    }



                //向上滑动
                }else{
                    //背景图动画

                    /*$(".yiMaLi").css({
                        'background-position':'0 -50px',
                        '-webkit-transition':'all 0.5s'
                    }).on("webkitTransitionEnd",function(){
                        $(".yiMaLi").css({
                            '-webkit-transition':'none'
                        });
                    });*/

                    if(_this.disCha <= -($("#yiMaUl").height() - _this.Height)){
                        _this.disCha = -($("#yiMaUl").height() - _this.Height);

                        $("#yiMaUl").css({
                            '-webkit-transform':'translate3d(0,'+_this.disCha+'px,0)',
                            '-webkit-transition':'-webkit-transform 0.3s'
                        });
                    }
                }
            }
        }

        $(document).on("touchstart",wrapEven.startFun);
        $(document).on("touchmove",wrapEven.moveFun);
        $(document).on("touchend",wrapEven.endFun);
    },
    resetCss : function(cb){
        var _this = this;

        $(".yiMaLi").css({
           '-webkit-transform':'translate3d('+_this.Width+'px,0,0)'/*,
            '-webkit-transition':'-webkit-transform 0s'*/
        });
        cb && cb();
    },
    leftSlide : function(){
        var _this = this;
       // var offsetTop = $(".yiMaLi").eq(i).offset();
        $(".yiMaLi").eq(0).css({
            '-webkit-transform':'translate3d(0,0,0)',
            '-webkit-transition':'-webkit-tranform 5s'
        });




    }



}