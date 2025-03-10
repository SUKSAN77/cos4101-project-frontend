"use client";

import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

import { UsersService } from "@/client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/api";
import type { User } from "@/types/users";

import TableData from "./TableData";

export const userRoles: { [key: number]: string } = {
    0: "ผู้ใช้ทั่วไป",
    1: "ผู้ดูแลระบบ",
    2: "เจ้าหน้าที่",
};

interface DialogPopupProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    selectedUser: User | null;
    handleConfirmToggle: () => void;
    handleDeleteUser: () => void;
}

const DialogPopup = ({
    isDialogOpen,
    setIsDialogOpen,
    selectedUser,
    handleConfirmToggle,
    handleDeleteUser,
}: DialogPopupProps) => {
    if (!selectedUser) return null;

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>ข้อมูลผู้ใช้</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="font-semibold">อีเมล:</p>
                        <p className="col-span-3">{selectedUser.email}</p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="font-semibold">ชื่อ-นามสกุล:</p>
                        <p className="col-span-3">
                            {selectedUser.firstName} {selectedUser.lastName}
                        </p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="font-semibold">สถานะ:</p>
                        <p className="col-span-3">
                            {selectedUser.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="font-semibold">ระดับผู้ใช้:</p>
                        <p className="col-span-3">
                            {userRoles[selectedUser.role as number]}
                        </p>
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        ปิด
                    </Button>
                    <Button
                        onClick={handleConfirmToggle}
                        className={
                            !selectedUser.isActive
                                ? "hover: bg-green-500 hover:bg-green-600"
                                : "bg-blue-500 hover:bg-blue-600"
                        }
                    >
                        {!selectedUser.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteUser}>
                        ลบบัญชี
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const { users, setUsers } = useUsers();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users?.filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.email.toLowerCase().includes(searchLower) ||
            (user.firstName &&
                user.firstName.toLowerCase().includes(searchLower)) ||
            (user.lastName && user.lastName.toLowerCase().includes(searchLower))
        );
    });

    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        try {
            const { response } = await UsersService.deleteApiV1UsersById({
                path: { id: selectedUser.id },
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            setUsers(users.filter((user) => user.id !== selectedUser.id));
            console.log("User deleted successfully!");
            setIsDialogOpen(false);
            window.location.reload();
        } catch (error) {
            console.log("Error deleting user", error);
        }
    };

    const toggleUserActive = async (user_id: string, isActive: boolean) => {
        try {
            const { response } = await UsersService.patchApiV1UsersById({
                path: { id: user_id },
                body: { isActive: !isActive },
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            console.log("User updated successfully!");
            window.location.reload();
        } catch (error) {
            console.log("Error updating user", error);
        }
    };

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleConfirmToggle = () => {
        if (selectedUser) {
            toggleUserActive(selectedUser.id, selectedUser.isActive);
        }
        setIsDialogOpen(false);
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
            cellFormat: (value: boolean) =>
                value ? "เปิดใช้งาน" : "ปิดใช้งาน",
        },
        {
            head: "ยืนยันอีเมล",
            dataKey: "emailVerified",
            cellFormat: (value: boolean) =>
                value ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน",
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
            dataKey: "id",
            cellFormat: (_id: string, row: User) => (
                <Button onClick={() => handleViewUser(row)} variant="outline">
                    ดูข้อมูล
                </Button>
            ),
        },
    ];

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
                        <TableData
                            columns={headers}
                            data={filteredUsers || []}
                        />
                    </div>
                </div>
            </div>
            <DialogPopup
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                selectedUser={selectedUser || null}
                handleConfirmToggle={handleConfirmToggle}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    );
}
