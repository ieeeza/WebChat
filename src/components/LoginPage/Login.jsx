import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import style from "./Login.module.css";

export default function Login() {
	const navigate = useNavigate();

	const [text, setText] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function getUsers() {
		try {
			const response = await api.get(`/Users`, {
				params: {
					email: email,
					password: password,
				},
			});
			return response;
		} catch (error) {
			if (error.response && error.response.status === 404) {
				return error.response;
			}
		}
	}

	async function HandleLogin() {
		if (email == "" || password == "") {
			setText("Preencha todos os campos acima!");
			return;
		}

		const response = await getUsers();

		if (response.status === 200) {
			navigate("/chat", {
				state: {
					username: response.data.username,
					email: response.data.email,
				},
			});
		} else {
			setText("Usuário não cadastrado!");
		}
	}

	return (
		<div className={style.body}>
			<main className={style.main}>
				<p className={style.titleText}>ENTRAR</p>
				<div className={style.form}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className={style.textError}>{text}</p>
					<button type="button" onClick={HandleLogin}>
						ENTRAR
					</button>
					<Link to="/cadastro" className={style.link}>
						<button type="button">CADASTRAR</button>
					</Link>
				</div>
			</main>
			<footer className={style.footer}>
				<p>Created by @0x69657a61</p>
			</footer>
		</div>
	);
}
