import { client } from "@/client/client.gen";

client.setConfig({
    baseUrl: "http://localhost:8000",
    credentials: "include",
});
