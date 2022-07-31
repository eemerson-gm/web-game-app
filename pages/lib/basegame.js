
export default class BaseGame {

    constructor(imagePath) {
        this.sprites = []
        this.images = []
        this.events = []
        this.keys = []
        this.layers = []

        this.imagePath = imagePath
        this.start = this.start.bind(this)
        this.step = this.step.bind(this)
        this.draw = this.draw.bind(this)
        this.wait = this.wait.bind(this)

        window.addEventListener('keypress', (event) => {
            this.setKey(event.key, true)
        })
        window.addEventListener('keyup', (event) => {
            this.setKey(event.key, false)
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
        let image = new Image()
        let file = sprite.image + '.png'
        image.src = file
        console.log("Created sprite: " + JSON.stringify(sprite))
        if (this.images.find(image => image.src === file) !== undefined) {
            this.images.push(image)
            console.log("Created image: " + JSON.stringify(image))
        }
        return this.sprite.push(sprite)
    }

    addEvent(event) {
        this.events.push(event)
    }

    addCanvas(id, type) {
        let canvas = document.getElementById(id)
        let context = canvas.getContext("2d").scale(4, 4)
        context.imageSmoothingEnabled = false
        this.layers.push({
            elements: [],
            canvas: canvas,
            context: context,
            type: type
        })
    }

    addKey(key, event) {
        this.keys.push({
            id: key,
            event: event,
            held: false
        })
    }

    setKey(event, state) {
        let key = this.keys.find(key => key.id === event.key);
        if (key != undefined) {
            key.held = state
        }
    }

}