import { getUser } from "@/features/auth/authApis";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

function AuthLayout() {
	const { data: user ,isPending} = useQuery({
		queryKey: ["userData"],
		queryFn: getUser,
	});
	if (isPending) {
		return (
			<div className="w-full h-[59vh] flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/sign-in" replace />;
	}
	return (
		<div>
			<Outlet />
		</div>
	);
}

export default AuthLayout;
