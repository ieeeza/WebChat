import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import style from "./Chat.module.css";

const socket = io("http://localhost:5000");

export default function Chat() {
   const navigate = useNavigate();
   const location = useLocation();

   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [id, setId] = useState(socket.id);
   const [inputMessage, setInputMessage] = useState("");
   const [myMessages, setMyMessages] = useState([]);
   const [othersMessages, setOthersMessages] = useState([]);
   const [userColors, setUserColors] = useState({});

   function getRandomUserColor() {
      const colors = [
         "#1ec94c", //verde claro
         "#b0c91e", //amarelo claro
         "#de8526", //laranja claro
         "#3050db", //azul claro
         "#d73ce8", //rosa claro
         "#e02d2d", //vermelho claro
         "#2de0da", //ciano
      ];
      return colors[Math.floor(Math.random() * colors.length)];
   }

   const allMessages = useMemo(() => {
      return [...myMessages, ...othersMessages].sort(
         (a, b) => a.timeStamp - b.timeStamp
      );
   }, [myMessages, othersMessages]);

   const endOfMessagesRef = useRef(null);

   useEffect(() => {
      socket.on("connect", () => setId(socket.id));
   }, []);

   useEffect(() => {
      setUsername(location.state?.username);
      setEmail(location.state?.email);

      if (
         location.state?.username === null ||
         location.state?.username === undefined ||
         location.state?.email === null ||
         location.state?.email === undefined
      ) {
         alert("Você precisa estar autenticado para acessar essa pagina!");
         navigate("/login");
         return;
      }
   }, [
      location.state?.username,
      location.state?.email,
      navigate
   ]);

   useEffect(() => {
      socket.on("receiveMessage", (message) => {
         if (id === message.id) {
            setMyMessages((prevMyMessages) => [...prevMyMessages, message]);
         } else {
            setOthersMessages((prevOthersMessages) => [
               ...prevOthersMessages,
               message,
            ]);
         }

         setUserColors((prevColors) => {
            if (!prevColors[message.id]) {
               return {
                  ...prevColors,
                  [message.id]: getRandomUserColor(),
               };
            }
            return prevColors;
         });
      });

      return () => {
         socket.off("receiveMessage");
      };
   }, [id]);

   useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [allMessages]);

   function HandleInput() {
      if (inputMessage.trim() !== "") {
         const message = {
            id: id,
            timeStamp: Date.now(),
            text: inputMessage,
            user: username,
         };
         socket.emit("sendMessage", message);
         setInputMessage("");
      }
   }

   function HandleLogoff() {
      setUsername("");
      setEmail("");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      window.history.replaceState(null, null, "/login");
      navigate("/login");
   }

   return (
      <div className={style.body}>
         <header className={style.header}>
            <div>
               <img src="/src/assets/icon.png" alt="Profile Picture" />
               <p>{username}</p>
            </div>
            <p>Conversa livre</p>
            <button type="button" onClick={HandleLogoff}>
               Sair do chat
            </button>
         </header>

         <main className={style.main}>
            <div className={style.divChat}>
               <div className={style.divChat}>
                  {allMessages.map((message, index) => (
                     <div
                        key={index}
                        className={
                           socket.id === message.id
                              ? style.chatMessages
                              : style.chatOthersMessages
                        }
                     >
                        <p
                           style={{
                              color:
                                 socket.id === message.id
                                    ? "#00FF00"
                                    : userColors[message.id],
                           }}
                        >
                           {message.user}
                        </p>
                        <p>{message.text}</p>
                     </div>
                  ))}
                  <div ref={endOfMessagesRef} />
               </div>
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
                        console.log(email);
                        console.log(username);
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
