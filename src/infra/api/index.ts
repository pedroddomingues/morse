import axios from "axios";

export const nextApi = axios.create({
	baseURL: `https://morse.pedroddomingues.dev/api`,
	headers: { "Content-Type": "application/json" },
});
