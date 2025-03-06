"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { AuthService } from "@/client";

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
                    const { response } =
                        await AuthService.postApiV1AuthGoogleCallback({
                            body: { code: code },
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                        });
                    if (response.ok) {
                        router.push("/dashboard");
                    }
                    console.log(response);
                }
            } catch (err) {
                console.error(err);
            }
        };
        handleCallback();
    }, [code, router]);

    return <div>Redirecting...</div>;
}
