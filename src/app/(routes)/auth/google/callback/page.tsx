"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
	const searchParams = useSearchParams();

	const hd = searchParams.get('hd');
	console.log('hd', hd);

	const code = searchParams.get('code');
	console.log('code', code);

	return (
		<div>
			<p>Redirecting...</p>
		</div>
	);
}
