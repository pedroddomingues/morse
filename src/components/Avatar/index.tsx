import Image from "next/image";

const Avatar = ({ alt, src, size }) => {
	return (
		<div className="avatar">
			<div className={`w-${size} rounded-full`}>
				<Image src={src} alt={alt} width={size * 4} height={size * 4} />
			</div>
		</div>
	);
};

export default Avatar;
