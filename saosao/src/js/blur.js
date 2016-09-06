/**
 * Created by ymz on 16/9/1.
 */
var canvasWidth = 800
var canvasHeight = 600

var canvas = document.getElementById("canvas")

var context = canvas.getContext("2d")

canvas.width = canvasWidth
canvas.height = canvasHeight

var image = new Image()
var radius = 50
var clippingRegion = {x:1,y:1,r:radius}

image.src = "./src/image/av.jpg"


image.onload = function(e){
    initCanvas()
}

function initCanvas(){
    clippingRegion = {x:Math.random()*(canvasWidth-2*radius)+radius,y:Math.random()*(canvasHeight-2*radius)+radius,r:0};
    var t2=setInterval(
        function (){
            clippingRegion.r += 10
            if (clippingRegion.r > 50){
                clearInterval(t2)
            }
            draw( image,clippingRegion)
        },10
    )
    draw( image,clippingRegion )
}


function draw( image,clippingRegion ){
    context.clearRect(0,0,canvasWidth,canvasHeight) //清空canvas
    context.save()
    setClippingRegion( clippingRegion )
    context.drawImage( image , 0 , 0 )
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

