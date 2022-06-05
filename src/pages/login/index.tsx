import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Header from "../../components/Header";

function handleSignIn(event) {
	event.preventDefault();
	signIn("github");
}

const Login: NextPage = () => {
	return (
		<>
			<Header />
			<h1 className="text-center text-red-600">Login</h1>
			<button onClick={handleSignIn}>Sign in</button>
		</>
	);
};

export default Login;
