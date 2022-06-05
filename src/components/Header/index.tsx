import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useNotification } from "../../hooks/useNotification";
import Avatar from "../Avatar";
import LoginModal from "../LoginModal";

const Header = () => {
	const { data: session } = useSession();
	const { showNotification } = useNotification();

	function handleSignOut() {
		signOut();
	}

	return (
		<>
			<LoginModal />
			<div className="navbar bg-base-300 px-8">
				<div className="flex-1">
					<Link href="/">
						<a className="btn btn-ghost normal-case text-xl">
							Morse
						</a>
					</Link>
				</div>
				<div className="flex-none justify-center items-center">
					{session ? (
						<div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="btn btn-ghost btn-circle avatar"
							>
								<Avatar
									alt={`${session.user?.name}'s avatar`}
									src={session.user?.image}
									size={10}
								/>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<button
										onClick={() =>
											showNotification({
												type: "success",
												message: "test",
											})
										}
										className="justify-between"
									>
										Profile
										<span className="badge">beta</span>
									</button>
								</li>
								<li>
									<button
										onClick={() =>
											showNotification({
												type: "warning",
												message:
													"Function not implemented yet!",
											})
										}
										className="justify-between"
									>
										Settings
										<span className="badge">beta</span>
									</button>
								</li>
								<li>
									<button onClick={handleSignOut}>
										Logout
									</button>
								</li>
							</ul>
						</div>
					) : (
						<div className="flex-1">
							<label
								htmlFor="loginModal"
								className="btn btn-secondary modal-button normal-case text-l"
							>
								Sign In
							</label>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
