"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();

  function handleLogin() {
    router.push("/chats");
  }

  function handleVoltar() {
    router.push("/");
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login to WorldChat</h1>
        <p className={styles.description}>
          Entre na sua conta e comece a conversar com o mundo.
        </p>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input}
            required
          />
          <div className={styles.buttons}>
            <button
              type="button"
              title="entrar"
              onClick={handleLogin}
              className={styles.button}
            >
              <p>Entrar</p>
            </button>
            <button
              title="voltar"
              type="button"
              onClick={handleVoltar}
              className={styles.button}
            >
              <p>Voltar</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
