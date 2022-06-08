import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { NotificationProvider } from "../contexts/Notification";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	const session: Session = pageProps.session;
	return (
		<NotificationProvider>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</NotificationProvider>
	);
}
