import Image from "next/image";

interface iAvatarProps {
	alt: string;
	src?: string | null;
	size: number;
}

const Avatar = ({ alt, src, size }: iAvatarProps) => {
	return (
		<div className="avatar">
			<div className={`w-${size} rounded-full`}>
				<Image
					src={src || "/chrono1.jpg"}
					alt={alt}
					width={size * 4}
					height={size * 4}
				/>
			</div>
		</div>
	);
};

export default Avatar;
