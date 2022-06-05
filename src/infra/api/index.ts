import axios from "axios";

export const nextApi = axios.create({
	baseURL: "http://localhost:3000/api",
	timeout: 1000,
	headers: { "Content-Type": "application/json" },
});
