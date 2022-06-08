import { decode, encode } from "morse-converter";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LayoutWithHeaderAndFooter from "../components/LayoutWithHeaderAndFooter";
import SendMessageHero from "../components/SendMessageHero";
import TextInput from "../components/TextInput";
import { nextApi } from "../infra/api";

const Home: NextPage = () => {
	const { data: session } = useSession();
	const [decodedText, setDecodedText] = useState("");
	const [encodedText, setEncodedText] = useState("");

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
				userEmail: session.user?.email,
			});
			console.log({ response });
		}
	}

	return (
		<LayoutWithHeaderAndFooter>
			<div className="flex flex-col md:flex-row min-h-[calc(100vh-7rem-4px)] md:min-h-[calc(100vh-15rem)]">
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
		</LayoutWithHeaderAndFooter>
	);
};

export default Home;
