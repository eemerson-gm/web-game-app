import OfflineGame from './offlinegame'
import IO from "socket.io-client"
import Sprite from './sprite'

export default class OnlineGame extends OfflineGame {

    constructor(imagePath) {
        super(imagePath)
        this.connectCallback = null
    }

    async startClient() {
        await fetch('/api/socket')
        this.socket = await IO()
        this.eventHandler(this.socket)
    }

    onConnected(callback) {
        this.connectCallback = callback
    }

    createSprite(sprite) {
        this.socket.emit('createSprite', JSON.stringify(sprite))
    }

    updateSprite(sprite) {
        this.socket.emit('updateSprite', JSON.stringify(sprite))
    }

    eventHandler(socket) {
        this.socket.on('connect', () => {
            console.log("Connected to Server (" + socket.id + ")")
            this.connectCallback()
        })
        this.eventOn('updateSprite', (object) => {
            let player = this.sprites.find(sprite => sprite.id === object.id)
            if (player !== undefined) {
                player.x = object.x
                player.y = object.y
            } else {
                let sprite = new Sprite(object.id, object.x, object.y, object.image, 0.15)
                sprite.x = sprite.x
                sprite.y = sprite.y
                this.addSprite(sprite)
            }
        })
        this.eventOn('deleteSprite', (object) => {
            this.sprites = this.sprites.filter(sprite => sprite.id !== object.id)
        })
    }

    eventOn(name, listener) {
        this.socket.on(name, (message) => {
            console.log(message)
            let object = JSON.parse(message)
            console.log("Recieved: " + JSON.stringify(object))
            listener(object)
        })
    }

}