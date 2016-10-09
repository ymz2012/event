
//RAF封装
var requestAnimFrame = function () {
    return (
        window.requestAnimationFrame       ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
} ();

//定义canvas  的宽高

var Wwidth,Hheight;
var loadPic = function(srcs,cb){
    var imgs=srcs;
    var imgSrc = srcs;
    var tagflag;
    var flag=0;
    var IMG_SRC='';
    tagflag=imgSrc.length;
    var load_img = function (src) {
        var rnd_id = "_img_" + Math.random();
        window[rnd_id] = new Image(); // 全局变量引用
        window[rnd_id].src = src;
        window[rnd_id].onload = function () {
            window[rnd_id].onload = window[rnd_id].onerror=window[rnd_id].onabort = null;
            window[rnd_id] = null;
            flag++;
            if(flag>=tagflag){
                cb&&cb(imgs);
            }
        };

        window[rnd_id].onabort = function () {
            window[rnd_id].onload = window[rnd_id].onerror=window[rnd_id].onabort = null;
            window[rnd_id] = null;
            flag++;
            if(flag>=tagflag){
                cb&&cb(imgs);
            }
        };

        window[rnd_id].onerror = function () {
            window[rnd_id].onload = window[rnd_id].onerror=window[rnd_id].onabort = null;
            window[rnd_id] = null;
            flag++;
            if(flag>=tagflag){
                cb&&cb(imgs);
            }
        };
    };
    var load_page = function () {

        if (imgSrc.length <= 0) {
            return ;
        }
        for(var i=tagflag-1;i>=0;i--){
            var src = IMG_SRC + imgSrc[i];
            load_img(src);
        }
    };
    load_page();


};
//starSprite
var spritePlay;
var starSprite=function(cb){
    var IMG_SRC = "";

    var sprites=[
            "images/img_sprite10/01.png",
            "images/img_sprite10/02.png",
            "images/img_sprite10/03.png",
            "images/img_sprite10/04.png",
            "images/img_sprite10/05.png",
            "images/img_sprite10/06.png",
            "images/img_sprite10/07.png",
            "images/img_sprite10/08.png",
            "images/img_sprite10/10.png",
            "images/img_sprite10/11.png",
            "images/img_sprite10/12.png",
            "images/img_sprite10/13.png",
            "images/img_sprite10/14.png",
            "images/img_sprite10/15.png",
            "images/img_sprite10/16.png",
            "images/img_sprite10/17.png",
            "images/img_sprite10/18.png",
            "images/img_sprite10/19.png",
            "images/img_sprite10/20.png",
            "images/img_sprite10/21.png"
    ];
    if(!!(document.createElement('canvas').getContext('2d'))){


        var spriteTimer=null;
        var ind=0;
        var spriteImg=new Image();
        var spriteView=document.getElementById("spriteView");
        var ctx=spriteView.getContext('2d');
        var spriteW=spriteView.width;
        var spriteH=spriteView.height;

        spritePlay=function(){

            var draw=function(){
                clearInterval(spriteTimer);
                spriteImg.src= sprites[ind];

                spriteImg.onload=function(){
                    ctx.clearRect(0,0,spriteW,spriteH);
                    ctx.drawImage(spriteImg,0,0);

                    if (ind < sprites.length-1) {
                        spriteTimer=setInterval(draw,1000/24);
                        ind++;
                    }else {
                        ctx.clearRect(0,0,spriteW,spriteH);
                        clearInterval(spriteTimer);
                        cb&&cb();
                    }
                };
            };
            draw();
        };
        spritePlay();
    }
};



//渲染书的内页
var readBookPages=function(srcs,cb){
    var bookHtml = "";
    for(var i=0;i<srcs.length;i++){
        bookHtml += '<div class="Mpage" id="Mpage'+((i)*1+1)+'">'+
                        '<div class="imgWarp">'+
                             '<img src="'+srcs[i]+'" alt="">' +
                        '</div>'+
                    '</div>';
    }
    $("#flipbook").html(bookHtml);


    cb&&cb();
};


//渲染首页
var readFirstPage=function(){
    var winW=$(window).width();
    var bookW=winW2=$(window).width()*2;
    var winH=$(window).height();
    var wscal=1013/1500;
    var bookScal=705/1013;
    var bookH=bookW*bookScal;
    var bookScalY=winH/bookH;
    $("#YoContent").css({
        'width':bookW,
        'height':bookH,
        '-webkit-transform':'translate3d('+(-winW)+'px,0,0) scaleY('+bookScalY+')',
        '-webkit-transform-origin':'top center'
    });

    var selfH = $("#YoContent").height();
    var selfW = $("#YoContent").width();


    var newH = (winH - selfH) ;
    var newW = (winW - selfW)-winW*1/12 ;


    if(winW >= 320 && winW < 360){

        $("#YoContent").css({
            '-webkit-transform-origin':'center',
            '-webkit-transform':'scale('+wscal*0.7+') rotate3d(0,0,1,-16deg) translate3d('+newW+'px, '+newH+'px,0)'
        });

    }else if(winW >= 360 && winW < 370){
        $("#YoContent").css({
            '-webkit-transform-origin':'center',
            '-webkit-transform':'scale('+wscal*0.9+') rotate3d(0,0,1,-16deg) translate3d('+(newW - newW*1/10)+'px, '+(newH - winH*1/5)+'px,0)'
        });
    }else{
        $("#YoContent").css({
            '-webkit-transform-origin':'center',
            '-webkit-transform':'scale('+wscal+') rotate3d(0,0,1,-16deg) translate3d('+newW+'px, '+(newH + newW*1/5)+'px,0)'
        });

    }
};
//预加载图片

//添加turn
var addTurn=function(){
    //屏蔽ios下上下弹性
    $(window).on('scroll.elasticity', function (e) {
        e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
        e.preventDefault();
    });
    //设置书的宽高
    var w=$("#flipbook").width();
    var h=$("#flipbook").height();
    $('#flipboox').width(w).height(h);
    $(window).resize(function(){
        w=$(window).width();
        h=$(window).height();
        $('#flipboox').width(w).height(h);
    });
    var turnLoopTime=5000;//翻页时间间隔
    var turnTimer=null;//翻页的定时器
    var firstOpenTimer = null;//首页打开的定时器
    var isopen=false;//判断书是否打开
    var hasautoPlay = true;//是否自动翻页
    var isautoPlay = true;//自动翻页
    //自动翻页函数
    var autoPlay=function (){
        turnTimer=setTimeout(function(){
            clearTimeout(turnTimer);
            var handle=function(){
                if(isautoPlay == true){
                    $("#flipbook").turn("next");
                    turnTimer=setTimeout(handle,6000);
                }else{
                    isautoPlay = true;
                    turnTimer=setTimeout(handle,6000);
                }
            }
            handle();
        },6000)
    };

    var winW=$(window).width();
    var bookW=winW2=$(window).width()*2;
    var winH=$(window).height();
    var bookScal=705/1013;
    var bookH=bookW*bookScal;
    var bookScalY=winH/bookH;

    //放大书
    var scalBook=function (){
        var endTimer=null;
        $("#YoContent").css({
            'width':bookW,
            'height':bookH,
            '-webkit-transform':'translate3d('+(-winW)+'px,0,0) scaleY('+bookScalY+')',
            '-webkit-transform-origin':'top center',
            '-webkit-transition':'all 1s'
        });
        endTimer=setTimeout(function(){

            $("#YoWrap").off("touchstart").off("touchend");
            clearTimeout(endTimer);
            $(".YoWrap").css({'background':'#fff'});
            $(".book").css({
                'background':'#fff',
                'padding':0
            });
            $("#YoLogo").remove();
            $(".control").show();
            $(".AllControl").show();
            lrClick();
            if(!!hasautoPlay){
               autoPlay();
            }

        },1000);

        Wwidth = $(window).width();
        Hheight = $(window).height();

    };
    //左右按钮点击翻页
    var lrClick=function(){
        var Click=function (obj,cb){
            isautoPlay = false;
            $(".flipbook").turn(obj);


        };

        $(".AllLeft").on("touchend",function(e){
            e.preventDefault();

            Click("previous");
        });
        $(".AllRight").on("touchend",function(e){
            e.preventDefault();
            Click("next");
        });
    };
    //2秒后打开书
    var turn2s=function(){

        $("#YoWrap").on("touchstart",function(){
            $("#music").removeClass("disable");
            audio5js.play();
        });
        $("#YoWrap").on("touchend",function(){
            $(".flipbook").turn("next");
        });
    };
    //turn的开始事件
    var turnStartFun=function(pageObject){

        if(pageObject.page == 1){

            $("#firstBack").css({
                'display': 'block',
                'width':'100%',
                '-webkit-transition':'width 300ms ease-in ',
                '-webkit-transition-delay':'250ms',
                'transition':'width 300ms',
                'transition-delay':'150ms'
            }).off('webkitTransitionEnd').on("webkitTransitionEnd",function(){

                //第一页
                scalBook();
            });

        }

        $("#YoContent").find(".Mpage .imgWarp img").css({
            '-webkit-transform':'scaleX('+bookScalY+')'
        });
        $("#YoContent").find("#Mpage1 .imgWarp img").css({
            '-webkit-transform':'scaleX(1)'
        });
        if(!isopen){
            isopen=true;
            clearTimeout(firstOpenTimer);
        }
    };
    var starIsPlay=false;
    var snowIsPlay=false;
    var addTxtIsPlay=false;
    var tearIsPlay=false;
    //星星动画(8)

    var playStar=function (){

        $(".boy").fadeIn(2000);
        $("#weLove").fadeIn(2000);
        var starSrcArr= ['images/star_03.png','images/star_05.png'];
        var starImage3 = new Image();
        var starImage5 = new Image();
        var starX = [];
        var starY = [];
        var starR = [];
        var starCount = 60;
        var refreshRate = 400;
        var starC = document.getElementById('starCanvas');
        var ctx = starC.getContext('2d');
        var canvasWidth = $('#starCanvas')[0].width;
        var canvasHeight =  $('#starCanvas')[0].height;
        var starTimer=null;

        starImage3.src=starSrcArr[0];
        starImage5.src=starSrcArr[1];
        var startCanvasW = $("#Mpage9").find(".imgWarp").width()-20;
        var startCanvasH = $("#Mpage9").find(".imgWarp").height()+100;

        $("#star_wrap").css({
            'width':startCanvasW,
            'height':startCanvasW,
            'position':'absolute',
            'left':'0',
            'top':'0',
            'bottom':'0',
            'right':'0',
            'margin':'auto'
        });

        $("#starCanvas").css({
            'width':startCanvasW,
            'height':startCanvasW,
            'position':'absolute',
            'left':'0',
            'top':'0',
            'bottom':'0',
            'right':'0',
            'margin':'auto'
        });

        var starArr=[starImage3,starImage5];
        var draw=function () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // draw stars
            for (j = 1; j < starCount; j++) {
                var a=Math.random()*.9+.1;
                var b=Math.floor(Math.random()*2+0);
                ctx.fillStyle = 'rgba(255,255,255,'+a+')';
                ctx.beginPath();
                ctx.drawImage(starArr[b],starX[j], starY[j],starR[j],starR[j]);

            }

            ctx.restore();
        }
        var genStar=function () {
            var Wlong = $("#star_wrap").width()*bookScalY;
            var Wsize = $("#star_wrap").offset().left;
            var Ylong = $("#star_wrap").height()*bookScalY;
            var Ysize = $("#star_wrap").offset().top;


            for (j = 0; j < starCount; j++) {

                starX[j] = canvasWidth - Math.floor(Math.random() * (canvasWidth-80)+80);

                starY[j] = canvasHeight - Math.floor(Math.random() * (canvasHeight-100)+40);
                starR[j] = Math.floor(Math.random() * 10) + 6; // 3 to 6
            }

            starTimer=setTimeout(function(){
                var handler=function(){
                    clearTimeout(starTimer);
                    if(!!starIsPlay){
                        requestAnimFrame(draw);
                        starTimer=setTimeout(handler,refreshRate);
                    }
                }
                handler();

            },refreshRate);
        };

        genStar();
        starIsPlay=true;
    };

    var snowTimer=null;

    var playSnow=function () {

        var container = document.getElementById("snow_wrap");
        var conH2=($('#control').height())*2;
        $("#snow_wrap").css({
            'width':$(window).width(),
            'height':$(window).height()-conH2
        });
        var containerWidth = $(container).width();
        var containerHeight = $(container).height();
        var particle;
        var camera;
        var scene;
        var renderer;
        var mouseX = 0;
        var mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        var particles = [];
        var particleImage1 = new Image();
        var particleImage2 = new Image();
        var particleImage3 = new Image();
        var refreshRate=1000;

        //Mazz
        var Images = ["images/feather1.png","images/feather2.png","images/feather3.png"];

        particleImage1.src = Images[0];
        particleImage2.src = Images[1];
        particleImage3.src = Images[2];

        var snowNum = 20;

        var onDocumentMouseMove=function (event) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY
        }
        var onDocumentTouchStart=function (event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY
            }
        }
        var onDocumentTouchMove=function (event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY
            }
        }

        var init=function () {
            camera = new THREE.PerspectiveCamera(75,containerWidth / containerHeight,1,10000);
            camera.position.z = 1000;
            scene = new THREE.Scene();
            scene.add(camera);
            renderer = new THREE.CanvasRenderer();


            renderer.setSize(containerWidth, containerHeight);
            var material=[
                new THREE.ParticleBasicMaterial({
                    map: new THREE.Texture(particleImage1)
                }),
                new THREE.ParticleBasicMaterial({
                    map: new THREE.Texture(particleImage2)
                }),
                new THREE.ParticleBasicMaterial({
                    map: new THREE.Texture(particleImage3)
                })
            ]
            function creatFeather(){
                var a = Math.floor(Math.random()*3+0);
                particle = new Particle3D(material[a]);
                particle.position.x = Math.random() * 2000 - 1000;
                particle.position.y = Math.random() * 2000 - 1000;
                particle.position.z = Math.random() * 2000 - 1000;
                particle.scale.x = particle.scale.y = 1;
                scene.add(particle);
                particles.push(particle)
            }
            for (var i = 0; i < snowNum; i++) {
                requestAnimFrame(creatFeather);
            }
            container.appendChild(renderer.domElement);
            document.addEventListener("mousemove", onDocumentMouseMove, false);
            document.addEventListener("touchstart", onDocumentTouchStart, false);
            document.addEventListener("touchmove", onDocumentTouchMove, false);

         setInterval(loop, 1000 / 40)

            function loop() {
                snowNum++;
                if(snowNum<=200){
                    requestAnimFrame(creatFeather);
                }

                for (var i = 0; i < particles.length; i++) {
                    var particle = particles[i];
                    particle.updatePhysics();

                    with (particle.position) {

                        if (y < -1000) {
                            y += 2000
                        }
                        if (x > 1000) {
                            x -= 2000
                        } else {
                            if (x < -1000) {
                                x += 2000
                            }
                        }
                        if (z > 1000) {
                            z -= 2000
                        } else {
                            if (z < -1000) {
                                z += 2000
                            }
                        }
                    }
                }
                camera.position.x += (mouseX - camera.position.x) * 0.005;
                camera.position.y += (-mouseY - camera.position.y) * 0.005;
                camera.lookAt(scene.position);
                renderer.render(scene, camera)
            }
        }


        init();

    };

    var  addTxt=function(){

        $(".pushText").html('');
        var textT= "刚到新公司有不适应的地方是肯定的,不要太过担心,祝一切都好!";
        text = textT.split("").reverse();


        var appendTime=100;
        var ind=0;
        var textTimer=setTimeout(function(){
            clearTimeout(textTimer);
            var handle=function(){

                $(".pushText").append(text.pop());

                if(ind<textT.length){
                    ind++;
                    textTimer=setTimeout(handle,appendTime);
                }else{
                    clearTimeout(textTimer);
                    addTxtIsPlay=true;
                }
            };
            handle();
        },appendTime);

    };
    var isplayTears = false;
    var playTear=function(){
        $("#Mpage13").addClass("tearPlay");
        var conH2=$(window).height()-($('#control').height()*2);

        $("#tear_wrap").css({
            'width':$(window).width(),
            'height':conH2,
            'overflow':'hidden'
        });
        if($("#tear_wrap").find(".tear1").length==0){
            var tear1='<div class="tear1"><img class="tear" src="images/tear.png" alt=""> <img class="tearS" src="images/tear2.png" alt=""></div>';
                $("#tear_wrap").append(tear1);
            var tear2='<div class="tear2"><img class="tear" src="images/tear.png" alt=""> <img class="tearS" src="images/tear2.png" alt=""></div>';
                $("#tear_wrap").append(tear2);
            var tear3='<div class="tear3"><img class="tear" src="images/tear.png" alt=""> <img class="tearS" src="images/tear2.png" alt=""></div>';
                $("#tear_wrap").append(tear3);

        }
        $("#tear_wrap").find('.tear1 .tear').hide();
        $("#tear_wrap").find('.tear2 .tear').hide();
        $("#tear_wrap").find('.tear3 .tear').hide();

        function transition(times,cb){
            setTimeout(function(){
                cb && cb();
            },times);
        }

        transition(2000,function(){$("#tear_wrap").find('.tear1 .tear').show();});
        transition(3000,function(){$("#tear_wrap").find('.tear2 .tear').show();});
        transition(5000,function(){$("#tear_wrap").find('.tear3 .tear').show();});

        //tear1
        transition(2100,function(){
            $("#tear_wrap").find('.tear1 .tear').css({
                '-webkit-transform':'scale(0)',
                '-webkit-transition':'all 2s'
            });
        });
        transition(2100,function(){
            $("#tear_wrap").find('.tear1 .tearS').css({
                '-webkit-transform':'scale(1)',
                '-webkit-transition':'all 3s'
            });
        });

        //tear2
        transition(3100,function(){
            $("#tear_wrap").find('.tear2 .tear').css({
                '-webkit-transform':'scale(0)',
                '-webkit-transition':'all 2s'
            });
        });
        transition(3100,function(){
            $("#tear_wrap").find('.tear2 .tearS').css({
                '-webkit-transform':'scale(1)',
                '-webkit-transition':'all 3s'
            });
        });

        //tear3
        transition(5100,function(){
            $("#tear_wrap").find('.tear3 .tear').css({
                '-webkit-transform':'scale(0)',
                '-webkit-transition':'all 2s'
            });
        });
        transition(5100,function(){
            $("#tear_wrap").find('.tear3 .tearS').css({
                '-webkit-transform':'scale(1)',
                '-webkit-transition':'all 3s'
            });
        });
    };
    var bookFadeOutTimer=null;
    //最后一页书消失
    var bookFadeOut =function(time,cb){
            $("#control").remove();
            $("#lastBack").show(8).css({
                'opacity':1,
                '-webkit-transition':'opacity 2s',
                'transition':'opacity 4s'

            }).on("webkitTransitionEnd",function(){
                clearTimeout(turnTimer);
                $("#YoContent").remove();


                cb&&cb();
            });
            $("#YoContent,#sprite").css({
                'opacity':0,
                '-webkit-transition':'opacity '+time+'s',
                'transition':'opacity '+time+'s'
            });

    }
    $("#sprite").on("touchend",function(){
        bookFadeOut();
    });
    var ops = {};
    var turnTurningFun=function(page){

        var num = page;
        ops={
            'tag':'page-'+(num*1-1),
            'even':'load'
        };
        $("body").trigger("ga:gaSend",ops);

        if(page == 5&& !$("#Mpage6").hasClass("addTxtWarp")||page == 6&& !$("#Mpage6").hasClass("addTxtWarp")){
            var test ='<div class="text"><p class="pushText"></p></div>';
            $("#Mpage6").append(test).addClass("addTxtWarp");
        }
        if(page == 8&& !$("#Mpage9").hasClass("starWarp")||page == 9&& !$("#Mpage9").hasClass("starWarp")){
            var startCont = "<div class='people' id='people'><div class='boy'></div><div class='girl'></div></div>";
            var weLove = '<div id="weLove" style="display:none;">我们相爱了……</div>';

            var starCanvas = '<div class="star_wrap" id="star_wrap" style="position: absolute;z-index: 10;left: 0; top: 0;"><canvas id="starCanvas" width="750" height="1000"></canvas></div>';

            $("#Mpage9").append(startCont).append(starCanvas).addClass("starWarp").append(weLove);
        }
        if(page == 12&& !$("#Mpage13").hasClass("tearWarp")||page == 13&& !$("#Mpage13").hasClass("tearWarp")){
            var tearCanvas = '<div class="tear_wrap" id="tear_wrap" style="position: absolute;z-index: 10;left: 0; top: 0;"></div>';
            $("#Mpage13").append(tearCanvas).addClass("tearWarp");
        }

        if(page == 15&&!$("#Mpage16").hasClass("snowWarp")||page == 16  &&!$("#Mpage16").hasClass("snowWarp")){
            var snow = '<div class="snow_wrap" id="snow_wrap" style="position: absolute;z-index: 10;left: 0; top: 0;"></div>';//
            $("#Mpage16").append(snow).addClass("snowWarp");


        }

    };
    var turnEndFun=function(pageObject,turned){
        if(pageObject.page == 5&&pageObject.next == 6  && !!turned&&!addTxtIsPlay||pageObject.page == 7 &&pageObject.next == 6   && !!turned&&!addTxtIsPlay){
            isautoPlay = false;
            addTxt();
        }

        if(pageObject.page == 8&&pageObject.next == 9  && !!turned&&!starIsPlay||pageObject.page == 10 &&pageObject.next == 9   && !!turned&&!starIsPlay){
            playStar();
        }

        if(pageObject.page == 12&& !$("#Mpage13").hasClass("tearPlay") &&pageObject.next == 13  && !!turned&&!tearIsPlay||pageObject.page == 14 &&pageObject.next == 13 && !!turned&&!tearIsPlay){

            isautoPlay = false;
            playTear();
        }
        if(pageObject.page == 15&&pageObject.next == 16  && !!turned&&!snowIsPlay){

            playSnow();
            $(".sprite").on("click",function(){
                bookFadeOut(2,function(){


                    var spriteTimer = setTimeout(function(){

                        var handle = function(){
                            clearTimeout(spriteTimer);
                            $("#starSprite").show();
                            starSprite(function () {
                                $("#starSprite").hide();

                                spriteTimer = setTimeout(handle,2000);
                            });
                        }
                        handle();
                    });

                });
            });

        }


        if(pageObject.next != 16 && !!turned){

            clearTimeout(bookFadeOutTimer);
            $("#Cright").show();
        }
        if(pageObject.next != 1 && !!turned){


            $("#Cleft").show();
        }


    };




    $('.flipbook').turn({
        // Width
        width:w,
        // Height
        height:h,
        // Elevation
        elevation: 50,
        display :'single',
        // Enable gradients
        gradients: true,
        // Auto center this flipbook
        autoCenter: true,
        when: {
            first:function(){
                $("#Cleft").hide();

            },
            start : function(event, pageObject, corner){
                turnStartFun(pageObject);
            },
            turning: function(event, page, pageObject) {
                turnTurningFun(page);
            },
            end:function(event, pageObject, turned){
                turnEndFun(pageObject,turned);

            },
            last:function(){

                var ua = navigator.userAgent.toLowerCase();

                if (/android/.test(ua)) {
                    if(/oppo r7/.test(ua)) {
                        $('#blue').show();
                    }
                }
                //最后一页右边按钮隐藏
                $("#Cright").remove();
                $("#Cleft").remove();
                $(".AllControl").remove();
                $(".sprite").show();
                loadPic([
                    "images/img_sprite10/01.png",
                    "images/img_sprite10/02.png",
                    "images/img_sprite10/03.png",
                    "images/img_sprite10/04.png",
                    "images/img_sprite10/05.png",
                    "images/img_sprite10/06.png",
                    "images/img_sprite10/07.png",
                    "images/img_sprite10/08.png",
                    "images/img_sprite10/10.png",
                    "images/img_sprite10/11.png",
                    "images/img_sprite10/12.png",
                    "images/img_sprite10/13.png",
                    "images/img_sprite10/14.png",
                    "images/img_sprite10/15.png",
                    "images/img_sprite10/16.png",
                    "images/img_sprite10/17.png",
                    "images/img_sprite10/18.png",
                    "images/img_sprite10/19.png",
                    "images/img_sprite10/20.png",
                    "images/img_sprite10/21.png"
                ],function(){
                    bookFadeOutTimer=setTimeout(function(){
                        setTimeout(function(){
                            $(document).on("touchend",function(){
                                var ua = window.navigator.userAgent.toLowerCase();
                                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                                    window.location.href = 'http://share.laiwang.com/s/gGgCr?tm=916cba&from=timeline&isappinstalled=0';
                                }else{
                                    window.location.href = 'https://dove.tmall.com/?spm=a1z10.3-b.w5001-3272225863.5.WGci1N&scene=taobao_shop';
                                }
                                ops={
                                    'tag':'Dove',
                                    'even':"click"
                                };
                                $("body").trigger("ga:gaSend",ops);

                            });

                        },1000);

                            bookFadeOut(5,function(){


                                var spriteTimer = setTimeout(function(){

                                    var handle = function(){
                                        clearTimeout(spriteTimer);
                                        $("#starSprite").show();
                                        starSprite(function () {
                                            $("#starSprite").hide();

                                            spriteTimer = setTimeout(handle,2000);
                                        });
                                    }
                                    handle();
                                });

                            });
                    },4000);
                });
            }
        }
    });

    turn2s();
    };



