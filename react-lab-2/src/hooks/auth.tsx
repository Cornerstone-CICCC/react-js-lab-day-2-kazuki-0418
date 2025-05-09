// src/hooks/useAuthManager.ts
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// 認証状態のキャッシュ時間 (5分)

interface AuthState {
	isAuthenticated: boolean | null;
	lastChecked: number;
}

// アプリケーション全体で共有する認証状態
let authState: AuthState = {
	isAuthenticated: null,
	lastChecked: 0,
};

export const useAuthManager = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		authState.isAuthenticated,
	);
	const [isLoading, setIsLoading] = useState<boolean>(
		authState.isAuthenticated === null,
	);
	const location = useLocation();

	const checkAuth = useCallback(async (force = false) => {
		const now = Date.now();

		// キャッシュが有効であれば使用
		if (!force && authState.isAuthenticated !== null) {
			setIsAuthenticated(authState.isAuthenticated);
			setIsLoading(false);
			return authState.isAuthenticated;
		}

		// 認証状態を再確認
		setIsLoading(true);
		try {
			const status = sessionStorage.getItem("isAuthenticated");

			if (status === "true") {
				authState = { isAuthenticated: true, lastChecked: now };
				setIsAuthenticated(true);
			} else if (status === "false" || status === null) {
				authState = { isAuthenticated: false, lastChecked: now };
				setIsAuthenticated(false);
			}

			// グローバル状態と内部状態を更新

			return status;
		} catch (error) {
			console.error("認証確認エラー:", error);
			authState = { isAuthenticated: false, lastChecked: now };
			setIsAuthenticated(false);
			return false;
		} finally {
			setIsLoading(false);
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const init = async () => {
			if (isAuthenticated === false && window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		};
		if (location.pathname === "/login") {
			setIsLoading(false);
			if (authState.isAuthenticated === true) {
				window.location.href = "/";
			}

			return;
		}
		init();
	}, [isAuthenticated, location.pathname]);

	const login = () => {
		setIsAuthenticated(true);
	};

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		sessionStorage.removeItem("isAuthenticated");
		sessionStorage.removeItem("nickname");
		authState = { isAuthenticated: false, lastChecked: 0 };
		setIsLoading(false);
		window.location.href = "/login";
	}, []);

	return {
		isAuthenticated,
		isLoading,
		checkAuth,
		login,
		logout,
	};
};
