import React, { Suspense } from "react";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	BrowserRouter as Router, Navigate, Route, Routes, useLocation
} from "react-router-dom";

const AdminPage = React.lazy(() => import("pages/admin/index"));
// const SignInPage = React.lazy(() => import("pages/sign-in/index"));

// components
import { Loader } from "components/Loader";

// Routes
import { APP_ROUTE, ADMIN_ROUTE } from "./routes.const";

export default function AppRoutes(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route>
                    <Route path="/" element={
							<Navigate to={APP_ROUTE.ADMIN} />
						} />
						<Route path={APP_ROUTE.SIGN_IN} element={<SignInPage />}/>
						<Route path={`${APP_ROUTE.ADMIN}/*`} element={
							// <RequireAuth>
							// 	<div>
							// 		<AdminPage />
							// 	</div>
							// </RequireAuth>
                            null
						}/>
						<Route path="*" element={<NotFoundPage />}/>
                    </Route>
                </Routes>
            </Router>
        </Suspense>
    );
}

function RequireAuth({ children }: { children: JSX.Element }) {
	const location = useLocation();


	const isLoggedIn = useSelector(
		(state: AppRootState) => state.rootReducer.adminAuthThunk.isLoggedIn,
	);

	console.log(isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to={APP_ROUTE.SIGN_IN} state={{ from: location }} />;
	} 
	return children;
}