var audioReady = function () {
    this.load('music/music.mp3');
    var _this=this;
    this.on('ended',function(){
        _this.seek(0);
        _this.play();
    });
    var musicPlay = document.getElementById('musicPlay');
    //playPause.bind(this);
    musicPlay.addEventListener('touchend', playPause.bind(this));
    //this.play();
}

 var loaded = false;

 var playPause = function () {


     if (this.playing) {
         this.pause();
         this.volume(0);
         $("#music").addClass("disable");
     } else {
         this.play();
         this.volume(1);
         $("#music").removeClass("disable");
     }

 }


var audio5js = null;

var initAudio = function () {

    audio5js = new Audio5js({
        throw_errors: true,
        format_time: true,
        ready: audioReady
    });

}




loadPic([
    'images/bookCover.png',
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg',
    'images/10.jpg',
    'images/11.jpg',
    'images/120.png',
    'images/13.jpg',
    'images/14.jpg',
    'images/15.png'

],function(srcs){
    $("#loding").remove();

    initAudio();
    var isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1;

    if(isSafari){
        $("#music").addClass("disable");
    }else{
        audio5js.play();
    }

    readBookPages(srcs,function(){
        readFirstPage();
        addTurn();
    });
});
//loading
var loadInt = 0;
//
var loadIngTimer = setTimeout(function(){
    var hander = function(){
        clearTimeout(loadIngTimer);
        if(loadInt <=2){
            $("#spot").append(".");
            loadInt++;
        }else{
            loadInt=0;
            $("#spot").html("");
        }
        loadIngTimer = setTimeout(hander,500);
    }
    hander();

},500);




(function(){
    var getGa=function(ops){

        var params = {};
        var img_domain = 'http://'+document.domain;

        $.extend(params,ops);
        var img = new Image(1, 1);

        var rnd_id = "_img_" + Math.random();
        window[rnd_id] = img; // 全局变量引用
        img.onload = img.onerror = function () {
            img.onload = img.onerror = null;
            img = null;
            window[rnd_id] = null; // 删除全局变量引用
        };
        img.src = img_domain+'/user/a?source=' + encodeURIComponent(JSON.stringify(params))+'&no_cache='+1e6 * Math.random();
    };


    $.Event('ga:gaSend', {bubbles: false});
    $("body").on("ga:gaSend",function(e,ops){
        e.preventDefault();
        getGa(ops);
    });


})();


