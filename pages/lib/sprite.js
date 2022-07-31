import Lerp from 'lerp'

const short = require('short-uuid')
const translator = short()

export default class Sprite {

    constructor(id = null, x, y, img, speed = 1) {
        this.id = id
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