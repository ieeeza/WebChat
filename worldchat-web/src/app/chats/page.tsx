"use client";

import { useRouter } from "next/navigation";
import createSignalRConnection from "@/lib/SignalrConnection";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";

type ChatMessage = {
  sender: string;
  text: string;
};

type Usuario = {
  id: string;
  nome: string;
};

export default function Chats() {
  const router = useRouter();

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [usuariosConnectados, setUsuariosConectados] = useState<Usuario[]>([]);

  function handleSair() {
    router.push("/login");
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      router.push("/login");
      return;
    }

    const newConnection = createSignalRConnection(
      jwtToken,
      (user: string, message: string) => {
        setChatLog((prev) => [...prev, { sender: user, text: message }]);
      }
    );

    newConnection
      .start()
      .then(() => {
        console.log("Conectado ao chat!");
        setConnection(newConnection);
      })
      .catch((err) => console.error("Erro na conexão:", err));

    return () => {
      newConnection.stop();
    };
  }, [router]);

  const handleSendMessage = async () => {
    if (connection && inputText.trim() !== "") {
      try {
        await connection.invoke("SendMessage", inputText);
        setInputText("");
      } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
      }
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.logo}>WORLD CHAT</p>
          <button
            title="sair"
            type="button"
            onClick={handleSair}
            className={styles.sairButton}
          >
            Sair
          </button>
        </div>
        <main className={styles.main}>
          <div className={styles.sideLeftBar}>
            <div className={styles.topSendersContainer}>
              <p>Top Senders</p>
              <p>Most active users in the chat</p>
            </div>
            <div className={styles.topSenders}>
              <div className={styles.topSendersListProfile}>
                <p>User</p>
                <p>-</p>
                <p>Total Messages Sent</p>
              </div>
              {/* Aqui você pode mapear os top senders */}
            </div>
          </div>
          <div className={styles.middleBar}>
            <p className={styles.middleBarTittle}>Chat Messages</p>
            <div className={styles.chatMessages}>
              {chatLog.map((msg, index) => (
                <p key={index} className={styles.chatMessagesReceived}>
                  {msg.sender}: {msg.text}
                </p>
              ))}
            </div>
            <div className={styles.textInputContainer}>
              <input
                type="text"
                placeholder="Digite sua mensagem"
                className={styles.inputText}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className={styles.sendButton}
                type="button"
                onClick={handleSendMessage}
              >
                ENVIAR
              </button>
            </div>
          </div>
          <div className={styles.rightBar}>
            <p className={styles.rightBarTitle}>Online Users</p>
            <div className={styles.onlineUsers}>
              {usuariosConnectados.map((usuario) => (
                <p key={usuario.id} className={styles.onlineUser}>
                  {usuario.nome}
                </p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
