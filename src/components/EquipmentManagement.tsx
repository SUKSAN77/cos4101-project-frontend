"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { EquipmentsService } from "@/client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { useCategories, useEquipments, useRooms } from "@/hooks/api";
import { Equipment, UpdateEquipment } from "@/types/equipments";

const getRoleLabel = (role: string | number) => {
    const statusNumber = Number(role);
    switch (statusNumber) {
        case 0:
            return "ปกติ";
        case 1:
            return "ชำรุด";
        case 2:
            return "จำหน่าย";
        default:
            return "ไม่ทราบสถานะ";
    }
};

const equipmentCreateSchema = z.object({
    name: z.string().min(1, { message: "กรุณากรอกชื่อครุภัณฑ์" }),
    description: z.string().optional(),
    lifetime: z.union([z.string(), z.number()]),
    price: z.number().min(0),
    status: z.union([z.string(), z.number()]),
    customId: z.string().min(1, { message: "กรุณากรอกรหัสครุภัณฑ์" }),
    acquiredDate: z.union([z.string(), z.number(), z.date()]),
    serialNumber: z.string().optional(),
    acquisitionMethod: z.string(),
    disposalDate: z.union([z.string(), z.number(), z.date()]).optional(),
    notes: z.string().optional(),
    roomId: z.string().optional().nullable(),
    categoryId: z.string().optional().nullable(),
});

const equipmentUpdateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    serialNumber: z.string().optional(),
    acquisitionMethod: z.string().optional(),
    disposalDate: z.union([z.string(), z.number(), z.date()]).optional(),
    notes: z.string().optional(),
    roomId: z.string().optional(),
    categoryId: z.string().optional(),
});

type EquipmentCreateValues = z.infer<typeof equipmentCreateSchema>;
type EquipmentUpdateValues = z.infer<typeof equipmentUpdateSchema>;

interface NewEquipment {
    name: string;
    customId: string;
    serialNumber: string;
    status: string;
    price: string;
    acquisitionMethod: string;
    acquiredDate: string;
    notes: string;
    image: File | null;
}

