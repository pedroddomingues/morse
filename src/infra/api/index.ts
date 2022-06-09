import axios from "axios";

export const nextApi = axios.create({
	baseURL: `${process.env.HOST}/api`,
	headers: { "Content-Type": "application/json" },
});
