// var canvas = document.querySelector('canvas')
// var button = document.querySelector('button')
// var ctx = canvas.getContext('2d')

// canvas.width = document.body.clientWidth
// canvas.height = document.body.clientHeight

// var currentFigure = getCircle()
// var targetFigure = getCircle()

// var type = 'circle'

// button.addEventListener('click', event => {
//   if (type == 'circle') {
//     type = 'butt'
//     targetFigure = generateButt(360)
//     return
//   }

//   if (type == 'butt') {
//     type = 'rose'
//     targetFigure = getRose()
//     return
//   }

//   if (type == 'rose') {
//     type = 'cannabis'
//     ctx.strokeStyle = 'white'
//     targetFigure = getCannabis()
//   }
// })

// function random(min, max) {
//   return Math.random() * (max - min) + min
// }

// function draw(time) {
//   requestAnimationFrame(draw)

//   ctx.fillStyle = 'rgba(0,0,0, 0.5)'
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ctx.save()
//   ctx.translate(canvas.width / 2, canvas.height / 2)

//   ctx.lineWidth = 4

//   ctx.beginPath()

//   for (var i = 0; i < currentFigure.length; i++) {
//     currentPoint = currentFigure[i]
//     targetPoint = targetFigure[i]

//     diffX = targetPoint.x - currentPoint.x
//     diffY = targetPoint.y - currentPoint.y

//     currentFigure[i].x += diffX * random(0.03, 0.05)
//     currentFigure[i].y += diffY * random(0.03, 0.05)
//   }

//   for (var i = 0; i < currentFigure.length; i++) {
//     var coords = currentFigure[i]

//     ctx.lineTo(coords.x, coords.y)
//   }

//   ctx.closePath()
//   ctx.fill()

//   ctx.restore()
// }

// function getRose() {
//   var a = 150
//   var k = 6

//   var result = []

//   for (var i = 0; i < 360; i++) {
//     var angle = (i * 2 * Math.PI) / 360
//     var radius = a * Math.cos(k * angle)

//     x = radius * Math.sin(angle)
//     y = radius * Math.cos(angle)

//     result.push({ x: x, y: y })
//   }

//   return result
// }

// function getCannabis() {
//   var a = 0.5
//   var result = []

//   for (var i = 0; i < 360; i++) {
//     var angle = (i * 2 * Math.PI) / 360
//     var radius =
//       Math.asin(a + a * Math.cos(8 * angle)) * (a - a * Math.cos(angle))

//     x = 100 * radius * Math.sin(angle)
//     y = 100 * radius * Math.cos(angle)

//     result.push({ x: x, y: y })
//   }

//   return result
// }

// function getCircle() {
//   return drawPolygon()
// }

// function drawPolygon() {
//   var vert = 360
//   var offset = 180
//   var result = []

//   for (var i = 0; i < vert; i++) {
//     var angle = degreesToRadians(offset) + (i * 2 * Math.PI) / vert

//     x = 100 * Math.sin(angle)
//     y = 100 * Math.cos(angle)

//     result.push({ x: x, y: y })
//   }

//   return result
// }

// function generateButt(vertex) {
//   var points = []

//   var a = 0.5

//   for (var i = 0; i < vertex; i++) {
//     var angle = (i * 2 * Math.PI) / vertex
//     var radius = a - a * Math.cos(angle)

//     x = 100 * radius * Math.sin(angle)
//     y = 100 * radius * Math.cos(angle)

//     points.push({ x: x, y: y })
//   }

//   return points
// }

// function degreesToRadians(angleInDegrees) {
//   return (Math.PI * angleInDegrees) / 180
// }

// requestAnimationFrame(draw)
