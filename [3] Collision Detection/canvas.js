const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// EVENT LISTENERS
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
// EVENT LISTENERS

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  let xDistance = x2 - x1
  let yDistance = y2 - y1

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}
  
// OBJECTS
class Circle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}
// OBJECTS

// IMPLEMENTATION
let circle1
let circle2
function init() {
  circle1 = new Circle(300, 300, 100, 'grey')
  circle2 = new Circle(undefined, undefined, 30, 'orange')
}
// IMPLEMENTATION

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  circle1.update() 
  circle2.x = mouse.x
  circle2.y = mouse.y
  circle2.update()


  circle1.color = distance(circle1.x, circle1.y, circle2.x, circle2.y)
   < circle1.radius + circle2.radius ? 'orange' : 'grey'
  
}

init()
animate()

