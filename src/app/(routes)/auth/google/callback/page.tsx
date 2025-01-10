"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
	const searchParams = useSearchParams();

	return <pre>{JSON.stringify(Object.fromEntries(searchParams), null, 2)}</pre>;
}
