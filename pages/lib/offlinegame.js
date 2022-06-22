
export default class OfflineGame {

    constructor(imagePath) {
        this.sprites = []
        this.events = []
        this.keys = []

        this.canvas = document.getElementById("_gamecanvas")
        this.context = this.canvas.getContext("2d")
        this.context.scale(4, 4)
        this.context.imageSmoothingEnabled = false
        this.imagePath = imagePath

        this.start = this.start.bind(this)
        this.step = this.step.bind(this)
        this.draw = this.draw.bind(this)
        this.wait = this.wait.bind(this)

        let self = this
        window.addEventListener('keypress', (event) => {
            let key = self.keys.find(key => key.id === event.key);
            if (key != undefined) {
                key.held = true
            }
        })
        window.addEventListener('keyup', (event) => {
            let key = self.keys.find(key => key.id === event.key);
            if (key != undefined) {
                key.held = false
            }
        })
    }

    start() {
        this.step()
        this.draw()
        this.wait()
    }

    step() {
        this.events.forEach((event, index) => {
            event()
        })
        this.sprites.forEach((sprite, index) => {
            sprite.step()
        })
        this.keys.forEach((key, index) => {
            if (key.held) {
                key.event()
            }
        })
    }

    draw() {
        let self = this
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.sprites.forEach((sprite, index) => {
            let img = new Image()
            img.src = this.imagePath + sprite.image
            self.context.drawImage(img, sprite.px, sprite.py)
        })
    }

    wait() {
        requestAnimationFrame(this.start)
    }

    addSprite(sprite) {
        console.log("Created sprite: " + JSON.stringify(sprite))
        return this.sprites.push(sprite)
    }

    addEvent(event) {
        this.events.push(event)
    }

    addKey(key, event) {
        this.keys.push({
            id: key,
            event: event,
            held: false
        })
    }

}