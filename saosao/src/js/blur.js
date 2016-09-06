/**
 * Created by ymz on 16/9/1.
 */
var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight

var canvas = document.getElementById("canvas")

var context = canvas.getContext("2d")

canvas.width = canvasWidth
canvas.height = canvasHeight

var image = new Image()
var radius = 50
var clippingRegion = {x:1,y:1,r:radius}
var leftMargin = 0
var topMargin = 0

image.src = "./src/image/av.jpg"


image.onload = function(e){
    $("#blur-div").css("width",canvasWidth+"px")
    $("#blur-div").css("height",canvasHeight+"px")
    $("#blur-image").css("width",canvasWidth+"px")
    $("#blur-image").css("height",canvasHeight+"px")
    leftMargin = (image.width - canvas.width)/2
    topMargin = (image.height - canvas.height)/2

    $("#blur-image").css("top"+"-"+topMargin+"px")
    $("#blur-image").css("left"+"-"+leftMargin+"px")
    initCanvas()
}

function initCanvas(){
    clippingRegion = {x:Math.random()*(canvasWidth-2*radius)+radius,y:Math.random()*(canvasHeight-2*radius)+radius,r:radius};
/*    var t2=setInterval(
        function (){
            console.log("animation")
            clippingRegion.r += 10
            if (clippingRegion.r > 50){
                clearInterval(t2)
            }
            draw( image,clippingRegion)
        },10
    )*/
    draw( image,clippingRegion )
}


function draw( image,clippingRegion ){
    context.clearRect(0,0,canvasWidth,canvasHeight) //清空canvas
    context.save()
    setClippingRegion( clippingRegion )
    context.drawImage( image,leftMargin,topMargin,canvasWidth,canvasHeight,0,0,canvasWidth,canvasHeight)
    context.restore()
}

function setClippingRegion(clippingRegion){
    context.beginPath()
    context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,2*Math.PI,false)
    context.clip()   //剪辑区域
}

function reset(){
    initCanvas()
}

function show(){
    var theAnimation = setInterval(
        function(){
            clippingRegion.r += 20
            if (clippingRegion.r > 2*Math.max(canvasHeight,canvasWidth)){
                clearInterval(theAnimation)
            }
            draw( image , clippingRegion )
        },30
    )        //每隔一定时间执行一个函数
}

