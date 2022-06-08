const Footer = () => {
	return (
		<footer className="flex flex-col items-center justify-center text-center text-base bg-transparent min-h-12">
			<p>
				Made with{" "}
				<span role="img" aria-label="heart">
					❤️
				</span>{" "}
				by{" "}
				<a
					href="https://github.com/pedroddomingues"
					target="_blank"
					rel="noopener noreferrer"
				>
					@pedroddomingues
				</a>
			</p>
		</footer>
	);
};

export default Footer;
