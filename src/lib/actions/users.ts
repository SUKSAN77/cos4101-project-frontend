"use server";

import { cookies } from "next/headers";

// TODO: move User type to a shared location
export type User = {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
};

export async function getUser(): Promise<User> {
    const cookieStore = await cookies();
    const baseUrl = "http://localhost:8000";
    const response = await fetch(`${baseUrl}/api/v1/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            cookie: cookieStore.toString(),
        },
    });
    const data = await response.json();
    // console.log(data);
    return data;
}
