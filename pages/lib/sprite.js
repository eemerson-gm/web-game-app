import Lerp from 'lerp'

const short = require('short-uuid')
const translator = short()

export default class BaseSprite {

    constructor(id = null, x, y, img, speed = 1) {
        if (id === null) {
            this.id = translator.new()
        } else {
            this.id = id
        }
        this.x = x
        this.y = y
        this.px = x
        this.py = y
        this.image = img
        this.speed = speed
    }

    step() {
        this.px = Lerp(this.px, this.x, this.speed)
        this.py = Lerp(this.py, this.y, this.speed)
    }

}