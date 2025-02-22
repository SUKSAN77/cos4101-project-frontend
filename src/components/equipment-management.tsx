"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { RecentActivities } from "./recent-activities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2 } from "lucide-react";
import { mockEquipment } from "@/app/MockData";

// const statusMap = {
//   0: "ปกติ",
//   1: "ชำรุด",
//   2: "จำหน่าย",
// };

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

  const filteredEquipment = mockEquipment.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "all" || item.categoryId === filterCategory) &&
      (filterStatus === "all" || item.status.toString() === filterStatus)
  );

  // ฟังก์ชันสำหรับจัดการข้อมูลใหม่
  const handleNewEquipmentChange = (
    index: number,
    field: keyof NewEquipment,
    value: string
  ) => {
    const updatedEquipment = [...newEquipment];
    updatedEquipment[index] = { ...updatedEquipment[index], [field]: value };
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">จัดการครุภัณฑ์</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" /> เพิ่มครุภัณฑ์
        </Button>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="ค้นหาครุภัณฑ์..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="ประเภทครุภัณฑ์" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="CAT001">คอมพิวเตอร์</SelectItem>
              <SelectItem value="CAT002">อุปกรณ์นำเสนอ</SelectItem>
              <SelectItem value="CAT003">อุปกรณ์ต่อพ่วง</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
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
          <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                        <TableCell>{item.customId}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{getRoleLabel(item.status)}</TableCell>
                        <TableCell>{item.price.toLocaleString()} บาท</TableCell>
                        <TableCell>
                          {new Date(item.acquiredDate).toLocaleDateString(
                            "th-TH"
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">
                            แก้ไข
                          </Button>
                          <Button variant="destructive" size="sm">
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
            <Button variant="outline" size="sm" className="w-[100px]">
              <ChevronLeft className="h-4 w-4 mr-2" />
              ก่อนหน้า
            </Button>
            <Button variant="outline" size="sm" className="w-[100px]">
              ถัดไป
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              เพิ่มครุภัณฑ์
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {newEquipment.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="hover:bg-gray-50/50 px-4 py-2 rounded-lg">
                    <div className="flex items-center justify-between w-full">
                      <span>{item.name || `ครุภัณฑ์ ${index + 1}`}</span>
                      {newEquipment.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveEquipment(index);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 space-y-4">
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
                            )
                          }
                          placeholder="Serial Number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">สถานะ</label>
                        <Select
                          value={item.status}
                          onValueChange={(value) =>
                            handleNewEquipmentChange(index, "status", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกสถานะ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">ปกติ</SelectItem>
                            <SelectItem value="1">ชำรุด</SelectItem>
                            <SelectItem value="2">จำหน่าย</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ราคา</label>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleNewEquipmentChange(
                              index,
                              "price",
                              e.target.value
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
                          value={item.acquisitionMethod}
                          onChange={(e) =>
                            handleNewEquipmentChange(
                              index,
                              "acquisitionMethod",
                              e.target.value
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
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">หมายเหตุ</label>
                        <Input
                          value={item.notes}
                          onChange={(e) =>
                            handleNewEquipmentChange(
                              index,
                              "notes",
                              e.target.value
                            )
                          }
                          placeholder="หมายเหตุ"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button
              variant="outline"
              onClick={handleAddNewEquipmentField}
              className="w-full mt-4"
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
    </div>
  );
}
