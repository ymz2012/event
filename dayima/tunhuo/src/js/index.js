/**
 * Created by ymz on 16/9/14.
 */
var img_domain = 'http://pv.event.yoloho.com';
$('#container').on('click','a',function(){
    var tag=$(this).data('tag');

    var ops={
        m:'2001',
        t:tag,
        e:'click'
    };
    $('body').trigger('ga:gaSend',ops);
    window.location.href=$(this).data('href');
})