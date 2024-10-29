import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import style from "./Chat.module.css";

const socket = io("http://localhost:5000");

export default function Chat() {
	const [username, setUsername] = useState("");

	const location = useLocation();

	useEffect(() => {
		const user = location.state?.username;
		setUsername(user);
	}, [location.state?.username]);

	//const [chatUser, setChatUser] = useState("");
	const [inputMessage, setInputMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("receiveMessage", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, []);

	function HandleInput() {
		if (inputMessage.trim() !== "") {
			const message = {
				user: username,
				text: inputMessage,
			};
			console.log(message);
			socket.emit("sendMessage", message);
			setInputMessage("");
		}
	}

	return (
		<div className={style.body}>
			<header className={style.header}>
				<div>
					<img src="/src/assets/icon.png" alt="Profile Picture" />
					<p>{username}</p>
				</div>
				<p>Conversando com anonimo</p>
				<button type="button">Sair do chat</button>
			</header>

			<main className={style.main}>
				<div className={style.chatMessages}>
					{messages.map((message, index) => (
						<div key={index} className={style.message}>
							<img src="/src/assets/icon.png" alt="" />
							<p>{message.user}:</p>
							<p>{message.text}</p>
						</div>
					))}
				</div>

				<div className={style.chatInput}>
					<input
						type="text"
						id="inputMessage"
						placeholder="Digite sua Mensagem"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								HandleInput();
							}
						}}
					/>
					<button type="button" onClick={HandleInput}>
						Enviar
					</button>
				</div>
			</main>

			<footer className={style.footer}>
				<p>Created by @0x69657a61</p>
			</footer>
		</div>
	);
}
