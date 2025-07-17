"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Chats() {
  const router = useRouter();

  function handleSair() {
    router.push("/login");
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
            <p>Chat Messages</p>
            <div className={styles.chatMessages}>
              
              <p>User1: Hello!</p>
              <p>User2: Hi there!</p>
            </div>
            <div className={styles.text}>
              <input
                type="text"
                placeholder="Digite sua mensagem"
                className={styles.inputText}
              />
              <button type="submit" className={styles.sendButton}>
                Enviar
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
