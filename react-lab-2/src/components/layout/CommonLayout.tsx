import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthManager } from "../../hooks/auth";

export function MainLayout(): ReactNode {
	const { isAuthenticated, isLoading } = useAuthManager();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-[#292929]">
			<Outlet />
		</div>
	);
}
