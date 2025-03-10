"use client";

import { format, formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import { Edit, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { UsersService } from "@/client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/api";
import type { UpdateUser, User } from "@/types/users";

const DateDisplay = ({ dateString }: { dateString: string }) => {
    if (typeof dateString !== "string") return <span>ไม่ระบุ</span>;

    try {
        const date = new Date(dateString);
        const relativeTime = formatDistanceToNow(date, {
            addSuffix: true,
            locale: th,
        });

        const fullDateTime = format(date, "PPPPp", { locale: th });

        return (
            <HoverCard>
                <HoverCardTrigger>
                    <span className="cursor-pointer border-b border-dotted border-gray-400">
                        {relativeTime}
                    </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2">
                    <p className="text-sm">{fullDateTime}</p>
                </HoverCardContent>
            </HoverCard>
        );
    } catch (error) {
        console.error("Error formatting date:", error);
        return <span>วันที่ไม่ถูกต้อง</span>;
    }
};

const getRoleLabel = (role: number) => {
    switch (role) {
        case 0:
            return "ผู้ใช้งานทั่วไป";
        case 1:
            return "ผู้ดูแลระบบ";
        default:
            return "ไม่ทราบบทบาท";
    }
};

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "0",
        isActive: true,
        emailVerified: false,
    });
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { users, mutate } = useUsers();

    const handleAdd = async () => {
        if (!newUser.email.trim() || !newUser.password.trim()) {
            toast.error("กรุณากรอกอีเมลและรหัสผ่าน");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await UsersService.postApiV1Users({
                body: {
                    ...newUser,
                    role: parseInt(newUser.role),
                },
            });
            if (!error) {
                setIsAddModalOpen(false);
                setNewUser({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    role: "0",
                    isActive: true,
                    emailVerified: false,
                });
                toast.success("เพิ่มผู้ใช้งานสำเร็จ");
                await mutate();
            } else {
                toast.error(error.message);
                // console.error("Error adding user:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!editingUser) return;

        setIsLoading(true);
        try {
            const editPayload: UpdateUser = {};

            if (newUser.email !== editingUser.email && newUser.email.trim())
                editPayload.email = newUser.email.trim();
            if (newUser.password?.trim())
                editPayload.password = newUser.password.trim();
            if (newUser.firstName?.trim() !== editingUser.firstName)
                editPayload.firstName = newUser.firstName?.trim();
            if (newUser.lastName?.trim() !== editingUser.lastName)
                editPayload.lastName = newUser.lastName?.trim();
            if (newUser.role !== editingUser.role?.toString())
                editPayload.role = parseInt(newUser.role);
            if (newUser.isActive !== editingUser.isActive)
                editPayload.isActive = newUser.isActive;
            if (newUser.emailVerified !== editingUser.emailVerified)
                editPayload.emailVerified = newUser.emailVerified;

            // Only proceed if there are actual changes
            if (Object.keys(editPayload).length === 0) {
                toast.info("ไม่มีข้อมูลที่ต้องการแก้ไข");
                setIsEditModalOpen(false);
                return;
            }

            console.log("Edit payload:", editPayload);
            const { error } = await UsersService.patchApiV1UsersById({
                path: { id: editingUser.id },
                body: editPayload,
            });
            if (!error) {
                setIsEditModalOpen(false);
                setEditingUser(null);
                setNewUser({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    role: "0",
                    isActive: true,
                    emailVerified: false,
                });
                toast.success("แก้ไขผู้ใช้งานสำเร็จ");
                await mutate();
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!userToDelete) return;

        setIsLoading(true);
        try {
            const { error } = await UsersService.deleteApiV1UsersById({
                path: { id: userToDelete },
            });

            if (!error) {
                setIsDeleteAlertOpen(false);
                setUserToDelete(null);
                toast.success("ลบผู้ใช้งานสำเร็จ");
                await mutate();
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        <CardTitle className="text-3xl font-bold">
                            จัดการผู้ใช้งาน
                        </CardTitle>
                        <Button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 sm:mt-0"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> เพิ่มผู้ใช้งาน
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                placeholder="ค้นหาผู้ใช้งาน..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <div className="-mx-4 overflow-x-auto sm:mx-0">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>อีเมล</TableHead>
                                            <TableHead>ชื่อ-นามสกุล</TableHead>
                                            <TableHead>บทบาท</TableHead>
                                            <TableHead>สถานะ</TableHead>
                                            <TableHead>วันที่สร้าง</TableHead>
                                            <TableHead>การจัดการ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {!users ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="py-4 text-center"
                                                >
                                                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                                    <p className="mt-2">
                                                        กำลังโหลดข้อมูล...
                                                    </p>
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="py-4 text-center"
                                                >
                                                    ไม่พบข้อมูลผู้ใช้งาน
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.firstName}{" "}
                                                        {user.lastName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getRoleLabel(
                                                            typeof user.role ===
                                                                "string"
                                                                ? parseInt(
                                                                      user.role,
                                                                  )
                                                                : user.role,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.isActive ? (
                                                            <span className="text-green-600">
                                                                ใช้งาน
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-600">
                                                                ไม่ใช้งาน
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <DateDisplay
                                                            dateString={
                                                                typeof user.createdAt ===
                                                                "string"
                                                                    ? user.createdAt
                                                                    : new Date(
                                                                          user.createdAt as number,
                                                                      ).toISOString()
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex items-center gap-1"
                                                                onClick={() => {
                                                                    setEditingUser(
                                                                        user,
                                                                    );
                                                                    setNewUser({
                                                                        email: user.email,
                                                                        password:
                                                                            "",
                                                                        firstName:
                                                                            user.firstName ||
                                                                            "",
                                                                        lastName:
                                                                            user.lastName ||
                                                                            "",
                                                                        role:
                                                                            typeof user.role ===
                                                                            "string"
                                                                                ? user.role
                                                                                : user.role?.toString() ||
                                                                                  "0",
                                                                        isActive:
                                                                            user.isActive ??
                                                                            true,
                                                                        emailVerified:
                                                                            user.emailVerified ??
                                                                            false,
                                                                    });
                                                                    setIsEditModalOpen(
                                                                        true,
                                                                    );
                                                                }}
                                                            >
                                                                <Edit className="h-4 w-4" />{" "}
                                                                แก้ไข
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                className="flex items-center gap-1"
                                                                onClick={() => {
                                                                    setUserToDelete(
                                                                        user.id,
                                                                    );
                                                                    setIsDeleteAlertOpen(
                                                                        true,
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />{" "}
                                                                ลบ
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add User Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            เพิ่มผู้ใช้งานใหม่
                        </DialogTitle>
                        <DialogDescription>
                            กรอกข้อมูลผู้ใช้งานที่ต้องการเพิ่ม
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">อีเมล</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="กรอกอีเมล"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">รหัสผ่าน</Label>
                            <Input
                                id="password"
                                type="password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="กรอกรหัสผ่าน"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="firstName">ชื่อ</Label>
                            <Input
                                id="firstName"
                                value={newUser.firstName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        firstName: e.target.value,
                                    })
                                }
                                placeholder="กรอกชื่อ"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">นามสกุล</Label>
                            <Input
                                id="lastName"
                                value={newUser.lastName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        lastName: e.target.value,
                                    })
                                }
                                placeholder="กรอกนามสกุล"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">บทบาท</Label>
                            <Select
                                value={newUser.role}
                                onValueChange={(value) =>
                                    setNewUser({ ...newUser, role: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกบทบาท" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">
                                        ผู้ใช้งานทั่วไป
                                    </SelectItem>
                                    <SelectItem value="1">
                                        ผู้ดูแลระบบ
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setNewUser({
                                    email: "",
                                    password: "",
                                    firstName: "",
                                    lastName: "",
                                    role: "0",
                                    isActive: true,
                                    emailVerified: false,
                                });
                            }}
                        >
                            ยกเลิก
                        </Button>
                        <Button onClick={handleAdd} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    กำลังเพิ่ม...
                                </>
                            ) : (
                                "เพิ่ม"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            แก้ไขข้อมูลผู้ใช้งาน
                        </DialogTitle>
                        <DialogDescription>
                            แก้ไขข้อมูลผู้ใช้งานที่ต้องการเปลี่ยน
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">อีเมล</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="กรอกอีเมล"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-password">
                                รหัสผ่าน (ไม่ต้องกรอกถ้าไม่ต้องการเปลี่ยน)
                            </Label>
                            <Input
                                id="edit-password"
                                type="password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="กรอกรหัสผ่านใหม่"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-firstName">ชื่อ</Label>
                            <Input
                                id="edit-firstName"
                                value={newUser.firstName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        firstName: e.target.value,
                                    })
                                }
                                placeholder="กรอกชื่อ"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-lastName">นามสกุล</Label>
                            <Input
                                id="edit-lastName"
                                value={newUser.lastName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        lastName: e.target.value,
                                    })
                                }
                                placeholder="กรอกนามสกุล"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-role">บทบาท</Label>
                            <Select
                                value={newUser.role}
                                onValueChange={(value) =>
                                    setNewUser({ ...newUser, role: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกบทบาท" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">
                                        ผู้ใช้งานทั่วไป
                                    </SelectItem>
                                    <SelectItem value="1">
                                        ผู้ดูแลระบบ
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-isActive">
                                สถานะการใช้งาน
                            </Label>
                            <Select
                                value={newUser.isActive ? "true" : "false"}
                                onValueChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        isActive: value === "true",
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกสถานะการใช้งาน" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">ใช้งาน</SelectItem>
                                    <SelectItem value="false">
                                        ไม่ใช้งาน
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-emailVerified">
                                สถานะการยืนยันอีเมล
                            </Label>
                            <Select
                                value={newUser.emailVerified ? "true" : "false"}
                                onValueChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        emailVerified: value === "true",
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกสถานะการยืนยันอีเมล" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">
                                        ยืนยันแล้ว
                                    </SelectItem>
                                    <SelectItem value="false">
                                        ยังไม่ยืนยัน
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setEditingUser(null);
                                setNewUser({
                                    email: "",
                                    password: "",
                                    firstName: "",
                                    lastName: "",
                                    role: "0",
                                    isActive: true,
                                    emailVerified: false,
                                });
                            }}
                        >
                            ยกเลิก
                        </Button>
                        <Button onClick={handleEdit} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    กำลังบันทึก...
                                </>
                            ) : (
                                "บันทึก"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Alert */}
            <AlertDialog
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ยืนยันการลบผู้ใช้งาน
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?
                            การกระทำนี้ไม่สามารถย้อนกลับได้
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setIsDeleteAlertOpen(false);
                                setUserToDelete(null);
                            }}
                        >
                            ยกเลิก
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    กำลังลบ...
                                </>
                            ) : (
                                "ลบ"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
