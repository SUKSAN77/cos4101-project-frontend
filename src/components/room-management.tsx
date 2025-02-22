"use client";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { mockRooms } from "@/app/MockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function RoomManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRooms = mockRooms.filter((room) =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()),
    );

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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>หมายเลขห้อง</TableHead>
                                    <TableHead>รายละเอียดครุภัณฑ์</TableHead>
                                    <TableHead>วันที่สร้าง</TableHead>
                                    <TableHead>การจัดการ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRooms.map((room) => (
                                    <TableRow key={room.id}>
                                        <TableCell>{room.roomNumber}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                            >
                                                ดูรายละเอียด
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                room.createdAt,
                                            ).toLocaleDateString("th-TH")}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                            >
                                                แก้ไข
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                            >
                                                ลบ
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
