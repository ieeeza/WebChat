"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import endpoints from "@/api/apiRoutes";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  async function fetchLogin() {
    return await fetch(endpoints.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  }

  async function handleLogin() {
    const response = await fetchLogin();
    const jwtToken = await response.json();
    
    console.log(jwtToken);

    localStorage.setItem("token", jwtToken.dados.password);

    if (!response.ok) {
      alert("Login failed. Please check your credentials.");
    } else {
      router.push("/chats");
    }
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
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
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
