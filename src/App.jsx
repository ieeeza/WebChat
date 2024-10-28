import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./RegisterPage/Register";
import Chat from "./ChatPage/Chat";

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Register />} />
					<Route path="/cadastro" element={<Register />} />
					<Route path="/Chat" element={<Chat />} />
				</Routes>
			</Router>
		</>
	);
}
