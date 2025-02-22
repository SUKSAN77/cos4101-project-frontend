"use client";

import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { mockCategories } from "@/app/MockData";
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

export default function CategoryManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = mockCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">
                    จัดการหมวดหมู่
                </h1>
                <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="mr-2 h-4 w-4" /> เพิ่มหมวดหมู่
                </Button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="ค้นหาหมวดหมู่..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ชื่อหมวดหมู่</TableHead>
                                    <TableHead>วันที่สร้าง</TableHead>
                                    <TableHead>การจัดการ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            {new Date(
                                                category.createdAt,
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
