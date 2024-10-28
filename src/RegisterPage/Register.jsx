import { useState } from "react";
import api from "../services/api";
import style from "./Register.module.css";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [email2, setEmail2] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [phonenumber, setPhonenumber] = useState("");
	const [text, setText] = useState("");

	async function getUsers() {
		try {
			const response = await api.get(`/Users/`, {
				params: {
					email: email,
				},
			});

			return response;
		} catch (error) {
			if (error.response && error.response.status === 404) {
				return error.response;
			}
		}
	}

	async function postUsers() {
		await api.post("/Users", {
			username: username,
			email: email,
			password: password,
			phonenumber: phonenumber,
		});
	}

	async function HandleRegister() {
		if (
			username == "" ||
			email == "" ||
			email2 == "" ||
			password == "" ||
			password2 == "" ||
			phonenumber == ""
		) {
			setText("Preencha todos os campos acima!");
		} else if (email != email2) {
			setText("Campo email divergente!");
		} else if (password != password2) {
			setText("Campo senha divergente!");
		}

		const response = await getUsers();

		if (response && response.status === 200) {
			setText("Usuário já cadastrado");
		} else if (response && response.status === 404) {
			await postUsers();
			console.log("rodou");
		} else {
			setText("Erro inesperado!");
		}
   }

	return (
		<div className={style.body}>
			<header className="header">
				<p>REGISTER</p>
			</header>
			<main>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Confirme o Email"
					value={email2}
					onChange={(e) => setEmail2(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Confirme a senha"
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Número de celular"
					value={phonenumber}
					onChange={(e) => setPhonenumber(e.target.value)}
				/>
				<p>{text}</p>
				<button type="button" onClick={HandleRegister}>
					REGISTRAR
				</button>
			</main>
		</div>
	);
}
