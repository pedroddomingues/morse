import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { NotificationProvider } from "../contexts/Notification";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NotificationProvider>
			<SessionProvider session={pageProps.session}>
				<Component {...pageProps} />
			</SessionProvider>
		</NotificationProvider>
	);
}
