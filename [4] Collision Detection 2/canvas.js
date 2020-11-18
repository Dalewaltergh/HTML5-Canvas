const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: 10,
  y: 10,
}

const colors = [
    '#B4FFE4',
    '#FFFE7F',
    '#FF877E',
    '#B5FFA5',
    '#DDA0FF']

// EVENT LISTENERS
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener("resize", () => {
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

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  }

  return rotatedVelocities
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y

  const xDistance = otherParticle.x - particle.x
  const yDistance = otherParticle.y - particle.y

  if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)

    const m1 = particle.mass 
    const m2 = otherParticle.mass

    const u1 = rotate(particle.velocity, angle)
    const u2 = rotate(otherParticle.velocity, angle)

    const v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    }
    const v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    }

    const vFinal1 = rotate(v1, -angle)
    const vFinal2 = rotate(v2, -angle)

    particle.velocity.x = vFinal1.x
    particle.velocity.y = vFinal1.y

    otherParticle.velocity.x = vFinal2.x
    otherParticle.velocity.y = vFinal2.y
  }
}

// OBJECTS
class Particle {
  constructor(x, y, radius, color) {
  this.x = x
  this.y = y
  this.velocity = {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5
  }
  this.radius = radius
  this.color = color
  this.mass = 1
  this.opacity = 0
  }

  update(particles) {
    this.draw()

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue
      if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) 
        resolveCollision(this, particles[i])
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) 
      this.velocity.x = -this.velocity.x

    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) 
      this.velocity.y = -this.velocity.y

    if (distance(mouse.x, mouse.y, this.x, this.y) < 80 && this.opacity < 0.2) {
      this.opacity += 0.02
    } else if (this.opacity > 0){
      this.opacity -= 0.02
      this.opacity = Math.max(0, this.opacity)
    } 
    
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.save()
    c.globalAlpha = this.opacity 
    c.fillStyle = this.color
    c.fill()
    c.restore()
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }
}
// OBJECTS

// IMPLEMENTATION
let particles
function init() {
  particles = []

  for (let i = 0; i < 150; i++) {
    const radius = 15
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(radius, canvas.height - radius) 
    const color = randomColor(colors)

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius)   
          y = randomIntFromRange(radius, canvas.height - radius) 
          j--
        }
      }
    }
    particles.push(new Particle(x, y, radius, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update(particles)
  })
}

init()
animate()