export default function EquipmentManagement() {
    const { equipments, mutate } = useEquipments();
    const { categories } = useCategories();
    const { rooms } = useRooms();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterRoom, setFilterRoom] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] =
        useState<Equipment | null>(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(
        null,
    );
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedReceipt, setSelectedReceipt] = useState<File | null>(null);
    const [newEquipment, setNewEquipment] = useState<NewEquipment[]>([
        {
            name: "",
            customId: "",
            serialNumber: "",
            status: "0",
            price: "",
            acquisitionMethod: "",
            acquiredDate: new Date().toISOString().split("T")[0],
            notes: "",
            image: null,
        },
    ]);

    const addForm = useForm<EquipmentCreateValues>({
        resolver: zodResolver(equipmentCreateSchema),
        defaultValues: {
            name: "",
            description: "",
            lifetime: 0,
            price: 0,
            status: 0,
            customId: "",
            acquiredDate: new Date().toISOString(),
            serialNumber: "",
            acquisitionMethod: "",
            notes: "",
            roomId: "",
            categoryId: "",
        },
    });

    const editForm = useForm<EquipmentUpdateValues>({
        resolver: zodResolver(equipmentUpdateSchema),
    });

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        addForm.reset();
    };

    const handleShowDetails = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setIsDetailsDialogOpen(true);
    };

    const handleEditEquipment = (equipment: Equipment) => {
        setEditingEquipment(equipment);
        editForm.reset({
            name: equipment.name,
            description: equipment.description || undefined,
            serialNumber: equipment.serialNumber || undefined,
            acquisitionMethod: equipment.acquisitionMethod,
            notes: equipment.notes || undefined,
            roomId: equipment.roomId || undefined,
            categoryId: equipment.categoryId || undefined,
        });
        setIsEditDialogOpen(true);
    };

    const handleEditChange = (
        field: keyof UpdateEquipment,
        value: string | number | null,
    ) => {
        if (!editingEquipment) return;

        setEditingEquipment((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleSaveEdit = async () => {
        if (!editingEquipment) return;

        setIsLoading(true);
        try {
            const editPayload: UpdateEquipment = {};
            const fields: (keyof UpdateEquipment)[] = [
                "name",
                "description",
                "serialNumber",
                "acquisitionMethod",
                "notes",
                "roomId",
                "categoryId",
            ];

            fields.forEach((field) => {
                const value = editingEquipment[field as keyof Equipment];
                if (value !== undefined && value !== null) {
                    editPayload[field] = value.toString();
                }
            });

            if (Object.keys(editPayload).length > 0) {
                const { error } =
                    await EquipmentsService.patchApiV1EquipmentsById({
                        path: { id: editingEquipment.id },
                        body: editPayload,
                    });

                if (error) {
                    throw new Error(error.message);
                }
            }

            setIsEditDialogOpen(false);
            setEditingEquipment(null);
            editForm.reset();
            toast.success("แก้ไขครุภัณฑ์สำเร็จ");
            await mutate();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("เกิดข้อผิดพลาดในการแก้ไขครุภัณฑ์");
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewEquipmentChange = (
        index: number,
        field: keyof NewEquipment,
        value: any,
    ) => {
        setNewEquipment((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            return updated;
        });
    };

    const handleAddNewEquipmentField = () => {
        setNewEquipment((prev) => [
            ...prev,
            {
                name: "",
                customId: "",
                serialNumber: "",
                status: "0",
                price: "",
                acquisitionMethod: "",
                acquiredDate: new Date().toISOString().split("T")[0],
                notes: "",
                image: null,
            },
        ]);
    };

    const handleRemoveEquipment = (index: number) => {
        setNewEquipment((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSaveEquipment = async () => {
        setIsLoading(true);
        try {
            for (const equipment of newEquipment) {
                const requestBody = {
                    ...equipment,
                    status: Number(equipment.status),
                    price: Number(equipment.price),
                    lifetime: 0, // ต้องเพิ่มฟิลด์นี้ในฟอร์มถ้าต้องการ
                };

                const { data, error } =
                    await EquipmentsService.postApiV1Equipments({
                        body: requestBody,
                    });

                if (error) {
                    throw new Error(error.message);
                }

                // อัพโหลดรูปภาพ
                if (data && equipment.image) {
                    const { error: imageError } =
                        await EquipmentsService.postApiV1EquipmentsByIdImages({
                            path: { id: data.id },
                            body: { file: equipment.image },
                        });

                    if (imageError) {
                        toast.error("ไม่สามารถอัพโหลดรูปภาพได้");
                    }
                }
            }

            setIsDialogOpen(false);
            setNewEquipment([
                {
                    name: "",
                    customId: "",
                    serialNumber: "",
                    status: "0",
                    price: "",
                    acquisitionMethod: "",
                    acquiredDate: new Date().toISOString().split("T")[0],
                    notes: "",
                    image: null,
                },
            ]);
            toast.success("เพิ่มครุภัณฑ์สำเร็จ");
            await mutate();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("เกิดข้อผิดพลาดในการเพิ่มครุภัณฑ์");
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!equipmentToDelete) return;

        setIsLoading(true);
        try {
            const { error } = await EquipmentsService.deleteApiV1EquipmentsById(
                {
                    path: { id: equipmentToDelete },
                },
            );

            if (error) {
                throw new Error(
                    error.message || "เกิดข้อผิดพลาดในการลบครุภัณฑ์",
                );
            }

            setIsDeleteAlertOpen(false);
            setEquipmentToDelete(null);
            toast.success("ลบครุภัณฑ์สำเร็จ");
            await mutate();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("เกิดข้อผิดพลาดในการลบครุภัณฑ์");
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Helper functions
    const getCategoryName = (categoryId: string | null) => {
        if (!categoryId) return "-";
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : categoryId;
    };

    const getRoomNumber = (roomId: string | null) => {
        if (!roomId) return "-";
        const room = rooms.find((r) => r.id === roomId);
        return room ? `ห้อง ${room.roomNumber}` : roomId;
    };

    // Add filtered equipment logic
    const filteredEquipments = equipments.filter((item) => {
        // Filter by search term
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.customId &&
                item.customId.toLowerCase().includes(searchTerm.toLowerCase()));

        // Filter by category
        const matchesCategory =
            filterCategory === "" ||
            filterCategory === "all" ||
            item.categoryId === filterCategory;

        // Filter by status
        const matchesStatus =
            filterStatus === "" ||
            filterStatus === "all" ||
            item.status.toString() === filterStatus;

        // Filter by room
        const matchesRoom =
            filterRoom === "" ||
            filterRoom === "all" ||
            item.roomId === filterRoom;

        return matchesSearch && matchesCategory && matchesStatus && matchesRoom;
    });

    // เพิ่มฟังก์ชันจัดการการเลือกไฟล์
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedReceipt(e.target.files[0]);
        }
    };

    // เพิ่มฟังก์ชันสำหรับสร้าง PDF
    const handlePrintPDF = () => {
        const doc = new jsPDF("p", "mm", "a4");

        // เพิ่มฟอนต์
        doc.addFont(
            "https://fonts.gstatic.com/s/sarabun/v13/DtVmJx26TKEr37c9YL5.ttf",
            "Sarabun",
            "normal",
        );
        doc.setFont("Sarabun");
        doc.setFontSize(16);

        // เพิ่มหัวกระดาษ
        doc.text("รายงานครุภัณฑ์", 14, 15);

        // สร้างข้อมูลสำหรับตาราง
        const tableData = filteredEquipments.map((item) => [
            item.customId || "-",
            item.name,
            getRoleLabel(item.status),
            `${(item.price as string).toLocaleString()} บาท`,
            new Date(item.acquiredDate).toLocaleDateString("th-TH"),
            getCategoryName(item.categoryId),
            getRoomNumber(item.roomId),
        ]);

        // สร้างตาราง
        autoTable(doc, {
            head: [
                [
                    "รหัสครุภัณฑ์",
                    "ชื่อครุภัณฑ์",
                    "สถานะ",
                    "ราคา",
                    "วันที่ได้มา",
                    "หมวดหมู่",
                    "ห้อง",
                ],
            ],
            body: tableData,
            startY: 20,
            styles: {
                font: "Sarabun",
                fontSize: 12,
            },
            headStyles: {
                fillColor: [71, 85, 105],
                textColor: [255, 255, 255],
                font: "Sarabun",
                fontSize: 12,
                halign: "center",
            },
            theme: "grid",
            columnStyles: {
                0: { cellWidth: 25 },
                1: { cellWidth: 40 },
                2: { cellWidth: 20 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 30 },
                6: { cellWidth: 25 },
            },
        });

        // เพิ่มเลขหน้า
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(
                `หน้า ${i} จาก ${pageCount}`,
                doc.internal.pageSize.width - 20,
                doc.internal.pageSize.height - 10,
                { align: "right" },
            );
        }

        // บันทึกไฟล์
        doc.save(`รายงานครุภัณฑ์_${format(new Date(), "dd-MM-yyyy")}.pdf`);
    };

    return (
        <div className="space-y-6">
            <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <h1 className="mb-4 text-3xl font-bold sm:mb-0">
                    จัดการครุภัณฑ์
                </h1>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        onClick={handlePrintPDF}
                        className="bg-green-500 text-white hover:bg-green-600"
                    >
                        <Download className="mr-2 h-4 w-4" /> พิมพ์รายงาน
                    </Button>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        <Plus className="mr-2 h-4 w-4" /> เพิ่มครุภัณฑ์
                    </Button>
                </div>
            </div>

            <div className="mb-6 flex flex-col space-y-4">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        placeholder="ค้นหาครุภัณฑ์..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Select
                        value={filterCategory}
                        onValueChange={setFilterCategory}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="ประเภทครุภัณฑ์" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={filterRoom} onValueChange={setFilterRoom}>
                        <SelectTrigger>
                            <SelectValue placeholder="ห้อง" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            {rooms.map((room) => (
                                <SelectItem key={room.id} value={room.id}>
                                    ห้อง {room.roomNumber}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="สถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            <SelectItem value="0">ปกติ</SelectItem>
                            <SelectItem value="1">ชำรุด</SelectItem>
                            <SelectItem value="2">จำหน่าย</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <div className="space-y-6">
                    <div className="-mx-4 overflow-x-auto sm:mx-0">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>รหัสครุภัณฑ์</TableHead>
                                            <TableHead>ชื่อครุภัณฑ์</TableHead>
                                            <TableHead>สถานะ</TableHead>
                                            <TableHead>ราคา</TableHead>
                                            <TableHead>วันที่ได้มา</TableHead>
                                            <TableHead>การจัดการ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredEquipments.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    {item.customId || "NULL"}
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        onClick={() =>
                                                            handleShowDetails(
                                                                item,
                                                            )
                                                        }
                                                        className="text-left hover:text-blue-600 hover:underline"
                                                    >
                                                        {item.name}
                                                    </button>
                                                </TableCell>
                                                <TableCell>
                                                    {getRoleLabel(item.status)}
                                                </TableCell>
                                                <TableCell>
                                                    {(
                                                        item.price as string
                                                    ).toLocaleString()}{" "}
                                                    บาท
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        item.acquiredDate as
                                                            | string
                                                            | number
                                                            | Date,
                                                    ).toLocaleDateString(
                                                        "th-TH",
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="mr-2"
                                                        onClick={() =>
                                                            handleEditEquipment(
                                                                item,
                                                            )
                                                        }
                                                    >
                                                        แก้ไข
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEquipmentToDelete(
                                                                item.id,
                                                            );
                                                            setIsDeleteAlertOpen(
                                                                true,
                                                            );
                                                        }}
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

                    {/* Show message when no equipment matches the filters */}
                    {filteredEquipments.length === 0 && (
                        <div className="mt-4 text-center">
                            <p className="text-gray-500">
                                ไม่พบครุภัณฑ์ที่ตรงกับเงื่อนไขที่กำหนด
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-[100px]"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            ก่อนหน้า
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-[100px]"
                        >
                            ถัดไป
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            เพิ่มครุภัณฑ์
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {newEquipment.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                >
                                    <AccordionTrigger className="rounded-lg px-4 py-2 hover:bg-gray-50/50">
                                        <div className="flex w-full items-center justify-between">
                                            <span>
                                                {item.name ||
                                                    `ครุภัณฑ์ ${index + 1}`}
                                            </span>
                                            {newEquipment.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveEquipment(
                                                            index,
                                                        );
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4 p-4">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    ชื่อครุภัณฑ์
                                                </label>
                                                <Input
                                                    value={item.name}
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="ชื่อครุภัณฑ์"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    รหัสครุภัณฑ์
                                                </label>
                                                <Input
                                                    value={item.customId}
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "customId",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="รหัสครุภัณฑ์"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    Serial Number
                                                </label>
                                                <Input
                                                    value={item.serialNumber}
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "serialNumber",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Serial Number"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    สถานะ
                                                </label>
                                                <Select
                                                    value={item.status}
                                                    onValueChange={(value) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "status",
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="เลือกสถานะ" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0">
                                                            ปกติ
                                                        </SelectItem>
                                                        <SelectItem value="1">
                                                            ชำรุด
                                                        </SelectItem>
                                                        <SelectItem value="2">
                                                            จำหน่าย
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    ราคา
                                                </label>
                                                <Input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "price",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="ราคา"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    วิธีการได้มา
                                                </label>
                                                <Input
                                                    value={
                                                        item.acquisitionMethod
                                                    }
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "acquisitionMethod",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="วิธีการได้มา"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    วันที่ได้รับ
                                                </label>
                                                <Input
                                                    type="date"
                                                    value={item.acquiredDate}
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "acquiredDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    หมายเหตุ
                                                </label>
                                                <Input
                                                    value={item.notes}
                                                    onChange={(e) =>
                                                        handleNewEquipmentChange(
                                                            index,
                                                            "notes",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="หมายเหตุ"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    รูปภาพครุภัณฑ์
                                                </label>
                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            handleNewEquipmentChange(
                                                                index,
                                                                "image",
                                                                file || null,
                                                            );
                                                        }}
                                                        className="flex-1"
                                                    />
                                                    {item.image && (
                                                        <div className="relative h-20 w-20">
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    item.image,
                                                                )}
                                                                alt="Equipment preview"
                                                                className="h-full w-full rounded-md object-cover"
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                                                                onClick={() =>
                                                                    handleNewEquipmentChange(
                                                                        index,
                                                                        "image",
                                                                        null,
                                                                    )
                                                                }
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <Button
                            variant="outline"
                            onClick={handleAddNewEquipmentField}
                            className="mt-4 w-full"
                        >
                            <Plus className="mr-2 h-4 w-4" /> เพิ่มรายการใหม่
                        </Button>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button variant="outline" onClick={handleCloseDialog}>
                            ยกเลิก
                        </Button>
                        <Button
                            onClick={handleSaveEquipment}
                            className="bg-blue-500 hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? "กำลังบันทึก..." : "บันทึก"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {selectedEquipment && (
                <Dialog
                    open={isDetailsDialogOpen}
                    onOpenChange={setIsDetailsDialogOpen}
                >
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                                รายละเอียดครุภัณฑ์
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">
                                    รหัสครุภัณฑ์:
                                </span>
                                <span className="col-span-3">
                                    {selectedEquipment.customId}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">
                                    ชื่อครุภัณฑ์:
                                </span>
                                <span className="col-span-3">
                                    {selectedEquipment.name}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">รายละเอียด:</span>
                                <span className="col-span-3">
                                    {selectedEquipment.description}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">
                                    Serial Number:
                                </span>
                                <span className="col-span-3">
                                    {selectedEquipment.serialNumber}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">สถานะ:</span>
                                <span className="col-span-3">
                                    {getRoleLabel(selectedEquipment.status)}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">ราคา:</span>
                                <span className="col-span-3">
                                    {selectedEquipment.price.toLocaleString()}{" "}
                                    บาท
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">
                                    อายุการใช้งาน:
                                </span>
                                <span className="col-span-3">
                                    {selectedEquipment.lifetime} ปี
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">
                                    วิธีการได้มา:
                                </span>
                                <span className="col-span-3">
                                    {selectedEquipment.acquisitionMethod}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">
                                    วันที่ได้รับ:
                                </span>
                                <span className="col-span-3">
                                    {new Date(
                                        selectedEquipment.acquiredDate,
                                    ).toLocaleDateString("th-TH")}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">ห้อง:</span>
                                <span className="col-span-3">
                                    {getRoomNumber(selectedEquipment.roomId)}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">หมวดหมู่:</span>
                                <span className="col-span-3">
                                    {getCategoryName(
                                        selectedEquipment.categoryId,
                                    )}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">รูปภาพ:</span>
                                <div className="col-span-3">
                                    <span className="text-gray-500">
                                        ไม่มีรูปภาพ
                                    </span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDetailsDialogOpen(false)}
                            >
                                ปิด
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {editingEquipment && (
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                                แก้ไขข้อมูลครุภัณฑ์
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    ชื่อครุภัณฑ์
                                </label>
                                <Input
                                    value={editingEquipment.name}
                                    onChange={(e) =>
                                        handleEditChange("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    รหัสครุภัณฑ์
                                </label>
                                <Input
                                    value={editingEquipment.customId}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "customId",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    รายละเอียด
                                </label>
                                <Input
                                    value={editingEquipment.description}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "description",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    Serial Number
                                </label>
                                <Input
                                    value={editingEquipment.serialNumber}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "serialNumber",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    สถานะ
                                </label>
                                <Select
                                    value={editingEquipment.status.toString()}
                                    onValueChange={(value) =>
                                        handleEditChange(
                                            "status",
                                            Number.parseInt(value),
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">ปกติ</SelectItem>
                                        <SelectItem value="1">ชำรุด</SelectItem>
                                        <SelectItem value="2">
                                            จำหน่าย
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    ราคา
                                </label>
                                <Input
                                    type="number"
                                    value={editingEquipment.price}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "price",
                                            Number.parseFloat(e.target.value),
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    อายุการใช้งาน (ปี)
                                </label>
                                <Input
                                    type="number"
                                    value={editingEquipment.lifetime}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "lifetime",
                                            Number.parseInt(e.target.value),
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    วิธีการได้มา
                                </label>
                                <Input
                                    value={editingEquipment.acquisitionMethod}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "acquisitionMethod",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    วันที่ได้รับ
                                </label>
                                <Input
                                    type="date"
                                    value={
                                        editingEquipment.acquiredDate.split(
                                            "T",
                                        )[0]
                                    }
                                    onChange={(e) =>
                                        handleEditChange(
                                            "acquiredDate",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    ห้อง
                                </label>
                                <Select
                                    value={editingEquipment.roomId}
                                    onValueChange={(value) =>
                                        handleEditChange("roomId", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rooms.map((room) => (
                                            <SelectItem
                                                key={room.id}
                                                value={room.id}
                                            >
                                                ห้อง {room.roomNumber}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    หมวดหมู่
                                </label>
                                <Select
                                    value={editingEquipment.categoryId ?? ""}
                                    onValueChange={(value) =>
                                        handleEditChange("categoryId", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="sticky bottom-0 border-t bg-white py-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                onClick={handleSaveEdit}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                บันทึก
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Add Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ยืนยันการลบครุภัณฑ์</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>
                            คุณแน่ใจหรือไม่ที่จะลบครุภัณฑ์นี้?
                            การกระทำนี้ไม่สามารถย้อนกลับได้
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteAlertOpen(false);
                                setEquipmentToDelete(null);
                            }}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? "กำลังลบ..." : "ลบ"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
