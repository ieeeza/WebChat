import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Chat from "./components/ChatPage/Chat";

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cadastro" element={<Register />} />
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</Router>
		</>
	);
}
