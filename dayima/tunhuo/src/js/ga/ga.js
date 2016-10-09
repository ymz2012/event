(function(){
    var getGa=function(ops){

        var params = {};
        $.extend(params,ops);
        var img = new Image(1, 1);
        var rnd_id = "_img_" + Math.random();
        window[rnd_id] = img; // 全局变量引用
        img.onload = img.onerror = function () {
            img.onload = img.onerror = null;
            img = null;
            window[rnd_id] = null; // 删除全局变量引用
        };
        img.src = img_domain+'/pv?source=' + encodeURIComponent(JSON.stringify(params))+'&no_cache='+1e6 * Math.random();
    };


    $.Event('ga:gaSend', {bubbles: false});
    $("body").on("ga:gaSend",function(e,ops){
        e.preventDefault();
        getGa(ops);
    });

})();