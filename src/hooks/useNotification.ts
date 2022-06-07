import { useContext } from "react";
import { NotificationContext } from "../contexts/Notification";

export const useNotification = () => {
	const context = useContext(NotificationContext);

	const addNotification = context.addNotification;

	return { addNotification };
};
