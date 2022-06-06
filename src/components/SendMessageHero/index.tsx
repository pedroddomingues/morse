interface iProps {
	type?: string;
	handleSendMessage: () => void;
}

const SendMessageHero = ({ type, handleSendMessage }: iProps) => {
	let className;
	if (type === "md")
		className =
			"md:flex-auto bg-base-300 md:flex md:min-h-full flex-col items-center justify-center hidden py-6";
	else
		className =
			"flex-auto max-h-24 bg-base-300 flex flex-col items-center justify-center md:hidden";
	return (
		<div className={className}>
			<h3 className="text-xl mb-2 md:mb-4 text-center">
				Send this message to your friend:
			</h3>
			<button
				onClick={handleSendMessage}
				className="btn btn-secondary btn-sm"
			>
				send
			</button>
		</div>
	);
};

export default SendMessageHero;
