import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import fortyTwoLogo from "../../../public/42_Logo.svg";

const LoginModal = () => {
	return (
		<>
			<input type="checkbox" id="loginModal" className="modal-toggle" />
			<label
				htmlFor="loginModal"
				className="modal cursor-pointer modal-bottom sm:modal-middle max-h-screen"
			>
				<label className="modal-box relative">
					<h3 className="text-lg font-bold">Welcome!</h3>
					<form className="form-control mt-8">
						<input
							type="email"
							placeholder="Email"
							className="input input-bordered focus:outline-none w-full"
						/>
						<input
							type="current-password"
							placeholder="Password"
							className="input input-bordered focus:outline-none w-full mt-4"
						/>
						<button className="btn w-full mt-6">Sign In</button>
					</form>
					<div className="divider"></div>
					<div className="flex items-center justify-around min-h-16">
						<button
							onClick={() => signIn("github")}
							className="w-12 h-12 md:w-24 md:h-24 btn btn-ghost border-primary-content border-[1px] p-1 flex items-center justify-center"
						>
							<FaGithub className="w-8 h-8 md:w-12 md:h-12" />
						</button>
						<button className="w-12 h-12 md:w-24 md:h-24 btn btn-ghost border-primary-content border-[1px] p-1 flex items-center justify-center">
							<Image
								src={fortyTwoLogo}
								className="w-8 h-8 md:w-12 md:h-12"
								alt="42 logo"
							/>
						</button>
					</div>
				</label>
			</label>
		</>
	);
};

export default LoginModal;
