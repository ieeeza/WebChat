import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import style from "./Register.module.css";

export default function Register() {
   const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [email2, setEmail2] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [phoneNumber, setPhonenumber] = useState("");
	const [text, setText] = useState("");

	async function getUsers() {
		try {
			const response = await api.get(`/Users/`, {
				params: {
               email: email,
               phoneNumber: phoneNumber,
				},
			});
         console.log(response);
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
			phoneNumber: phoneNumber,
		});
	}

	async function HandleRegister() {
		if (
			username == "" ||
			email == "" ||
			email2 == "" ||
			password == "" ||
			password2 == "" ||
			phoneNumber == ""
		) {
			setText("Preencha todos os campos acima!");
			return;
		} else if (email != email2) {
			setText("Campo email divergente!");
			return;
		} else if (password != password2) {
			setText("Campo senha divergente!");
			return;
		}

		const response = await getUsers();

		if (response && response.status === 200) {
			setText("Usuário já cadastrado");
		} else if (response && response.status === 404) {
			await postUsers();
			alert("Cadastrado com sucesso!")
         navigate("/login");
		} else {
			setText("Erro inesperado!, caso persista entre em contato comigo!");
		}
	}

	return (
		<div className={style.body}>
			<main className={style.main}>
				<p className={style.titleText}>CADASTRAR</p>
				<div className={style.form}>
					<input
						type="text"
						placeholder="Nome de Usuário"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Confirme o Email"
						value={email2}
						onChange={(e) => setEmail2(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Confirme a senha"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Número de celular"
						value={phoneNumber}
						onChange={(e) => setPhonenumber(e.target.value)}
					/>
					<p className={style.textError}>{text}</p>
					<button type="button" onClick={HandleRegister}>
						REALIZAR CADASTRO
					</button>
					<Link to="/login" className={style.link}>
						<button type="button">VOLTAR</button>
					</Link>
				</div>
			</main>
			<footer className={style.footer}>
				<p>Created by @0x69657a61</p>
			</footer>
		</div>
	);
}
