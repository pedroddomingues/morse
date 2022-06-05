import { useContext } from "react";
import { NotificationContext } from "../contexts/Notification";

export const useNotification = () => {
	const { showNotification } = useContext(NotificationContext);

	return { showNotification };
};
