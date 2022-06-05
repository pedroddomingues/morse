import { decode, encode } from "morse-converter";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SendMessageHero from "../components/SendMessageHero";
import TextInput from "../components/TextInput";
import { useNotification } from "../hooks/useNotification";
import { nextApi } from "../infra/api";

const Home: NextPage = () => {
	const { data: session } = useSession();
	const [decodedText, setDecodedText] = useState("");
	const [encodedText, setEncodedText] = useState("");
	const { notification } = useNotification();

	useEffect(() => {
		decodedText !== ""
			? setEncodedText(encode(decodedText))
			: setEncodedText("");
	}, [decodedText]);

	useEffect(() => {
		encodedText !== ""
			? setDecodedText(decode(encodedText))
			: setDecodedText("");
	}, [encodedText]);

	async function handleSendMessage() {
		if (session && decodedText != "") {
			const response = await nextApi.post("/messages", {
				encoded: encodedText,
				decoded: decodedText,
				userId: session.user?.id,
			});
		}
	}
	return (
		<div className="flex flex-col max-h-screen min-h-screen">
			<Header />
			<div className="flex flex-col md:flex-row md:min-h-[calc(100vh-12rem)] min-h-[calc(100vh-4rem-4px)]">
				<div className="bg-base-100 flex-1 flex items-center justify-center">
					<TextInput
						placeholder="Write your message to be encoded!"
						title={"Decoded Message"}
						value={decodedText}
						onChange={(e) => setDecodedText(e.target.value)}
					/>
				</div>
				<SendMessageHero handleSendMessage={handleSendMessage} />
				<div className="bg-base-100 flex-1 flex items-center justify-center">
					<TextInput
						placeholder="Here is your encoded message!"
						title={"Encoded Message"}
						value={encodedText}
						onChange={(e) => setEncodedText(e.target.value)}
					/>
				</div>
			</div>
			<SendMessageHero type="md" handleSendMessage={handleSendMessage} />
		</div>
	);
};

export default Home;
