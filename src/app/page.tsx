import React from "react";

import { AuthService } from "@/client";

async function Page() {
    const { data, error } = await AuthService.postApiV1AuthLogin({
        body: {
            username: "stacia.customer1@gmail.com",
            password: "testtest",
        },
    });
    console.log(data, error);
    return <div>Page</div>;
}

export default Page;
