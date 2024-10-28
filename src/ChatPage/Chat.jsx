import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000");

export default function Chat() {

   useEffect(() => {
      socket.on("receiveMessage", (message) => {
         setMessages((prevMessages) => [...prevMessages, message]);
      });

      return() => {
         socket.off("receiveMessage");
      };
   }, []);

	const [username, setUsername] = useState("ieza");
	const [chatUser, setChatUser] = useState("");
	const [inputMessage, setInputMessage] = useState("");
	const [messages, setMessages] = useState([]);

	function HandleInput() {
      if (inputMessage.trim() !== "") {
         const message = {
            user: username,
            text: inputMessage
         };
         console.log(message);
         socket.emit("sendMessage", message);
         setInputMessage("");
      };
	};

	return (
		<>
			<header>
				<div>
					<img
						className="profilePicture"
						src="/src/assets/icon.png"
						alt="Profile Picture"
					/>
					<p>{username}</p>
				</div>
				<p className="chatName">Conversando com {chatUser}</p>
				<button type="button">Sair do chat</button>
			</header>

			<main>
				<div className="chatMessages">
					{messages.map((message, index) => (
						<div key={index} className="message">
							<img src="/src/assets/icon.png" alt="" />
							<p>{message.user}:</p>
							<p>{message.text}</p>
						</div>
					))}
				</div>

				<div className="chatInput">
					<input
						type="text"
						id="inputMessage"
						placeholder="Digite sua Mensagem"
                  value={inputMessage}
						onChange={e => setInputMessage(e.target.value)}
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
