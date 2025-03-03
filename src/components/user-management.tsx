"use client";

import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/api";

import TableData from "./TableData";

export const userRoles: { [key: number]: string } = {
    0: "ผู้ใช้ทั่วไป",
    1: "ผู้ดูแลระบบ",
    2: "เจ้าหน้าที่",
};

const headers = [
    {
        head: "อีเมล",
        dataKey: "email",
    },
    {
        head: "ชื่อ",
        dataKey: "firstName",
    },
    {
        head: "นามสกุล",
        dataKey: "lastName",
    },
    {
        head: "สถานะ",
        dataKey: "isActive",
        cellFormat: (value: boolean) => (value ? "เปิดใช้งาน" : "ปิดใช้งาน"),
    },
    {
        head: "ยืนยันอีเมล",
        dataKey: "emailVerified",
        cellFormat: (value: boolean) => (value ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"),
    },
    {
        head: "ระดับผู้ใช้",
        dataKey: "role",
        cellFormat: (value: number) =>
            value in userRoles ? userRoles[value] : "ไม่ระบุ",
    },
    {
        head: "วันที่สร้าง",
        dataKey: "createdAt",
        cellFormat: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
        head: "จัดการผู้ใช้",
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

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const { users } = useUsers();

    return (
        <div className="space-y-6">
            <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <h1 className="mb-4 text-3xl font-bold sm:mb-0">
                    จัดการผู้ใช้
                </h1>
                <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="mr-2 h-4 w-4" /> เพิ่มผู้ใช้
                </Button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        placeholder="ค้นหาผู้ใช้..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="-mx-4 overflow-x-auto sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                        <TableData columns={headers} data={users || []} />
                    </div>
                </div>
            </div>
        </div>
    );
}
