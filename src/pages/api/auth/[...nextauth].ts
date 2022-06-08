// import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../infra/database/prisma";

let FORTY_TWO_CLIENT_ID = process.env.FORTY_TWO_CLIENT_ID;
let FORTY_TWO_CLIENT_SECRET = process.env.FORTY_TWO_CLIENT_SECRET;

if (FORTY_TWO_CLIENT_ID === undefined) FORTY_TWO_CLIENT_ID = "";

if (FORTY_TWO_CLIENT_SECRET === undefined) FORTY_TWO_CLIENT_SECRET = "";

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		FortyTwoProvider({
			clientId: FORTY_TWO_CLIENT_ID,
			clientSecret: FORTY_TWO_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, user }) {
			session = {
				...session,
				user: {
					id: user.id,
					...session.user,
				},
			};
			return session;
		},
	},
});
