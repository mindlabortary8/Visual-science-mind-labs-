const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const slider = document.getElementById("objectSlider")

let mirrorType="concave"

function setMirror(type){

mirrorType=type
draw()

}

slider.addEventListener("input",draw)

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

let axisY=300
let mirrorX=850

let focalLength=200

let center=2*focalLength

let objectX=parseInt(slider.value)

let objectHeight=120

/* principal axis */

ctx.strokeStyle="white"

ctx.beginPath()

ctx.moveTo(0,axisY)
ctx.lineTo(canvas.width,axisY)

ctx.stroke()

/* mirror */

ctx.beginPath()

if(mirrorType==="concave"){

ctx.arc(mirrorX+120,axisY,350,Math.PI*0.7,Math.PI*1.3)

}else{

ctx.arc(mirrorX-120,axisY,350,-Math.PI*0.3,Math.PI*0.3)

}

ctx.stroke()

/* points */

let F = mirrorType==="concave" ? mirrorX-focalLength : mirrorX+focalLength
let C = mirrorType==="concave" ? mirrorX-center : mirrorX+center
let P = mirrorX

ctx.fillStyle="cyan"

drawPoint(P,"P")
drawPoint(F,"F")
drawPoint(C,"C")

function drawPoint(x,label){

ctx.beginPath()
ctx.arc(x,axisY,5,0,Math.PI*2)
ctx.fill()

ctx.fillText(label,x-5,axisY+20)

}

/* object */

ctx.strokeStyle="yellow"

ctx.beginPath()

ctx.moveTo(objectX,axisY)
ctx.lineTo(objectX,axisY-objectHeight)

ctx.stroke()

ctx.fillText("Object",objectX-20,axisY-objectHeight-10)

/* mirror formula */

let u = mirrorX-objectX

let f = mirrorType==="concave" ? -focalLength : focalLength

let v = 1/((1/f)-(1/u))

let imageX = mirrorX-v

let imageHeight = -(v/u)*objectHeight

/* image */

ctx.strokeStyle="lime"

ctx.beginPath()

ctx.moveTo(imageX,axisY)
ctx.lineTo(imageX,axisY-imageHeight)

ctx.stroke()

ctx.fillText("Image",imageX-20,axisY-imageHeight-10)

/* rays */

ctx.strokeStyle="red"

/* parallel ray */

ctx.beginPath()

ctx.moveTo(objectX,axisY-objectHeight)
ctx.lineTo(mirrorX,axisY-objectHeight)

ctx.stroke()

ctx.beginPath()

ctx.moveTo(mirrorX,axisY-objectHeight)
ctx.lineTo(F,axisY)

ctx.stroke()

/* ray through F */

ctx.beginPath()

ctx.moveTo(objectX,axisY-objectHeight)
ctx.lineTo(F,axisY)

ctx.stroke()

ctx.beginPath()

ctx.moveTo(mirrorX,axisY-objectHeight)
ctx.lineTo(mirrorX-500,axisY-objectHeight)

ctx.stroke()

/* ray through C */

ctx.strokeStyle="orange"

ctx.beginPath()

ctx.moveTo(objectX,axisY-objectHeight)
ctx.lineTo(C,axisY)
ctx.lineTo(mirrorX,axisY-objectHeight)

ctx.stroke()

/* case text */

let caseText=""

if(mirrorType==="concave"){

if(objectX<C-20) caseText="Object beyond C → real inverted image between F and C"

else if(Math.abs(objectX-C)<20) caseText="Object at C → image at C"

else if(objectX>C && objectX<F) caseText="Object between C and F → image beyond C"

else if(Math.abs(objectX-F)<20) caseText="Object at F → image at infinity"

else caseText="Object between F and P → virtual upright image"

}

else{

caseText="Convex mirror → virtual upright image between F and P"

}

document.getElementById("caseText").innerText=caseText

}

draw()
