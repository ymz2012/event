function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

(function($,window){
    var isVip=getQueryString('vip');
    var url = 'http://dayima.cn/ms/hotshare';//此链接内部会判断

    $(".top_float").off('click').on('click',function(){
       window.location.href= url;
    });
    $(".xiazai_btn").off('click').on('click',function(){
        window.location.href= url;
    });
    if(navigator.userAgent.indexOf("Safari") > -1){
        if(isVip==1){
            window.location.href="dayima://web/new?url=http%3a%2f%2fevent.dayima.com%2fyaoqing%2findex.html";
        }else {
            window.location.href="dayima://malltopic/new?id=929";
        }

    }else {
        var dayima = new AppLink();
        var nativeUrl;
        if(isVip==1){
            nativeUrl="dayima://web/new?url=http%3a%2f%2fevent.dayima.com%2fyaoqing%2findex.html";
        }else {
            nativeUrl="dayima://malltopic/new?id=929";
        }
        dayima.open({
            error: function () {
                // window.open(encodeURI("https://twitter.com/intent/tweet?text=Look at this awesome thing"), "_blank", "toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=450,top=" + Math.round((screen.height - 450)/2) + ",left=" + Math.round((screen.width - 550)/2))
            },
            success: function () {},
            nativeURL: encodeURI(nativeUrl)
        })
    }

})(Zepto,window);