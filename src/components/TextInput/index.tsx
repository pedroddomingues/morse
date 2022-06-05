const TextInput = ({ title, placeholder, value, onChange }) => {
	return (
		<div className="flex flex-col justify-center items-center px-10 md:px-16 w-full md:min-h-3/4">
			<h3 className="font-bold text-lg md:text-2xl pb-4 md:pb-8 w-full text-center md:pt-6">
				{title}
			</h3>
			<textarea
				className="textarea textarea-primary h-32 max-h-40 md:max-h-80 text-sm md:text-lg w-full flex-auto md:mb-10"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	);
};

export default TextInput;
