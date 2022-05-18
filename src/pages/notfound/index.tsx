import React, { ReactElement } from "react";
import "./styles.scss";


export default function NotFoundPage(): ReactElement {
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
            <img className="not-found-img" src="https://cdn.dribbble.com/users/215588/screenshots/909046/oops.png" />
		</div>
	);
}