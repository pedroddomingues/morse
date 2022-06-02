import type { NextApiRequest, NextApiResponse } from "next";
import { encode } from "morse-converter";

type ResponseData = {
	encoded_message: string;
};

type ResponseError = {
	error_message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData | ResponseError>
) {
	if (req.method == "POST") {
		const { message } = req.body;
		if (!message)
			return res
				.status(403)
				.send({ error_message: "No message provided." });
		const encoded_message = encode(message);
		return res.status(200).send({ encoded_message });
	} else if (req.method == "GET") {
		const { message } = req.query;
		if (!message)
			return res
				.status(403)
				.send({ error_message: "No message provided." });
		const encoded_message = encode(message as string);
		return res.status(200).send({ encoded_message });
	} else
		return res.status(400).send({
			error_message:
				"Method invalid. Only accepts POST with JSON body with message or GET with message as query params.",
		});
}
