import cn from "classnames";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import LayoutWithHeaderAndFooter from "../../components/LayoutWithHeaderAndFooter";
import { TypePhase, useTypedAnimation } from "../../hooks/useTypingAnimation";
import { nextApi } from "../../infra/api";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const messageURL = context.params?.messageURL as string;
	const message = await nextApi.get(`/messages/${messageURL}`);
	return {
		props: {
			message: message.data,
		},
	};
};

const Message: NextPage = ({ message }) => {
	const [toggleMessageEncoding, setToggleMessageEncoding] = useState(false);
	const { phase, selectedString, typedAnimation } = useTypedAnimation(
		[message.encoded, message.decoded],
		toggleMessageEncoding,
		setToggleMessageEncoding
	);
	return (
		<LayoutWithHeaderAndFooter>
			<div className="flex flex-col min-h-[calc(100vh-7rem-4px)] md:min-h-[calc(100vh-15rem)] items-center px-8 md:px-16">
				<h1 className="text-3xl md:text-6xl bold mt-8 md:mt-16 text-center">
					{message.user.name
						? `${message.user.name.split(" ")[0]} `
						: "Someone "}
					sent you a message:
				</h1>
				<div className="py-10 min-h-[8rem] md:min-h-[12rem] flex items-center">
					<span
						className={cn(
							"text-accent text-lg md:text-2xl text-justify align-middle tracking-wider leading-relaxed lowercase",
							{
								["end-cursor"]: phase !== TypePhase.Deleting,
								["blinking"]: phase === TypePhase.Pausing,
							}
						)}
						aria-label={selectedString}
					>
						{typedAnimation}
					</span>
				</div>
				<button
					className="btn btn-accent"
					onClick={() => setToggleMessageEncoding(true)}
				>
					{selectedString === message.encoded
						? "Show decoded message!"
						: "Show encoded message!"}
				</button>
			</div>
		</LayoutWithHeaderAndFooter>
	);
};

export default Message;
