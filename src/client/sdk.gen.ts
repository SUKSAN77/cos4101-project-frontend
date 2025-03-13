// This file is auto-generated by @hey-api/openapi-ts

import type {
    Client,
    Options as ClientOptions,
    TDataShape,
} from "@hey-api/client-next";

import { client as _heyApiClient } from "./client.gen";
import type {
    DeleteApiV1CategoriesByIdData,
    DeleteApiV1CategoriesByIdError,
    DeleteApiV1CategoriesByIdResponse,
    DeleteApiV1EquipmentsByIdData,
    DeleteApiV1EquipmentsByIdError,
    DeleteApiV1EquipmentsByIdImagesByImageIdData,
    DeleteApiV1EquipmentsByIdImagesByImageIdError,
    DeleteApiV1EquipmentsByIdImagesByImageIdResponse,
    DeleteApiV1EquipmentsByIdReceiptData,
    DeleteApiV1EquipmentsByIdReceiptError,
    DeleteApiV1EquipmentsByIdReceiptResponse,
    DeleteApiV1EquipmentsByIdResponse,
    DeleteApiV1RoomsByIdData,
    DeleteApiV1RoomsByIdError,
    DeleteApiV1RoomsByIdResponse,
    DeleteApiV1UsersByIdData,
    DeleteApiV1UsersByIdError,
    DeleteApiV1UsersByIdResponse,
    GetApiV1AuthGoogleData,
    GetApiV1AuthGoogleError,
    GetApiV1CategoriesByIdData,
    GetApiV1CategoriesByIdError,
    GetApiV1CategoriesByIdResponse,
    GetApiV1CategoriesData,
    GetApiV1CategoriesError,
    GetApiV1CategoriesResponse,
    GetApiV1EquipmentsByIdData,
    GetApiV1EquipmentsByIdError,
    GetApiV1EquipmentsByIdResponse,
    GetApiV1EquipmentsData,
    GetApiV1EquipmentsError,
    GetApiV1EquipmentsResponse,
    GetApiV1RoomsByIdData,
    GetApiV1RoomsByIdError,
    GetApiV1RoomsByIdResponse,
    GetApiV1RoomsData,
    GetApiV1RoomsError,
    GetApiV1RoomsResponse,
    GetApiV1UsersByIdData,
    GetApiV1UsersByIdError,
    GetApiV1UsersByIdResponse,
    GetApiV1UsersData,
    GetApiV1UsersError,
    GetApiV1UsersMeData,
    GetApiV1UsersMeError,
    GetApiV1UsersMeResponse,
    GetApiV1UsersResponse,
    PatchApiV1CategoriesByIdData,
    PatchApiV1CategoriesByIdError,
    PatchApiV1CategoriesByIdResponse,
    PatchApiV1EquipmentsByIdData,
    PatchApiV1EquipmentsByIdError,
    PatchApiV1EquipmentsByIdImagesByImageIdData,
    PatchApiV1EquipmentsByIdImagesByImageIdError,
    PatchApiV1EquipmentsByIdImagesByImageIdResponse,
    PatchApiV1EquipmentsByIdResponse,
    PatchApiV1RoomsByIdData,
    PatchApiV1RoomsByIdError,
    PatchApiV1RoomsByIdResponse,
    PatchApiV1UsersByIdData,
    PatchApiV1UsersByIdError,
    PatchApiV1UsersByIdResponse,
    PatchApiV1UsersMeData,
    PatchApiV1UsersMeError,
    PatchApiV1UsersMePasswordData,
    PatchApiV1UsersMePasswordError,
    PatchApiV1UsersMePasswordResponse,
    PatchApiV1UsersMeResponse,
    PostApiV1AuthGoogleCallbackData,
    PostApiV1AuthGoogleCallbackError,
    PostApiV1AuthGoogleCallbackResponse,
    PostApiV1AuthLoginData,
    PostApiV1AuthLoginError,
    PostApiV1AuthLoginResponse,
    PostApiV1AuthLogoutData,
    PostApiV1AuthLogoutError,
    PostApiV1AuthLogoutResponse,
    PostApiV1CategoriesData,
    PostApiV1CategoriesError,
    PostApiV1CategoriesResponse,
    PostApiV1EquipmentsByIdImagesData,
    PostApiV1EquipmentsByIdImagesError,
    PostApiV1EquipmentsByIdImagesResponse,
    PostApiV1EquipmentsByIdReceiptData,
    PostApiV1EquipmentsByIdReceiptError,
    PostApiV1EquipmentsByIdReceiptResponse,
    PostApiV1EquipmentsData,
    PostApiV1EquipmentsError,
    PostApiV1EquipmentsResponse,
    PostApiV1RoomsData,
    PostApiV1RoomsError,
    PostApiV1RoomsResponse,
    PostApiV1UsersData,
    PostApiV1UsersError,
    PostApiV1UsersResponse,
    PostApiV1UsersSignupData,
    PostApiV1UsersSignupError,
    PostApiV1UsersSignupResponse,
} from "./types.gen";

export type Options<
    TData extends TDataShape = TDataShape,
    ThrowOnError extends boolean = boolean,
> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

export class AuthService {
    public static postApiV1AuthLogin<ThrowOnError extends boolean = false>(
        options: Options<PostApiV1AuthLoginData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1AuthLoginResponse,
            PostApiV1AuthLoginError,
            ThrowOnError
        >({
            url: "/api/v1/auth/login",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static getApiV1AuthGoogle<ThrowOnError extends boolean = false>(
        options?: Options<GetApiV1AuthGoogleData, ThrowOnError>,
    ) {
        return (options?.client ?? _heyApiClient).get<
            unknown,
            GetApiV1AuthGoogleError,
            ThrowOnError
        >({
            url: "/api/v1/auth/google",
            ...options,
        });
    }

    public static postApiV1AuthGoogleCallback<
        ThrowOnError extends boolean = false,
    >(options: Options<PostApiV1AuthGoogleCallbackData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1AuthGoogleCallbackResponse,
            PostApiV1AuthGoogleCallbackError,
            ThrowOnError
        >({
            url: "/api/v1/auth/google/callback",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static postApiV1AuthLogout<ThrowOnError extends boolean = false>(
        options?: Options<PostApiV1AuthLogoutData, ThrowOnError>,
    ) {
        return (options?.client ?? _heyApiClient).post<
            PostApiV1AuthLogoutResponse,
            PostApiV1AuthLogoutError,
            ThrowOnError
        >({
            url: "/api/v1/auth/logout",
            ...options,
        });
    }
}

export class UsersService {
    public static getApiV1Users<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1UsersData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1UsersResponse,
            GetApiV1UsersError,
            ThrowOnError
        >({
            url: "/api/v1/users/",
            ...options,
        });
    }

    public static postApiV1Users<ThrowOnError extends boolean = false>(
        options: Options<PostApiV1UsersData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1UsersResponse,
            PostApiV1UsersError,
            ThrowOnError
        >({
            url: "/api/v1/users/",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static deleteApiV1UsersById<ThrowOnError extends boolean = false>(
        options: Options<DeleteApiV1UsersByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).delete<
            DeleteApiV1UsersByIdResponse,
            DeleteApiV1UsersByIdError,
            ThrowOnError
        >({
            url: "/api/v1/users/{id}",
            ...options,
        });
    }

    public static getApiV1UsersById<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1UsersByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1UsersByIdResponse,
            GetApiV1UsersByIdError,
            ThrowOnError
        >({
            url: "/api/v1/users/{id}",
            ...options,
        });
    }

    public static patchApiV1UsersById<ThrowOnError extends boolean = false>(
        options: Options<PatchApiV1UsersByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1UsersByIdResponse,
            PatchApiV1UsersByIdError,
            ThrowOnError
        >({
            url: "/api/v1/users/{id}",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static getApiV1UsersMe<ThrowOnError extends boolean = false>(
        options?: Options<GetApiV1UsersMeData, ThrowOnError>,
    ) {
        return (options?.client ?? _heyApiClient).get<
            GetApiV1UsersMeResponse,
            GetApiV1UsersMeError,
            ThrowOnError
        >({
            url: "/api/v1/users/me",
            ...options,
        });
    }

    public static patchApiV1UsersMe<ThrowOnError extends boolean = false>(
        options: Options<PatchApiV1UsersMeData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1UsersMeResponse,
            PatchApiV1UsersMeError,
            ThrowOnError
        >({
            url: "/api/v1/users/me",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static patchApiV1UsersMePassword<
        ThrowOnError extends boolean = false,
    >(options: Options<PatchApiV1UsersMePasswordData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1UsersMePasswordResponse,
            PatchApiV1UsersMePasswordError,
            ThrowOnError
        >({
            url: "/api/v1/users/me/password",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static postApiV1UsersSignup<ThrowOnError extends boolean = false>(
        options: Options<PostApiV1UsersSignupData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1UsersSignupResponse,
            PostApiV1UsersSignupError,
            ThrowOnError
        >({
            url: "/api/v1/users/signup",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }
}

export class CategoriesService {
    public static getApiV1Categories<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1CategoriesData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1CategoriesResponse,
            GetApiV1CategoriesError,
            ThrowOnError
        >({
            url: "/api/v1/categories/",
            ...options,
        });
    }

    public static postApiV1Categories<ThrowOnError extends boolean = false>(
        options: Options<PostApiV1CategoriesData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1CategoriesResponse,
            PostApiV1CategoriesError,
            ThrowOnError
        >({
            url: "/api/v1/categories/",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static deleteApiV1CategoriesById<
        ThrowOnError extends boolean = false,
    >(options: Options<DeleteApiV1CategoriesByIdData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).delete<
            DeleteApiV1CategoriesByIdResponse,
            DeleteApiV1CategoriesByIdError,
            ThrowOnError
        >({
            url: "/api/v1/categories/{id}",
            ...options,
        });
    }

    public static getApiV1CategoriesById<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1CategoriesByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1CategoriesByIdResponse,
            GetApiV1CategoriesByIdError,
            ThrowOnError
        >({
            url: "/api/v1/categories/{id}",
            ...options,
        });
    }

    public static patchApiV1CategoriesById<
        ThrowOnError extends boolean = false,
    >(options: Options<PatchApiV1CategoriesByIdData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1CategoriesByIdResponse,
            PatchApiV1CategoriesByIdError,
            ThrowOnError
        >({
            url: "/api/v1/categories/{id}",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }
}

export class RoomsService {
    public static getApiV1Rooms<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1RoomsData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1RoomsResponse,
            GetApiV1RoomsError,
            ThrowOnError
        >({
            url: "/api/v1/rooms/",
            ...options,
        });
    }

    public static postApiV1Rooms<ThrowOnError extends boolean = false>(
        options: Options<PostApiV1RoomsData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1RoomsResponse,
            PostApiV1RoomsError,
            ThrowOnError
        >({
            url: "/api/v1/rooms/",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static deleteApiV1RoomsById<ThrowOnError extends boolean = false>(
        options: Options<DeleteApiV1RoomsByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).delete<
            DeleteApiV1RoomsByIdResponse,
            DeleteApiV1RoomsByIdError,
            ThrowOnError
        >({
            url: "/api/v1/rooms/{id}",
            ...options,
        });
    }

    public static getApiV1RoomsById<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1RoomsByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1RoomsByIdResponse,
            GetApiV1RoomsByIdError,
            ThrowOnError
        >({
            url: "/api/v1/rooms/{id}",
            ...options,
        });
    }

    public static patchApiV1RoomsById<ThrowOnError extends boolean = false>(
        options: Options<PatchApiV1RoomsByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1RoomsByIdResponse,
            PatchApiV1RoomsByIdError,
            ThrowOnError
        >({
            url: "/api/v1/rooms/{id}",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }
}

export class EquipmentsService {
    public static getApiV1Equipments<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1EquipmentsData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1EquipmentsResponse,
            GetApiV1EquipmentsError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/",
            ...options,
        });
    }

    public static postApiV1Equipments<ThrowOnError extends boolean = false>(
        options: Options<PostApiV1EquipmentsData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1EquipmentsResponse,
            PostApiV1EquipmentsError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static deleteApiV1EquipmentsById<
        ThrowOnError extends boolean = false,
    >(options: Options<DeleteApiV1EquipmentsByIdData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).delete<
            DeleteApiV1EquipmentsByIdResponse,
            DeleteApiV1EquipmentsByIdError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}",
            ...options,
        });
    }

    public static getApiV1EquipmentsById<ThrowOnError extends boolean = false>(
        options: Options<GetApiV1EquipmentsByIdData, ThrowOnError>,
    ) {
        return (options.client ?? _heyApiClient).get<
            GetApiV1EquipmentsByIdResponse,
            GetApiV1EquipmentsByIdError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}",
            ...options,
        });
    }

    public static patchApiV1EquipmentsById<
        ThrowOnError extends boolean = false,
    >(options: Options<PatchApiV1EquipmentsByIdData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1EquipmentsByIdResponse,
            PatchApiV1EquipmentsByIdError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static postApiV1EquipmentsByIdImages<
        ThrowOnError extends boolean = false,
    >(options: Options<PostApiV1EquipmentsByIdImagesData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1EquipmentsByIdImagesResponse,
            PostApiV1EquipmentsByIdImagesError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}/images",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static deleteApiV1EquipmentsByIdImagesByImageId<
        ThrowOnError extends boolean = false,
    >(
        options: Options<
            DeleteApiV1EquipmentsByIdImagesByImageIdData,
            ThrowOnError
        >,
    ) {
        return (options.client ?? _heyApiClient).delete<
            DeleteApiV1EquipmentsByIdImagesByImageIdResponse,
            DeleteApiV1EquipmentsByIdImagesByImageIdError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}/images/{imageId}",
            ...options,
        });
    }

    public static patchApiV1EquipmentsByIdImagesByImageId<
        ThrowOnError extends boolean = false,
    >(
        options: Options<
            PatchApiV1EquipmentsByIdImagesByImageIdData,
            ThrowOnError
        >,
    ) {
        return (options.client ?? _heyApiClient).patch<
            PatchApiV1EquipmentsByIdImagesByImageIdResponse,
            PatchApiV1EquipmentsByIdImagesByImageIdError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}/images/{imageId}",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }

    public static deleteApiV1EquipmentsByIdReceipt<
        ThrowOnError extends boolean = false,
    >(options: Options<DeleteApiV1EquipmentsByIdReceiptData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).delete<
            DeleteApiV1EquipmentsByIdReceiptResponse,
            DeleteApiV1EquipmentsByIdReceiptError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}/receipt",
            ...options,
        });
    }

    public static postApiV1EquipmentsByIdReceipt<
        ThrowOnError extends boolean = false,
    >(options: Options<PostApiV1EquipmentsByIdReceiptData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).post<
            PostApiV1EquipmentsByIdReceiptResponse,
            PostApiV1EquipmentsByIdReceiptError,
            ThrowOnError
        >({
            url: "/api/v1/equipments/{id}/receipt",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    }
}
