import { Server } from 'socket.io'

let objects = []

export default function SocketHandler(req, res) {
	if (!res.socket.server.io) {
		const io = new Server(res.socket.server)
		res.socket.server.io = io
		io.on('connection', client => {
			client.emit('welcome', client.id)
			eventHandler(io, client)
		})
	}
	res.end()
}

function eventHandler(io, client) {
	client.on('disconnect', (reason) => {
		client.broadcast.emit('deleteSprite', JSON.stringify({ id: client.id }))
	})
	client.on('updateSprite', message => {
		let object = JSON.parse(message)
		client.broadcast.emit('updateSprite', message)
	})
}
