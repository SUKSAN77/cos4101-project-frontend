"use server";

import { cookies } from "next/headers";

import { PatchApiV1UsersByIdResponse as User, UsersService } from "@/client";

export async function getUser(): Promise<User> {
    const cookieStore = await cookies();
    const { data } = await UsersService.getApiV1UsersMe({
        headers: {
            cookie: cookieStore.toString(),
        },
    });
    return data as User;
}
