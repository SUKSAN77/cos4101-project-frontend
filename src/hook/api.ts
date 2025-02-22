"use client";
import { useEffect, useState } from "react";

import { getEquipments } from "@/api/api";
import type { Equipment } from "@/api/interface";

export const useEquipments = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                setLoading(true);
                const response = await getEquipments(limit, (page - 1) * limit);
                if ("error" in response) {
                    setError(response.error);
                    return;
                }
                setEquipments(response || []);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipments();
    }, [page, limit]);

    return { equipments, loading, error, page, setPage, limit, setLimit };
};
