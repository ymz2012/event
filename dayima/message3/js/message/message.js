(function($,window){

    var url = 'http://dayima.cn/ms/hotshare';//此链接内部会判断

    $("#download").off('click').on('click',function(){
        window.location.href= 'http://dayima.cn/ms/hotshare';
    });

    if(navigator.userAgent.indexOf("Safari") > -1){
        window.location.href="dayima://web/new?url=https%3a%2f%2fibuy.meiyue.com%2fh5%2fmiss%2findex.html%3fshare%3d0";
    }else {
        var dayima = new AppLink();

        dayima.open({
            error: function () {
                // window.open(encodeURI("https://twitter.com/intent/tweet?text=Look at this awesome thing"), "_blank", "toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=450,top=" + Math.round((screen.height - 450)/2) + ",left=" + Math.round((screen.width - 550)/2))
            },
            success: function () {},
            nativeURL: encodeURI("dayima://web/new?url=https%3a%2f%2fibuy.meiyue.com%2fh5%2fmiss%2findex.html%3fshare%3d0")
        })
    }
})(Zepto,window);