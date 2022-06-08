import { createContext, PropsWithChildren, useCallback, useState } from "react";

export interface iNotification {
	message: string;
	type?: string;
}

interface iNotificationContext {
	addNotification: (notification: iNotification) => void;
}

export const NotificationContext = createContext<iNotificationContext>({
	addNotification: (notification: iNotification) => {
		notification;
	},
});

function icon(notification: iNotification) {
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

//TODO: implement animation
export const NotificationProvider = ({
	children,
}: PropsWithChildren<JSX.IntrinsicAttributes>) => {
	const [notifications, setNotifications] = useState<iNotification[]>([]);

	const addNotification = useCallback(
		(notification: iNotification) => {
			setNotifications([...notifications, notification]);
			setTimeout(
				() =>
					setNotifications((notifications) => notifications.slice(1)),
				2500
			);
		},
		[notifications, setNotifications]
	);

	return (
		<NotificationContext.Provider value={{ addNotification }}>
			<div className="absolute top-0 left-1/4 md:left-1/3 md:w-1/3 w-1/2 z-50">
				{/*THIS FOUR ALERTS ARE HERE TO LOAD ALL THE ALERT-* CSS*/}
				<div className="alert-info hidden"></div>
				<div className="alert-success hidden"></div>
				<div className="alert-warning hidden"></div>
				<div className="alert-error hidden"></div>
				{notifications.map((notification, i) => (
					<div
						key={i}
						// className={`alert alert-warning mt-2 max-h-12 shadow-lg text-sm md:text-base justify-center`}
						className={`alert alert-${notification.type} mt-2 max-h-12 shadow-lg text-sm md:text-base justify-center`}
					>
						<div>
							{icon(notification)}
							<span>{notification?.message}</span>
						</div>
					</div>
				))}
			</div>
			{children}
		</NotificationContext.Provider>
	);
};
