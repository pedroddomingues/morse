import { PropsWithChildren } from "react";
import Footer from "../Footer";
import Header from "../Header";

const LayoutWithHeaderAndFooter = ({
	children,
}: PropsWithChildren<JSX.IntrinsicAttributes>) => {
	return (
		<div className="flex flex-col max-h-screen min-h-screen">
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default LayoutWithHeaderAndFooter;
