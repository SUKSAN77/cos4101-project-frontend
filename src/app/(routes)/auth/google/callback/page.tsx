"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const called = useRef(false);
    const code = searchParams.get("code");
    // const state = searchParams.get("state");

    useEffect(() => {
        const handleCallback = async () => {
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
                    if (response.ok) {
                        router.push("/dashboard");
                    } else {
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        handleCallback();
    }, [code, router]);

    return <div>Redirecting...</div>;
}
