import { createContext, PropsWithChildren, useState } from "react";

interface iNotification {
	message: string;
	type?: string;
	visible: boolean;
}

const defaultNotification: iNotification = {
	message: "",
	type: "success",
	visible: false,
};

interface iNotificationContext {
	showNotification: (notification: iNotification) => void;
}

export const NotificationContext = createContext<iNotificationContext | null>(
	null
);

export const NotificationProvider = ({ children }: PropsWithChildren<null>) => {
	const [notification, setNotification] =
		useState<iNotification>(defaultNotification);

	const [animation, setAnimation] = useState(
		"transition-transform ease-in-out duration-1000 -translate-y-[5.5rem]"
	);

	function animate() {
		setAnimation(
			`alert-${notification?.type} transition-transform ease-in-out duration-1000 translate-y-[5.5rem]`
		);
		setTimeout(
			() =>
				setAnimation(
					`alert-${notification?.type} transition-transform ease-in-out duration-1000 -translate-y-[5.5rem]`
				),
			2000
		);
		setTimeout(() => setAnimation(""), 2500);
	}

	function showNotification(notification: iNotification) {
		setNotification(notification);
		animate();
	}

	function icon() {
		switch (notification?.type) {
			case "success":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
			case "warning":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				);
			case "error":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
			default:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info flex-shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				);
		}
	}

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			<div
				className={`alert shadow-lg max-h-12 md:w-1/2 w-3/4 text-xs md:text-sm absolute left-[12.5%] md:left-1/4 -top-20 z-50 ${animation}`}
				// className="absolute top-28 overflow-hidden"
			>
				<div>
					{icon()}
					<span>{notification?.message}</span>
				</div>
			</div>
			{children}
		</NotificationContext.Provider>
	);
};
