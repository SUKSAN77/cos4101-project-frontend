import type {
    GetApiV1UsersByIdResponse,
    GetApiV1UsersMeResponse,
    PatchApiV1UsersByIdData,
} from "@/client";

export type User = GetApiV1UsersByIdResponse;

export type UserMe = GetApiV1UsersMeResponse;

export type UpdateUser = PatchApiV1UsersByIdData["body"];
