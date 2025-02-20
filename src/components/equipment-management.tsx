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

// Updated mock data
// const mockEquipment = [
//   {
//     id: "001",
//     name: "คอมพิวเตอร์ตั้งโต๊ะ",
//     description: "คอมพิวเตอร์ตั้งโต๊ะสำหรับสำนักงาน",
//     lifetime: 5,
//     price: 30000.0,
//     customId: "COM001",
//     serialNumber: "SN12345",
//     status: 0,
//     acquisitionMethod: "ซื้อ",
//     acquiredDate: "2023-01-15T00:00:00.000Z",
//     categoryId: "CAT001",
//     roomId: "ROOM201",
//     createdBy: "USER001",
//   },
//   {
//     id: "002",
//     name: "โปรเจคเตอร์",
//     description: "โปรเจคเตอร์สำหรับห้องประชุม",
//     lifetime: 3,
//     price: 25000.0,
//     customId: "PRJ001",
//     serialNumber: "SN67890",
//     status: 1,
//     acquisitionMethod: "ซื้อ",
//     acquiredDate: "2022-11-20T00:00:00.000Z",
//     categoryId: "CAT002",
//     roomId: "ROOM101",
//     createdBy: "USER002",
//   },
//   {
//     id: "003",
//     name: "เครื่องพิมพ์",
//     description: "เครื่องพิมพ์เลเซอร์สี",
//     lifetime: 4,
//     price: 15000.0,
//     customId: "PRT001",
//     serialNumber: "SN24680",
//     status: 0,
//     acquisitionMethod: "เช่า",
//     acquiredDate: "2023-03-05T00:00:00.000Z",
//     categoryId: "CAT003",
//     roomId: "ROOM301",
//     createdBy: "USER001",
//   },
// ];
const mockEquipment = [
  {
    id: "001",
    name: "คอมพิวเตอร์ตั้งโต๊ะ Dell OptiPlex",
    description: "คอมพิวเตอร์ตั้งโต๊ะสำหรับสำนักงาน",
    lifetime: 5,
    price: 30000.0,
    customId: "COM001",
    serialNumber: "SN12345",
    status: 0,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-01-15T00:00:00.000Z",
    categoryId: "CAT001",
    roomId: "ROOM201",
  },
  {
    id: "002",
    name: "โปรเจคเตอร์ Epson EB-X51",
    description: "โปรเจคเตอร์สำหรับห้องประชุม",
    lifetime: 3,
    price: 25000.0,
    customId: "PRJ001",
    serialNumber: "SN67890",
    status: 1,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2022-11-20T00:00:00.000Z",
    categoryId: "CAT002",
    roomId: "ROOM101",
  },
  {
    id: "003",
    name: "เครื่องพิมพ์ HP LaserJet Pro",
    description: "เครื่องพิมพ์เลเซอร์สี",
    lifetime: 4,
    price: 15000.0,
    customId: "PRT001",
    serialNumber: "SN24680",
    status: 0,
    acquisitionMethod: "เช่า",
    acquiredDate: "2023-03-05T00:00:00.000Z",
    categoryId: "CAT003",
    roomId: "ROOM301",
  },
  {
    id: "004",
    name: "โน๊ตบุ๊ค Lenovo ThinkPad",
    description: "โน๊ตบุ๊คสำหรับงานออกแบบ",
    lifetime: 5,
    price: 45000.0,
    customId: "COM002",
    serialNumber: "SN13579",
    status: 0,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-04-10T00:00:00.000Z",
    categoryId: "CAT001",
    roomId: "ROOM201",
  },
  {
    id: "005",
    name: "จอมอนิเตอร์ Dell 27 นิ้ว",
    description: "จอมอนิเตอร์สำหรับงานกราฟิก",
    lifetime: 5,
    price: 12000.0,
    customId: "MON001",
    serialNumber: "SN97531",
    status: 0,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-02-20T00:00:00.000Z",
    categoryId: "CAT003",
    roomId: "ROOM201",
  },
  {
    id: "006",
    name: "เครื่องสแกนเนอร์ Epson",
    description: "เครื่องสแกนเอกสาร",
    lifetime: 4,
    price: 8000.0,
    customId: "SCN001",
    serialNumber: "SN86420",
    status: 1,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-05-15T00:00:00.000Z",
    categoryId: "CAT003",
    roomId: "ROOM101",
  },
  {
    id: "007",
    name: "ไมโครโฟนไร้สาย Shure",
    description: "ไมโครโฟนสำหรับห้องประชุม",
    lifetime: 3,
    price: 15000.0,
    customId: "MIC001",
    serialNumber: "SN45678",
    status: 0,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-06-01T00:00:00.000Z",
    categoryId: "CAT002",
    roomId: "ROOM101",
  },
  {
    id: "008",
    name: "เครื่องถ่ายเอกสาร Canon",
    description: "เครื่องถ่ายเอกสารระบบดิจิทัล",
    lifetime: 5,
    price: 50000.0,
    customId: "CPY001",
    serialNumber: "SN78901",
    status: 0,
    acquisitionMethod: "เช่า",
    acquiredDate: "2023-01-01T00:00:00.000Z",
    categoryId: "CAT003",
    roomId: "ROOM301",
  },
  {
    id: "009",
    name: "แท็บเล็ต iPad Pro",
    description: "แท็บเล็ตสำหรับงานนำเสนอ",
    lifetime: 3,
    price: 35000.0,
    customId: "TAB001",
    serialNumber: "SN23456",
    status: 0,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-07-10T00:00:00.000Z",
    categoryId: "CAT001",
    roomId: "ROOM201",
  },
  {
    id: "010",
    name: "กล้องวิดีโอ Sony",
    description: "กล้องวิดีโอสำหรับบันทึกการประชุม",
    lifetime: 4,
    price: 45000.0,
    customId: "CAM001",
    serialNumber: "SN34567",
    status: 2,
    acquisitionMethod: "ซื้อ",
    acquiredDate: "2023-03-15T00:00:00.000Z",
    categoryId: "CAT002",
    roomId: "ROOM101",
  },
];

const statusMap = {
  0: "ปกติ",
  1: "ชำรุด",
  2: "จำหน่าย",
};

export default function EquipmentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredEquipment = mockEquipment.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "all" || item.categoryId === filterCategory) &&
      (filterStatus === "all" || item.status.toString() === filterStatus)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">จัดการครุภัณฑ์</h1>
        <Button>
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
                        <TableCell>{[item.status]}</TableCell>
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
    </div>
  );
}
