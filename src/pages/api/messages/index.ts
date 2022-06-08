import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../infra/database/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const messages = await prisma.message.findMany({
			include: {
				user: { select: { id: true, name: true, image: true } },
			},
		});

		if (messages) return res.status(200).json(messages);
		else {
			return res.status(500).json({
				error: "Internal server error",
			});
		}
	} else if (req.method === "POST") {
		const { encoded, decoded, userEmail } = req.body;

		const user = await prisma.user.findFirst({
			where: { email: userEmail },
		});

		if (!user)
			return res.status(403).json({
				error: "User not found",
			});

		const message = await prisma.message.create({
			data: {
				userId: user.id,
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
