import {
    GetApiV1CategoriesByIdResponse,
    GetApiV1RoomsByIdResponse,
    GetApiV1UsersByIdResponse,
    GetApiV1UsersMeResponse,
    PostApiV1CategoriesResponse,
} from "@/client";

export type User = GetApiV1UsersByIdResponse;

export type UserMe = GetApiV1UsersMeResponse;

export type Room = GetApiV1RoomsByIdResponse;

export type Category = GetApiV1CategoriesByIdResponse;

export type CreateCategory = PostApiV1CategoriesResponse;
