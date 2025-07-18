"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

type User = string;

type Message = {
  id: string;
  sender: string;
  text: string;
};

export default function Chats() {
  const router = useRouter();

  const [user, setUser] = useState<User>("")
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function handleSair() {
    router.push("/login");
  }

  function handleSendMessage() {
    if (inputText.trim() === "") {
      return;
    }

    setUser("César");

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: user,
      text: inputText,
    };
    setMessages([...messages, newMessage]);
  }

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
            </div>
          </div>
          <div className={styles.middleBar}>
            <p className={styles.middleBarTittle}>Chat Messages</p>
            <div className={styles.chatMessages}>
              {messages.map((message) => (
                <p key={message.id} className={styles.chatMessagesReceived}>
                  {message.sender}: {message.text}
                </p>
              ))}

              <p className={styles.chatMessagesReceived}>User1: Hello!</p>
              <p className={styles.chatMessagesSender}>Hi there! :User2</p>
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
            <p>Online Users</p>
            <div className={styles.onlineUsers}>
              <p>User1</p>
              <p>User2</p>
              <p>User3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
