"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

export default function Page() {
	const searchParams = useSearchParams();
	const called = useRef(false);
	const code = searchParams.get("code");
	// const state = searchParams.get("state");

	useEffect(() => {
		(async () => {
			try {
				if (called.current) return;
				called.current = true;
				if (code) {
					const response = await fetch(
						"http://localhost:8000/api/v1/auth/google/callback",
						{
							method: "POST",
							credentials: "include",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								code: code,
							}),
						},
					);
					console.log(response);
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, [code]);

	return <div>Redirecting...</div>;
}
