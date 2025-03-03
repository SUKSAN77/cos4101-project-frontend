"use client";

import { useEffect, useState } from "react";

import {
    CategoriesService,
    EquipmentsService,
    GetApiV1CategoriesResponses,
    GetApiV1EquipmentsResponses,
    GetApiV1RoomsResponses,
    GetApiV1UsersResponses,
    RoomsService,
    UsersService,
} from "@/client";

// export const useEquipments = () => {
//     const [equipments, setEquipments] = useState<
//         GetApiV1EquipmentsResponses[200]["data"]
//     >([]);
//     const [loading, setLoading] = useState(false);

//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);

//     useEffect(() => {
//         const fetchEquipments = async () => {
//             try {
//                 setLoading(true);
//                 const response = await getEquipments(limit, (page - 1) * limit);
//                 if ("error" in response) {
//                     setError(response.error);
//                     return;
//                 }
//                 setEquipments(response || []);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error as Error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEquipments();
//     }, [page, limit]);

//     return { equipments, loading, error, page, setPage, limit, setLimit };
// };

export const useEquipments = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [equipments, setEquipments] = useState<
        GetApiV1EquipmentsResponses[200]["data"]
    >([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            const { data, error } = await EquipmentsService.getApiV1Equipments({
                query: {
                    limit: limit,
                    offset: (page - 1) * limit,
                },
            });
            if (data) setEquipments(data.data);
            if (error) {
                console.error(error);
            }
        };

        fetchEquipments();
    }, [page, limit]);
    return { equipments, setPage, setLimit };
};

export const useUsers = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [users, setUsers] = useState<GetApiV1UsersResponses[200]["data"]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await UsersService.getApiV1Users({
                query: {
                    limit: limit,
                    offset: (page - 1) * limit,
                },
            });
            if (data) setUsers(data.data);
            if (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [page, limit]);
    return { users, setPage, setLimit };
};

export const useCategories = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [categories, setCategories] = useState<
        GetApiV1CategoriesResponses[200]["data"]
    >([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await CategoriesService.getApiV1Categories({
                query: {
                    limit: limit,
                    offset: (page - 1) * limit,
                },
            });
            if (data) setCategories(data.data);
            if (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, [page, limit]);

    return { categories, setPage, setLimit };
};

export const useRooms = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [rooms, setRooms] = useState<GetApiV1RoomsResponses[200]["data"]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const { data, error } = await RoomsService.getApiV1Rooms({
                query: {
                    limit: limit,
                    offset: (page - 1) * limit,
                },
            });
            if (data) setRooms(data.data);
            if (error) {
                console.error(error);
            }
        };

        fetchRooms();
    }, [page, limit]);

    return { rooms, setPage, setLimit };
};
