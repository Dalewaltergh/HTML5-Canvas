const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

let mouse = {
    x : undefined,
    y : undefined
}

let maxRadius = 100
let minRadius = 10

let colorArray = [
    '#B4FFE4',
    '#FFFE7F',
    '#FF877E',
    '#B5FFA5',
    '#DDA0FF'
]

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x
        mouse.y = event.y
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    init()
})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) 
            this.dx = -this.dx
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) 
            this.dy = -this.dy

        this.x += this.dx
        this.y += this.dy

        // INTERACTIVITY
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) 
                this.radius += 3
        } 
        else if (this.radius > this.minRadius)
            this.radius -= 1
        

        this.draw()
    }
}

let circleArray = []
function init() {
    circleArray = []
    for (let i = 0; i < 300; i++) {
        let radius = Math.random() * 3 + 3
        let x = Math.random() * (innerWidth - radius * 2) + radius
        let y = Math.random() * (innerHeight - radius * 2) + radius
        let dx = (Math.random() - 0.5) * 5
        let dy = (Math.random() - 0.5) * 5
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++)
        circleArray[i].update()
}

init()
animate()

