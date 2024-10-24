import { useState } from "react";
import "./Chat.css";

export default function Chat() {
	const [chatUser, setChatUser] = useState("");
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState("");

	function HandleInput() {
		if (inputMessage.trim() != "") {
			setMessages([...messages, inputMessage]);
			setInputMessage("");
		}
	}

	return (
		<>
			<header>
				<img className="profilePicture" src="" alt="Profile Picture" />
				<p className="chatName">Conversando com {chatUser}</p>
				<button type="button">Sair do chat</button>
			</header>

			<main>
				<div className="chatMessages">
					{messages.map((message, index) => (
						<p key={index} className="message">
							{message}
						</p>
					))}
				</div>

				<div className="chatInput">
					<input
						type="text"
						id="inputMessage"
						placeholder="Digite sua Mensagem"
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyPress={(e) =>
							e.key === "Enter" && HandleInput()
						}
					/>
					<button type="button" onClick={HandleInput}>
						Enviar
					</button>
				</div>
			</main>

			<footer>
				<p>Created by @0x69657a61</p>
			</footer>
		</>
	);
}
