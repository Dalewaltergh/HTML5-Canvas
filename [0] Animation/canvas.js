const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, 30, 0, Math.PI * 2, false)
        c.strokeStyle = 'blue'
        c.stroke()
        c.fillStyle = 'rgba(0, 150, 50, 0.25)'
        c.fill()
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy = -this.dy
        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

let circleArray = []
for (let i = 0; i < 100; i++) {
    let radius = 30
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5) * 10
    let dy = (Math.random() - 0.5) * 10
    circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++)
        circleArray[i].update()
}

animate()

