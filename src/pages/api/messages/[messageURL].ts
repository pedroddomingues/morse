import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../infra/database/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const messageURL = req.query.messageURL as string;
		const message = await prisma.message.findFirst({
			where: {
				url: messageURL,
			},
			include: {
				user: { select: { id: true, name: true, image: true } },
			},
		});

		if (message) return res.status(200).json(message);
		else {
			return res.status(500).json({
				error: "Internal server error",
			});
		}
	}
	return res.status(400).json({
		error: "Bad request",
	});
}
