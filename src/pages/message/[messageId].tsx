import { GetServerSideProps, NextPage } from "next";
import { nextApi } from "../../infra/api";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const messageId = context.params?.messageId as string;
	const message = await nextApi.get(`/message/${messageId}`);
	return {
		props: {
			message: message.data,
		},
	};
};

const Message: NextPage = ({ message }) => {
	return (
		<div>
			<h1>Message from {message?.userId}</h1>
			<p>{message?.decoded}</p>
			<p>{message?.encoded}</p>
		</div>
	);
};

export default Message;
