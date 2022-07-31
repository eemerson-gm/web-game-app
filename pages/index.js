import { useEffect } from "react"
import { Container } from "react-bootstrap"

import Canvas from "./components/canvas"
import OnlineGame from "./lib/onlinegame"
import Sprite from "./lib/sprite"

export default function Index() {

	let player;
	let game;

	useEffect(() => {
		gameHandler()
	})

	const gameHandler = async () => {
		game = new OnlineGame('./img/')
		await game.startClient()
		game.onConnected(() => {
			player = new Sprite(game.socket.id, 0, 0, 'dog.png', 1)
			game.updateSprite(player)
			game.addSprite(player)
			game.addKey("w", () => {
				player.y -= 1
			})
			game.addKey("a", () => {
				player.x -= 1
			})
			game.addKey("s", () => {
				player.y += 1
			})
			game.addKey("d", () => {
				player.x += 1
			})
			setInterval(() => {
				game.updateSprite(player)
			}, 100)
			game.start()
		})
	}

	return (
		<>
			<Container>
				<Canvas width={640} height={360} style={{ border: '2px solid black', borderRadius: '12px' }} />
			</Container>
		</>
	)
}
