"use client";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRooms } from "@/hooks/api";

import TableData from "./TableData";

export default function RoomManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const { rooms } = useRooms();

    const filteredRooms = rooms.filter((room) =>
        room.roomNumber.includes(searchTerm),
    );

    const headers = [
        {
            head: "หมายเลขห้อง",
            dataKey: "roomNumber",
        },
        {
            head: "จัดการห้อง",
            dataKey: "actions",

            cellFormat: () => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                        แก้ไข
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        // onClick={() => handleDelete(row.id)}
                    >
                        ลบ
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <h1 className="mb-4 text-3xl font-bold sm:mb-0">จัดการห้อง</h1>
                <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="mr-2 h-4 w-4" /> เพิ่มห้อง
                </Button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        placeholder="ค้นหาห้อง..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="-mx-4 overflow-x-auto sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                        <TableData
                            columns={headers}
                            data={filteredRooms || []}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
