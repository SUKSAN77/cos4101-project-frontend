"use client";

import {
    ChevronLeft,
    ChevronRight,
    Image,
    Plus,
    Search,
    X,
} from "lucide-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { mockCategories, mockEquipment, mockRooms } from "@/app/MockData";
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

const getRoleLabel = (role: number) => {
    switch (role) {
        case 0:
            return "ปกติ";
        case 1:
            return "ชำรุด";
        case 2:
            return "จำหน่าย";
        default:
            return "ไม่ทราบบทบาท";
    }
};

// เพิ่ม interface สำหรับข้อมูลครุภัณฑ์ใหม่
interface NewEquipment {
    name: string;
    customId: string;
    serialNumber: string;
    status: string;
    price: string;
    acquisitionMethod: string;
    acquiredDate: string;
    notes: string;
    image?: File | null; // Add this line
}

export default function EquipmentManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newEquipment, setNewEquipment] = useState<NewEquipment[]>([
        {
            name: "",
            customId: "",
            serialNumber: "",
            status: "",
            price: "",
            acquisitionMethod: "",
            acquiredDate: "",
            notes: "",
        },
    ]);
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<any>(null);
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    // const filteredEquipment = mockEquipment.filter(
    //     (item) =>
    //         (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             item.customId
    //                 .toLowerCase()
    //                 .includes(searchTerm.toLowerCase())) &&
    //         (filterCategory === "all" || item.categoryId === filterCategory) &&
    //         (filterStatus === "all" || item.status.toString() === filterStatus),
    // );

    // ฟังก์ชันสำหรับจัดการข้อมูลใหม่
    const handleNewEquipmentChange = (
        index: number,
        field: keyof NewEquipment,
        value: string | File | null,
    ) => {
        const updatedEquipment = [...newEquipment];
        updatedEquipment[index] = {
            ...updatedEquipment[index],
            [field]: value,
        };
        setNewEquipment(updatedEquipment);
    };

    const handleAddNewEquipmentField = () => {
        setNewEquipment([
            ...newEquipment,
            {
                name: "",
                customId: "",
                serialNumber: "",
                status: "",
                price: "",
                acquisitionMethod: "",
                acquiredDate: "",
                notes: "",
            },
        ]);
    };

    const handleRemoveEquipment = (index: number) => {
        if (newEquipment.length > 1) {
            setNewEquipment(newEquipment.filter((_, i) => i !== index));
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewEquipment([
            {
                name: "",
                customId: "",
                serialNumber: "",
                status: "",
                price: "",
                acquisitionMethod: "",
                acquiredDate: "",
                notes: "",
            },
        ]);
    };

    const handleSaveEquipment = () => {
        // TODO: Implement save logic here
        console.log("Saving equipment:", newEquipment);
        handleCloseDialog();
    };

    const handleShowDetails = (equipment: any) => {
        setSelectedEquipment(equipment);
        setIsDetailsDialogOpen(true);
        1;
    };

    const handleEditEquipment = (equipment: any) => {
        setEditingEquipment({ ...equipment });
        setIsEditDialogOpen(true);
    };

    const handleEditChange = (field: string, value: any) => {
        setEditingEquipment({
            ...editingEquipment,
            [field]: value,
        });
        
        // Clean up URL when component unmounts
        if (field === "imageUrl" && !value) {
            URL.revokeObjectURL(editingEquipment.imageUrl);
        }
    };

    const handleSaveEdit = () => {
        // Create FormData if there's a new image
        if (editingEquipment.imageFile) {
            const formData = new FormData();
            formData.append("image", editingEquipment.imageFile);
            // Add other equipment data to formData
            Object.keys(editingEquipment).forEach(key => {
                if (key !== "imageFile" && key !== "imageUrl") {
                    formData.append(key, editingEquipment[key]);
                }
            });
            
            // TODO: Send formData to API
            console.log("Saving edited equipment with new image:", formData);
        } else {
            // Send regular JSON if no new image
            console.log("Saving edited equipment:", editingEquipment);
        }
        
        // Clean up any object URLs
        if (editingEquipment.imageUrl) {
            URL.revokeObjectURL(editingEquipment.imageUrl);
        }
        
        setIsEditDialogOpen(false);
        setEditingEquipment(null);
    };

    // เพิ่มฟังก์ชัน helper ก่อน return
    const getCategoryName = (categoryId: string) => {
        const category = mockCategories.find((c) => c.id === categoryId);
        return category ? category.name : categoryId;
    };

    const getRoomNumber = (roomId: string) => {
        const room = mockRooms.find((r) => r.id === roomId);
        return room ? `ห้อง ${room.roomNumber}` : roomId;
    };

    return (
        <div className="space-y-6">
            <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <h1 className="mb-4 text-3xl font-bold sm:mb-0">
                    จัดการครุภัณฑ์
                </h1>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    <Plus className="mr-2 h-4 w-4" /> เพิ่มครุภัณฑ์
                </Button>
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
                            {mockCategories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
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
                                        {mockEquipment.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    {item.customId}
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
                                                    {item.price.toLocaleString()}{" "}
                                                    บาท
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        item.acquiredDate,
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
                        >
                            บันทึก
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
                                    {selectedEquipment.imageUrl ? (
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                // Create a new dialog for image viewing
                                                setIsImageViewerOpen(true);
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            <Image className="h-4 w-4" />
                                            ดูรูปภาพ
                                        </Button>
                                    ) : (
                                        <span className="text-gray-500">
                                            ไม่มีรูปภาพ
                                        </span>
                                    )}
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
                                            parseInt(value),
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
                                            parseFloat(e.target.value),
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
                                            parseInt(e.target.value),
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
                                        {mockRooms.map((room) => (
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
                                    value={editingEquipment.categoryId}
                                    onValueChange={(value) =>
                                        handleEditChange("categoryId", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockCategories.map((category) => (
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
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    รูปภาพครุภัณฑ์
                                </label>
                                <div className="flex items-center gap-4">
                                    {editingEquipment.imageUrl ? (
                                        <div className="relative h-32 w-32">
                                            <img
                                                src={
                                                    editingEquipment.imageUrl
                                                }
                                                alt="Equipment"
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                                                onClick={() =>
                                                    handleEditChange(
                                                        "imageUrl",
                                                        null,
                                                    )
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex-1">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        // Create a temporary URL for preview
                                                        const imageUrl =
                                                            URL.createObjectURL(
                                                                file,
                                                            );
                                                        handleEditChange(
                                                            "imageUrl",
                                                            imageUrl,
                                                        );
                                                        handleEditChange(
                                                            "imageFile",
                                                            file,
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
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

            <Dialog
                open={isImageViewerOpen}
                onOpenChange={setIsImageViewerOpen}
            >
                <DialogContent className="max-h-[90vh] max-w-[90vw] p-0">
                    <div className="relative h-full w-full">
                        <img
                            src={selectedEquipment?.imageUrl}
                            alt={selectedEquipment?.name}
                            className="h-full w-full object-contain"
                        />
                        <Button
                            variant="ghost"
                            className="absolute right-2 top-2"
                            onClick={() => setIsImageViewerOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
