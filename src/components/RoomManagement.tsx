"use client";
import { format, formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import { Edit, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { RoomsService } from "@/client";
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
import { useRooms } from "@/hooks/api";
// guide
// RoomsService.getApiV1RoomsById({ path: { id: "1" } });
// RoomsService.postApiV1Rooms({ body: { roomNumber: "101" } });
// RoomsService.patchApiV1RoomsById({
//     path: { id: "1" },
//     body: { roomNumber: "102" },
// });
// RoomsService.deleteApiV1RoomsById({ path: { id: "1" } });
import { Room } from "@/hooks/interface";

import TableData from "./TableData";

// แก้ไข DateDisplay component
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

export default function RoomManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [newRoomNumber, setNewRoomNumber] = useState("");
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { rooms, mutate } = useRooms();

    const handleAdd = async () => {
        if (!newRoomNumber.trim()) {
            toast.error("กรุณากรอกหมายเลขห้อง");
            return;
        }

        setIsLoading(true);
        try {
            await RoomsService.postApiV1Rooms({
                body: { roomNumber: newRoomNumber },
            });
            setIsAddModalOpen(false);
            setNewRoomNumber("");
            toast.success("เพิ่มห้องสำเร็จ");
            await mutate();
        } catch (error: unknown) {
            console.error("Error adding room:", error);
            toast.error("เกิดข้อผิดพลาดในการเพิ่มห้อง");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!editingRoom) return;
        if (!newRoomNumber.trim()) {
            toast.error("กรุณากรอกหมายเลขห้อง");
            return;
        }

        setIsLoading(true);
        try {
            await RoomsService.patchApiV1RoomsById({
                path: { id: editingRoom.id },
                body: { roomNumber: newRoomNumber },
            });
            setIsEditModalOpen(false);
            setEditingRoom(null);
            setNewRoomNumber("");
            toast.success("แก้ไขห้องสำเร็จ");
            await mutate();
        } catch (error: unknown) {
            console.error("Error editing room:", error);
            toast.error("เกิดข้อผิดพลาดในการแก้ไขห้อง");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!roomToDelete) return;

        setIsLoading(true);
        try {
            await RoomsService.deleteApiV1RoomsById({
                path: { id: roomToDelete },
            });
            setIsDeleteAlertOpen(false);
            setRoomToDelete(null);
            toast.success("ลบห้องสำเร็จ");
            await mutate();
        } catch (error: unknown) {
            console.error("Error deleting room:", error);
            toast.error("เกิดข้อผิดพลาดในการลบห้อง");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRooms = rooms.filter((room) =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const headers = [
        {
            head: "หมายเลขห้อง",
            dataKey: "roomNumber",
        },
        {
            head: "วันที่สร้าง",
            dataKey: "createdAt",
            cellFormat: (value: string) => <DateDisplay dateString={value} />,
        },
        {
            head: "จัดการห้อง",
            dataKey: "actions",
            cellFormat: (
                _: unknown,
                row: {
                    id: string;
                    roomNumber: string;
                    createdAt: unknown;
                    updatedAt: unknown;
                },
            ) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => {
                            setEditingRoom(row);
                            setNewRoomNumber(row.roomNumber);
                            setIsEditModalOpen(true);
                        }}
                    >
                        <Edit className="h-4 w-4" /> แก้ไข
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => {
                            setRoomToDelete(row.id);
                            setIsDeleteAlertOpen(true);
                        }}
                    >
                        <Trash2 className="h-4 w-4" /> ลบ
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        <CardTitle className="text-3xl font-bold">
                            จัดการห้อง
                        </CardTitle>
                        <Button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 sm:mt-0"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> เพิ่มห้อง
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
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
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <TableData
                                    columns={headers}
                                    data={filteredRooms || []}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add Room Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            เพิ่มห้องใหม่
                        </DialogTitle>
                        <DialogDescription>
                            กรอกหมายเลขห้องที่ต้องการเพิ่ม
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="roomNumber"
                                className="text-sm font-medium"
                            >
                                หมายเลขห้อง
                            </Label>
                            <Input
                                id="roomNumber"
                                value={newRoomNumber}
                                onChange={(e) =>
                                    setNewRoomNumber(e.target.value)
                                }
                                placeholder="กรอกหมายเลขห้อง"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setNewRoomNumber("");
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

            {/* Edit Room Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">แก้ไขห้อง</DialogTitle>
                        <DialogDescription>
                            แก้ไขหมายเลขห้องที่ต้องการเปลี่ยน
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-500">
                                หมายเลขห้องเดิม:{" "}
                                <span className="font-semibold text-black">
                                    {editingRoom?.roomNumber}
                                </span>
                            </Label>
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="newRoomNumber"
                                className="text-sm font-medium"
                            >
                                หมายเลขห้องใหม่
                            </Label>
                            <Input
                                id="newRoomNumber"
                                value={newRoomNumber}
                                onChange={(e) =>
                                    setNewRoomNumber(e.target.value)
                                }
                                placeholder="กรอกหมายเลขห้องใหม่"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setEditingRoom(null);
                                setNewRoomNumber("");
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

            {/* Delete Room Alert */}
            <AlertDialog
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>ยืนยันการลบห้อง</AlertDialogTitle>
                        <AlertDialogDescription>
                            คุณต้องการลบห้องนี้ใช่หรือไม่?
                            การกระทำนี้ไม่สามารถย้อนกลับได้
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setIsDeleteAlertOpen(false);
                                setRoomToDelete(null);
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
