(function(){
    $(function(){
        new subject();
    });
    function subject(){
        this.init();
    }
    subject.prototype.init=function(){
        this.readDom();
        this.eventBind();
    };
    subject.prototype.readDom=function(){
        var $page=$(".page,.page09");
        var _this=this;
        var hash=window.location.hash.replace("_hash","")||"#"+($(".page").eq(0).attr("id"));
        var readFun={
            readPage:function(hash,tagClass,ind){
                $page.css("display","none");
                $("."+tagClass).eq(ind).css("display","block");
                var padT=$("."+tagClass).eq(ind).find(".top").height();
                $("."+tagClass).find(".middle").css("padding-top",padT+"px");
                $('body')[0].scrollTop=0;
                if(ind+1==$('.page').length){
                    $("#next_btn").find(".content").html("完成");
                }else{
                    $("#next_btn").find(".content").html("下一题");
                }
                if(hash.length>7){
                    var len=tagClass.length;
                    $("#next_btn").attr("data-go","page"+(tagClass.substring(len-2)*1+1)+"_hash");
                }else {
                    $("#next_btn").attr("data-go","page"+(ind+2)+"_hash");
                }

            }
        };
        var isHash=function(hash){

            var sels;
            for(i=0;i<$page.length;i++){
                sels="#"+$page.eq(i).attr("id");
                if(hash==sels){
                    return true;
                }
            }
        };
        this.loadHash=function(hash){
            window.location.hash=hash+"_hash";
            var tagId="page";
            var ind;
            if(hash.length>7){
                tagId=hash.split("-")[0].substring(1);
                ind=hash.split("-")[1];
            }else{
                ind=(hash.substring(5))*1;
            }

                readFun.readPage(hash,tagId,ind-1);


            $(window).off("hashchange").on("hashchange",function () {
                var hash=window.location.hash.replace("_hash","")||"#"+($(".page").eq(0).attr("id"));
                if(!isHash(hash)){
                    hash="#"+($(".page").eq(0).attr("id"));
                }
                _this.loadHash(hash);
            });

        };
        $page.css("visibility","visible");
        if(!isHash(hash)){
            hash="#"+($(".page").eq(0).attr("id"));
        }

        this.loadHash(hash);



    };
    subject.prototype.eventBind=function(){
        var _this=this;
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
        var channel = getQueryString("channel") || 1;
        var IMG_SRC = "/Public/IbuySurveyAction/image/";
        var tagflag;
        var flag=0;
        var sprites;
        var srcs;
        var spritePlay;
        if (channel == 1) {
            sprites=[
                "img_sprite10/01.png",
                "img_sprite10/02.png",
                "img_sprite10/03.png",
                "img_sprite10/04.png",
                "img_sprite10/05.png",
                "img_sprite10/06.png",
                "img_sprite10/07.png",
                "img_sprite10/08.png",
                "img_sprite10/09.png",
                "img_sprite10/10.png",
                "img_sprite10/11.png",
                "img_sprite10/12.png",
                "img_sprite10/13.png",
                "img_sprite10/14.png",
                "img_sprite10/15.png",
                "img_sprite10/16.png",
                "img_sprite10/17.png",
                "img_sprite10/18.png",
                "img_sprite10/19.png",
                "img_sprite10/20.png",
                "img_sprite10/21.png"
            ];
            srcs = [
                "img_sprite10/01.png",
                "img_sprite10/02.png",
                "img_sprite10/03.png",
                "img_sprite10/04.png",
                "img_sprite10/05.png",
                "img_sprite10/06.png",
                "img_sprite10/07.png",
                "img_sprite10/08.png",
                "img_sprite10/09.png",
                "img_sprite10/10.png",
                "img_sprite10/11.png",
                "img_sprite10/12.png",
                "img_sprite10/13.png",
                "img_sprite10/14.png",
                "img_sprite10/15.png",
                "img_sprite10/16.png",
                "img_sprite10/17.png",
                "img_sprite10/18.png",
                "img_sprite10/19.png",
                "img_sprite10/20.png",
                "img_sprite10/21.png"
            ];
        }else {
            sprites=[
                "img_sprite5/01.png",
                "img_sprite5/02.png",
                "img_sprite5/03.png",
                "img_sprite5/04.png",
                "img_sprite5/05.png",
                "img_sprite5/06.png",
                "img_sprite5/07.png",
                "img_sprite5/08.png",
                "img_sprite5/09.png",
                "img_sprite5/10.png",
                "img_sprite5/11.png",
                "img_sprite5/12.png",
                "img_sprite5/13.png",
                "img_sprite5/14.png",
                "img_sprite5/15.png",
                "img_sprite5/16.png",
                "img_sprite5/17.png",
                "img_sprite5/18.png",
                "img_sprite5/19.png",
                "img_sprite5/20.png",
                "img_sprite5/21.png"
            ];
            srcs = [
                "img_sprite5/01.png",
                "img_sprite5/02.png",
                "img_sprite5/03.png",
                "img_sprite5/04.png",
                "img_sprite5/05.png",
                "img_sprite5/06.png",
                "img_sprite5/07.png",
                "img_sprite5/08.png",
                "img_sprite5/09.png",
                "img_sprite5/10.png",
                "img_sprite5/11.png",
                "img_sprite5/12.png",
                "img_sprite5/13.png",
                "img_sprite5/14.png",
                "img_sprite5/15.png",
                "img_sprite5/16.png",
                "img_sprite5/17.png",
                "img_sprite5/18.png",
                "img_sprite5/19.png",
                "img_sprite5/20.png",
                "img_sprite5/21.png"
            ];
        }
        tagflag=srcs.length;
        if(!!(document.createElement('canvas').getContext('2d'))){
            $("#spriteArea").remove();
            var spriteView=document.getElementById("spriteView");
            var ctx=spriteView.getContext('2d');
            var spriteW=spriteView.width;
            var spriteH=spriteView.height;
            var ind=0;
            var spriteImg=new Image();
            spritePlay=function(cb){
                var draw=function(){

                    spriteImg.src=IMG_SRC + sprites[ind];
                    spriteImg.onload=function(){
                        ctx.clearRect(0,0,spriteW,spriteH);
                        ctx.drawImage(spriteImg,0,0);
                        ind++;
                        if (ind < sprites.length) {
                            requestAnimFrame(draw);
                        }else {
                            cb&&cb();
                        }
                    };
                };
                draw();
            };
        }else {
            $("#spriteView").remove();
            var spriteArea=$("#spriteArea");
            var ind=0;
            var spriteImgUrl;
            spritePlay=function(cb){

                var draw=function(){
                    spriteImgUrl=IMG_SRC + sprites[ind];
                    spriteArea.css({'background':'url("'+spriteImgUrl+'") no-repeat center','background-size':'100% 100%'});
                    ind++;
                    if (ind < sprites.length) {
                        requestAnimFrame(draw);
                    }else {
                        cb&&cb();
                    }
                };
                draw();
            };
        }



        var load_img = function (src) {
            var rnd_id = "_img_" + Math.random();
            window[rnd_id] = new Image(); // 全局变量引用
            window[rnd_id].src = src;
            window[rnd_id].onload = function () {
                window[rnd_id].onload = window[rnd_id].onerror=window[rnd_id].onabort = null;
                window[rnd_id] = null;
                flag++;
                if(flag>=tagflag){
                    console.log("loadover");

                }
            };

            window[rnd_id].onabort = function () {
                window[rnd_id].onload = window[rnd_id].onerror=window[rnd_id].onabort = null;
                window[rnd_id] = null;
                flag++;
                if(flag>=tagflag){
                    console.log("loadover");
                }
            };

            window[rnd_id].onerror = function () {
                window[rnd_id].onload = window[rnd_id].onerror=window[rnd_id].onabort = null;
                window[rnd_id] = null;
                flag++;
                if(flag>=tagflag){
                    console.log("loadover");
                }
            };
        };
        var load_page = function () {

            if (srcs.length <= 0) {
                return ;
            }
            for(var i=tagflag;i>0;i--){
                var src = IMG_SRC + srcs.pop();
                load_img(src);
            }
        };
        load_page();


        /*var queue = new Hilo.LoadQueue();
        var img_SRC = "/Public/IbuySurveyAction/image/";
        var channel = getQueryString("channel") || 1;
        var imgUrl;
        var fishSprite;
        if (channel == 1) {
            imgUrl = img_SRC + 'sprite.png';
        } else {
            imgUrl = img_SRC + 'sprite1.png';
        }
        queue.maxConnections = 1;
        queue.add([
            {id: 'awAnimate', noCache: false, src: imgUrl}
        ]);
        queue.on('load', function (e) {
            console.log('load:', e.detail.src, queue.getLoaded(), queue.getTotal());
        }).on('complete', function (e) {
            console.log('complete');
            spriteInit();
        }).on('error', function (e) {
            console.log('error:', e.detail.src);
        });
        queue.start();
        function spriteInit(){
            var $container = document.querySelector("#stage");
            var stage = new Hilo.Stage({
                renderType: 'canvas',
                container: $container,
                width: 750,
                height: 1334
            });

            var ticker = new Hilo.Ticker(60);
            ticker.addTick(stage);
            ticker.start();

            var atlas = new Hilo.TextureAtlas({
                image: queue.getContent('awAnimate'),
                width: 750,
                height: 28014,
                frames: {
                    frameWidth: 750,
                    frameHeight: 1334,
                    numFrames: 21
                },
                sprites: {
                    fish: {from: 0, to: 20}
                }
            });
            //create a fish sprite
            fishSprite = new Hilo.Sprite({
                frames: atlas.getSprite('fish'),
                x: 0,
                y: 0,
                loop: false
            });
            fishSprite.addTo(stage).stop();
        }*/

        var check={
            no_ask:function(checkedDom,cb){
                if(checkedDom.length>0){
                    cb()
                }else {
                    confirm("您还没有作答完当前题目哦",function(){},2);
                }
            },
            no_txt_ask:function(txtArea,cb){
                if(txtArea.length>0||!((/^\s*$/).test(txtArea))){
                    cb()
                }else {
                    confirm("您还没有作答完当前题目哦",function(){},2);
                }
            }
        };
        var updata=function(id,str,cb){
            var odata={};
            odata[id]=str;
            console.log(odata);
            $.ajax({
                url: "/index.php/IbuySurvey/answer",
                type: "POST",
                data: odata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.errno==0){
                        cb();
                    }else {
                        alert(data.errdesc);
                    }

                },
                error: function (data) {
                    alert("网络错误");
                }
            });

        }
        var updata6=function(odata,cb){
            console.log(odata);
            $.ajax({
                url: "/index.php/IbuySurvey/answer",
                type: "POST",
                data: odata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.errno==0){
                        cb();
                    }else {
                        alert(data.errdesc);
                    }
                },
                error: function (data) {
                    alert("网络错误");
                }
            });
        };
        var checkFun={
          'page1':function(cb){
              var checkedDom=$("#page1").find("input[name='sub1']:checked");
              check.no_ask(checkedDom,function(){
                  updata("Q1",checkedDom.val(),function(){
                      cb()
                  });

              });

          },
          'page2':function(cb){
              var checkedDom=$("#page2").find("input[name='sub2']:checked");
              check.no_ask(checkedDom,function(){
                  if(checkedDom.val()==4){
                      var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                      if(checkedDomTxtVal*1>=1&&checkedDomTxtVal*1<=40&&(/^[1-9]\d*$/).test(checkedDomTxtVal)){
                          updata("Q2",checkedDom.val()+","+checkedDomTxtVal,function(){
                              cb()
                          });
                      }else {
                          confirm("请输入1-40之间的数字",function(){},2);
                      }
                  }else if(checkedDom.val()==5){
                      var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                      if(checkedDomTxtVal*1>=1&&checkedDomTxtVal*1<=10&&(/^[1-9]\d*$/).test(checkedDomTxtVal)){
                          updata("Q2",checkedDom.val()+","+checkedDomTxtVal,function(){
                              cb()
                          });
                      }else {
                          confirm("请输入1-10之间的数字",function(){},2);
                      }
                  }else {
                      updata("Q2",checkedDom.val(),function(){
                          cb()
                      });
                  }

              });

          },
          'page3':function(cb){
              var checkedDom=$("#page3").find("input[name='sub3']:checked");
              check.no_ask(checkedDom,function(){

                  if(checkedDom.length>5){
                      confirm("您最多只能最多选5项",function(){},2);
                  }else {
                      var odata="";
                      for(var i=0;i<checkedDom.length;i++){
                          if(checkedDom.eq(i).val()==19){
                              var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                                  if(i==checkedDom.length-1){
                                      odata+=checkedDomTxtVal;
                                  }else {
                                      odata+=checkedDomTxtVal+",";
                                  }

                          }else {
                              if(i==checkedDom.length-1){
                                  odata+=checkedDom.eq(i).val();
                              }else {
                                  odata+=checkedDom.eq(i).val()+",";
                              }
                          }
                      }
                      updata("Q3",odata,function(){
                          cb()
                      });
                  }

              });
          },
          'page4':function(cb){
              var checkedDom=$("#page4").find("input[name='sub4']:checked");
              check.no_ask(checkedDom,function(){
                  if(checkedDom.length>3){
                      confirm("您最多只能最多选3项",function(){},2);
                  }else {
                      var odata="";
                      for(var i=0;i<checkedDom.length;i++){
                          if(checkedDom.eq(i).val()==9){
                              var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                                  if (i == checkedDom.length - 1) {
                                      odata += checkedDomTxtVal;
                                  } else {
                                      odata += checkedDomTxtVal + ",";
                                  }

                          }else {
                              if(i==checkedDom.length-1){
                                  odata+=checkedDom.eq(i).val();
                              }else {
                                  odata+=checkedDom.eq(i).val()+",";
                              }
                          }
                      }
                      updata("Q4",odata,function(){
                          cb();
                      });
                  }
              });
          },
          'page5':function(cb){
              var checkedDom=$("#page5").find("input[name='sub5']:checked");
              check.no_ask(checkedDom,function(){
                  var odata="";
                  for(var i=0;i<checkedDom.length;i++){
                      if(checkedDom.eq(i).val()==9){
                          var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                              if (i == checkedDom.length - 1) {
                                  odata += checkedDomTxtVal;
                              } else {
                                  odata += checkedDomTxtVal + ",";
                              }
                      }else {
                          if(i==checkedDom.length-1){
                              odata+=checkedDom.eq(i).val();
                          }else {
                              odata+=checkedDom.eq(i).val()+",";
                          }
                      }
                  }
                  updata("Q5",odata,function(){
                      cb();
                  });
              });
          },
          'page6':function(cb){
              var odata={};
              var checkedDom=$("#page6").find("input[name='sub6_a']:checked");
              check.no_ask(checkedDom,function(){
                  odata['Q6_1']=checkedDom.val();
                  checkedDom=$("#page6").find("input[name='sub6_b']:checked");
                  check.no_ask(checkedDom,function(){
                      odata['Q6_2']=checkedDom.val();
                      checkedDom=$("#page6").find("input[name='sub6_c']:checked");
                      check.no_ask(checkedDom,function(){
                          odata['Q6_3']=checkedDom.val();
                          checkedDom=$("#page6").find("input[name='sub6_d']:checked");
                          check.no_ask(checkedDom,function(){
                              odata['Q6_4']=checkedDom.val();
                              checkedDom=$("#page6").find("input[name='sub6_e']:checked");
                              check.no_ask(checkedDom,function(){
                                  odata['Q6_5']=checkedDom.val();
                                  checkedDom=$("#page6").find("input[name='sub6_f']:checked");
                                  check.no_ask(checkedDom,function(){
                                      odata['Q6_6']=checkedDom.parents(".item").find("label textarea").val();
                                          updata6(odata, function () {
                                              cb();
                                          });
                                  });
                              });
                          });
                      });
                  });
              });
          },
          'page7':function(cb){
              var checkedDom=$("#page7").find("input[name='sub7']:checked");
              check.no_ask(checkedDom,function(){
                  if(checkedDom.length>3){
                      confirm("您最多只能最多选3项",function(){},2);
                  }else {
                      var odata="";
                      for(var i=0;i<checkedDom.length;i++){
                          if(checkedDom.eq(i).val()==8){
                              var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                                  if (i == checkedDom.length - 1) {
                                      odata += checkedDomTxtVal;
                                  } else {
                                      odata += checkedDomTxtVal + ",";
                                  }

                          }else {
                              if(i==checkedDom.length-1){
                                  odata+=checkedDom.eq(i).val();
                              }else {
                                  odata+=checkedDom.eq(i).val()+",";
                              }
                          }
                      }
                      updata("Q7",odata,function(){
                          cb();
                      });
                  }
              });
          },
          'page8':function(cb){
              var checkedDom=$("#page8").find("input[name='sub8']:checked");
              check.no_ask(checkedDom,function(){
                  var odata="";
                  for(var i=0;i<checkedDom.length;i++){
                      if(checkedDom.eq(i).val()==6){
                          var checkedDomTxtVal=checkedDom.parents(".item").find("label textarea").val();
                              if (i == checkedDom.length - 1) {
                                  odata += checkedDomTxtVal;
                              } else {
                                  odata += checkedDomTxtVal + ",";
                              }

                      }else {
                          if(i==checkedDom.length-1){
                              odata+=checkedDom.eq(i).val();
                          }else {
                              odata+=checkedDom.eq(i).val()+",";
                          }
                      }
                  }
                  updata("Q8",odata,function(){
                      cb();
                  });
              });
          },
          'page9':function(cb){
              var checkedDom=$("#page9").find("input[name='sub9']:checked");
              check.no_ask(checkedDom,function(){
                if(checkedDom.val()==1){
                    updata("Q9",checkedDom.val(),function(){
                        $("#next_btn").attr("data-go","page09-1_hash");
                        cb();
                    });

                }else if(checkedDom.val()==2){
                    updata("Q9",checkedDom.val(),function(){
                        $("#next_btn").attr("data-go","page09-2_hash");
                        cb();
                    });

                }else{
                    updata("Q9",checkedDom.val(),function(){
                        cb();
                    });
                }

              });
          },
          'page10':function(cb){
              var txtArea=$("#page10").find("textarea").val();
              check.no_txt_ask(txtArea,function(){
                  updata("Q12",txtArea,function(){
                      cb()
                  });
              })
          },
          'page11':function(){
              var checkedDom=$("#page11").find("input[name='sub11']:checked");
              check.no_ask(checkedDom,function(){
                  updata("Q13",checkedDom.val(),function(){
                      var channel=getQueryString("channel")||1;
                      $.ajax({
                          url: "/index.php/IbuySurvey/end",
                          type: "POST",
                          data: {
                              'channel':channel
                          },
                          dataType: "json",
                          success: function (data) {
                              console.log(data);
                              if(data.errno==0){
                                          _pv_post(1019, "end");
                                          _uv_post("end", uid, 1019);
                                          $("#stage").css("display","block").on("click",function(e){
                                              e.preventDefault();
                                              window.location.href="/index.php/IbuySurvey/award?channel="+channel;
                                          });
                                          spritePlay(function(){
                                              setTimeout(function(){
                                                  window.location.href="/index.php/IbuySurvey/award?channel="+channel;
                                              },1000);
                                          });
                                          //fishSprite.play();

                              }else {
                                  alert(data.errdesc);
                              }
                          },
                          error: function (data) {
                              alert("网络错误");
                          }
                      });
                  });

              });
          },
          'page09-1':function(cb){
              var txtArea=$("#page09-1").find("textarea").val();
              check.no_txt_ask(txtArea,function(){
                updata("Q10",txtArea,function(){
                    cb()
                });
              })
          },
          'page09-2':function(cb){
              var txtArea=$("#page09-2").find("textarea").val();
              check.no_txt_ask(txtArea,function(){
                  updata("Q11",txtArea,function(){
                      cb()
                  });
              })
          }

        };
        var eventFun={
            nextBtnFun:function(){
                var _theDom=this;
                var fun=window.location.hash.replace("_hash","").substring(1);
                checkFun[fun](function(){
                    var hash=$(_theDom).data("go");
                    window.location.hash="#"+hash;
                });

            }
        };
        $(".item label textarea").on("focus",function(){
           $(this).parents(".item").find("input[type='radio'],input[type='checkbox']").prop("checked", true);
        });
        $("textarea").on("blur",function(){
            if($(this).val()==""||((/^\s*$/)).test($(this).val())){
                $(this).val("");
            }

        });
        $(".item label textarea").on("blur",function(){
            if($(this).val()==""){
                $(this).parents(".item").find("input[type='radio'],input[type='checkbox']").prop("checked", false);
            }else{
                $(this).parents(".item").find("input[type='radio'],input[type='checkbox']").prop("checked", true);
            }

        });
        $(".item").find("input[type='radio']").parents(".item").on("click",function(){
            $(this).siblings(".item").find("label textarea").val("");
        });


        $("#next_btn").off("click").on("click",eventFun.nextBtnFun);
    };
})();