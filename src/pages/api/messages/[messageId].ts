import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../infra/database/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const messageId = req.query.messageId as string;
		const message = await prisma.message.findFirst({
			where: {
				id: messageId,
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
	} else if (req.method === "POST") {
		const { userId, encoded, decoded } = req.body;

		const message = await prisma.message.create({
			data: {
				userId,
				encoded,
				decoded,
			},
		});

		if (message) return res.status(201).json(message);
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
