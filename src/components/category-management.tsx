"use client";

import { format, formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import { Edit, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CategoriesService } from "@/client";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useCategories } from "@/hooks/api";
import { Category } from "@/types/categories";

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

export default function CategoryManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);

    const { categories, mutate } = useCategories();

    const handleAdd = async () => {
        if (!newCategoryName.trim()) {
            toast.error("กรุณากรอกชื่อหมวดหมู่");
            return;
        }

        setIsLoading(true);
        try {
            await CategoriesService.postApiV1Categories({
                body: { name: newCategoryName },
            });
            setIsAddModalOpen(false);
            setNewCategoryName("");
            toast.success("เพิ่มหมวดหมู่สำเร็จ");
            await mutate();
        } catch (error: unknown) {
            console.error("Error adding category:", error);
            toast.error("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!editingCategory) return;
        if (!newCategoryName.trim()) {
            toast.error("กรุณากรอกชื่อหมวดหมู่");
            return;
        }

        setIsLoading(true);
        try {
            await CategoriesService.patchApiV1CategoriesById({
                path: { id: editingCategory.id },
                body: { name: newCategoryName },
            });
            setIsEditModalOpen(false);
            setEditingCategory(null);
            setNewCategoryName("");
            toast.success("แก้ไขหมวดหมู่สำเร็จ");
            await mutate();
        } catch (error: unknown) {
            console.error("Error editing category:", error);
            toast.error("เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;

        setIsLoading(true);
        try {
            await CategoriesService.deleteApiV1CategoriesById({
                path: { id: categoryToDelete },
            });
            setIsDeleteAlertOpen(false);
            setCategoryToDelete(null);
            toast.success("ลบหมวดหมู่สำเร็จ");
            await mutate();
        } catch (error: unknown) {
            console.error("Error deleting category:", error);
            toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        <CardTitle className="text-3xl font-bold">
                            จัดการหมวดหมู่
                        </CardTitle>
                        <Button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 sm:mt-0"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> เพิ่มหมวดหมู่
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                placeholder="ค้นหาหมวดหมู่..."
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
                                            <TableHead>ชื่อหมวดหมู่</TableHead>
                                            <TableHead>วันที่สร้าง</TableHead>
                                            <TableHead>การจัดการ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {!categories ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-4 text-center"
                                                >
                                                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                                    <p className="mt-2">
                                                        กำลังโหลดข้อมูล...
                                                    </p>
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredCategories.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-4 text-center"
                                                >
                                                    ไม่พบข้อมูลหมวดหมู่
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredCategories.map(
                                                (category) => (
                                                    <TableRow key={category.id}>
                                                        <TableCell>
                                                            {category.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <DateDisplay
                                                                dateString={
                                                                    category.createdAt
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
                                                                        setEditingCategory(
                                                                            category,
                                                                        );
                                                                        setNewCategoryName(
                                                                            category.name,
                                                                        );
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
                                                                        setCategoryToDelete(
                                                                            category.id,
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
                                                ),
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add Category Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            เพิ่มหมวดหมู่ใหม่
                        </DialogTitle>
                        <DialogDescription>
                            กรอกชื่อหมวดหมู่ที่ต้องการเพิ่ม
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="categoryName"
                                className="text-sm font-medium"
                            >
                                ชื่อหมวดหมู่
                            </Label>
                            <Input
                                id="categoryName"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                placeholder="กรอกชื่อหมวดหมู่"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setNewCategoryName("");
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

            {/* Edit Category Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            แก้ไขหมวดหมู่
                        </DialogTitle>
                        <DialogDescription>
                            แก้ไขชื่อหมวดหมู่ที่ต้องการเปลี่ยน
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-500">
                                ชื่อหมวดหมู่เดิม:{" "}
                                <span className="font-semibold text-black">
                                    {editingCategory?.name}
                                </span>
                            </Label>
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="newCategoryName"
                                className="text-sm font-medium"
                            >
                                ชื่อหมวดหมู่ใหม่
                            </Label>
                            <Input
                                id="newCategoryName"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                placeholder="กรอกชื่อหมวดหมู่ใหม่"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setEditingCategory(null);
                                setNewCategoryName("");
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

            {/* Delete Category Alert */}
            <AlertDialog
                open={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>ยืนยันการลบหมวดหมู่</AlertDialogTitle>
                        <AlertDialogDescription>
                            คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่?
                            การกระทำนี้ไม่สามารถย้อนกลับได้
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setIsDeleteAlertOpen(false);
                                setCategoryToDelete(null);
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
