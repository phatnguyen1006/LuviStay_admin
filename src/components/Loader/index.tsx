import React from "react";
import "./styles.scss";

const Loader: React.FC = () => {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<svg className="loader-svg" viewBox="0 0 50 50">
				<circle className="ring" cx="25" cy="25" r="20"></circle>
				<circle className="ball" cx="25" cy="5" r="3.5"></circle>
			</svg>
		</div>
	);
};

export default Loader;