"use client";

import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { mockUsers } from "@/app/MockData";
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

const roleMap = {
    0: "ผู้ใช้ทั่วไป",
    1: "แอดมิน",
};

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = mockUsers.filter(
        (user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>อีเมล</TableHead>
                                    <TableHead>ชื่อ</TableHead>
                                    <TableHead>นามสกุล</TableHead>
                                    <TableHead>สถานะ</TableHead>
                                    <TableHead>ยืนยันอีเมล</TableHead>
                                    <TableHead>ระดับผู้ใช้</TableHead>
                                    <TableHead>วันที่สร้าง</TableHead>
                                    <TableHead>การจัดการ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>
                                            {user.isActive
                                                ? "ใช้งาน"
                                                : "ไม่ใช้งาน"}
                                        </TableCell>
                                        <TableCell>
                                            {user.emailVerified
                                                ? "ยืนยันแล้ว"
                                                : "ยังไม่ยืนยัน"}
                                        </TableCell>
                                        <TableCell>
                                            {user.role
                                                ? "แอดมิน"
                                                : "ผู้ใช้ทั่วไป"}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                user.createdAt,
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
