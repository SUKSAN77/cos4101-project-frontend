"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"; // Import Dialog components

// Mock data for equipment
const mockEquipment = [
  {
    id: "01947e23-223d-79f2-b7da-deb63f88447d",
    name: "Hat",
    description: "",
    lifetime: 0,
    price: "803.75",
    serialNumber: "a3b82717-a298-480f-bbd1-cc4b9d9a1ec7",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:36:59.326Z",
    updatedAt: "2025-01-19T10:36:59.326Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e23-23ea-75c0-96ba-d46784f3befe",
    name: "Towels",
    description: "",
    lifetime: 0,
    price: "775.81",
    serialNumber: "52f45cf4-4f73-46a6-a625-aea8ffaaf352",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:36:59.754Z",
    updatedAt: "2025-01-19T10:36:59.754Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e23-25d2-7352-9fe9-14405d74bd11",
    name: "Soap",
    description: "",
    lifetime: 0,
    price: "568.01",
    serialNumber: "db2e58e8-055f-4ccf-ac4a-421340b7a964",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:37:00.243Z",
    updatedAt: "2025-01-19T10:37:00.243Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e23-2739-70c2-a7f7-c7bfd70651f5",
    name: "Car",
    description: "",
    lifetime: 0,
    price: "912.39",
    serialNumber: "5e040759-1337-4068-87dd-97e34226a999",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:37:00.602Z",
    updatedAt: "2025-01-19T10:37:00.602Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e23-28c0-7910-aef8-47b8abc61cb6",
    name: "Shirt",
    description: "",
    lifetime: 0,
    price: "501.97",
    serialNumber: "0d459f49-e5db-4c24-a9bd-09f17c251fe8",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:37:00.992Z",
    updatedAt: "2025-01-19T10:37:00.992Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e23-2a04-7751-817b-d0ebb6266293",
    name: "Soap",
    description: "",
    lifetime: 0,
    price: "916.9",
    serialNumber: "1364ded2-fec2-4ea6-9f47-b34850328010",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:37:01.316Z",
    updatedAt: "2025-01-19T10:37:01.316Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e23-5877-7d51-9540-9c1b5dab7160",
    name: "Keyboard",
    description: "",
    lifetime: 0,
    price: "375.16",
    serialNumber: "77b9dc45-7f62-4b05-b48d-b22fae5bf637",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:37:13.208Z",
    updatedAt: "2025-01-19T10:37:13.208Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e27-ee7e-78c1-8fab-282bee2c3ed4",
    name: "Salad",
    description: "",
    lifetime: 0,
    price: "852.43",
    serialNumber: "b5a6cce8-2986-4adf-990f-59dab3d289ca",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:34:36.438Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:42:13.758Z",
    updatedAt: "2025-01-19T10:42:13.758Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e30-9bdc-7c41-96c3-8f04eb5b6e69",
    name: "Mouse",
    description: "",
    lifetime: 0,
    price: "501.04",
    serialNumber: "ae6acddb-c434-45d5-bfa3-151de9c2b911",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T10:51:09.736Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T10:51:42.429Z",
    updatedAt: "2025-01-19T10:51:42.429Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e3a-d2bc-7632-a197-608f91dbaeda",
    name: "Chicken",
    description: "",
    lifetime: 0,
    price: "262.11",
    serialNumber: "a7c7835e-d6cc-49c3-9b49-30172c16f5b5",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T11:02:49.645Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T11:02:51.836Z",
    updatedAt: "2025-01-19T11:02:51.836Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e3a-f0e6-7782-b04a-4dffaec9a4f9",
    name: "Bacon",
    description: "",
    lifetime: 0,
    price: "115.82",
    serialNumber: "f05e7f90-d480-42c1-aa80-3094dafc33ce",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T11:02:49.645Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T11:02:59.558Z",
    updatedAt: "2025-01-19T11:02:59.558Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: null,
    room: null,
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e3a-f3e9-7073-ae3d-2a2a7f4a3400",
    name: "Fish",
    description: "",
    lifetime: 0,
    price: "741.29",
    serialNumber: "6c5fded8-df2e-48a8-b32f-04adf2fbfe37",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T11:02:49.645Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T11:03:00.329Z",
    updatedAt: "2025-01-19T11:03:00.329Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: null,
    room: null,
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e3a-f5d3-7590-adf9-64d3f71a2729",
    name: "Chips",
    description: "",
    lifetime: 0,
    price: "729.87",
    serialNumber: "7ccc0bfa-5681-4b38-9e7c-229554a2256e",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T11:02:49.645Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T11:03:00.819Z",
    updatedAt: "2025-01-19T11:03:00.819Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: null,
    room: null,
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e3a-f766-7312-b170-d8853c95af8b",
    name: "Cheese",
    description: "",
    lifetime: 0,
    price: "102.09",
    serialNumber: "56c08d9f-0e27-4e54-ac91-b2b846c1d0d7",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T11:02:49.645Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T11:03:01.222Z",
    updatedAt: "2025-01-19T11:03:01.222Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: null,
    room: null,
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
  {
    id: "01947e3b-0652-7ee0-a0c6-39e5da73e843",
    name: "Gloves",
    description: "",
    lifetime: 0,
    price: "75.69",
    serialNumber: "84fdb5f6-1cb8-4c7a-a26f-88721346adfe",
    status: "Active",
    acquisitionMethod: "ตกลงราคา",
    disposalDate: "2025-01-19T11:02:49.645Z",
    notes: "{{$$randomLoremSentence}}",
    createdAt: "2025-01-19T11:03:05.042Z",
    updatedAt: "2025-01-19T11:03:05.042Z",
    deletedAt: null,
    createdBy: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
    roomId: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
    room: {
      id: "01947e20-3c56-7e52-b4d6-5ef8d0f1a3ef",
      roomNumber: "SCL 201",
    },
    creator: {
      id: "01947e1a-d31a-7293-95bf-0a8f01c2d5f6",
      email: "stacia.customer1@gmail.com",
      firstName: null,
      lastName: null,
    },
  },
];

const statusMap = {
  Active: "Available",
  Inactive: "In Use",
  Maintenance: "Under Maintenance",
};

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [newEquipment, setNewEquipment] = useState([{ name: "", serialNumber: "", status: "", acquisitionMethod: "", room: "" }]); // State to manage new equipment items

  const filteredEquipment = mockEquipment.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEquipment = () => {
    // Logic to handle adding new equipment
    setIsDialogOpen(false);
  };

  const handleAddNewEquipmentField = () => {
    setNewEquipment([...newEquipment, { name: "", serialNumber: "", status: "", acquisitionMethod: "", room: "" }]);
  };

  const handleNewEquipmentChange = (index, field, value) => {
    const updatedEquipment = newEquipment.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNewEquipment(updatedEquipment);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-2xl font-semibold">Equipment Management</h1>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> เพิ่มครุภัณฑ์
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4">
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>ID</TableHead> */}
                <TableHead>ชื่อ</TableHead>
                <TableHead>เลขครุภัณฑ์</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>หมวดหมู่</TableHead>
                <TableHead>ห้อง</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  {/* <TableCell className="font-medium">{item.id}</TableCell> */}
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{statusMap[item.status]}</TableCell>
                  <TableCell>{item.acquisitionMethod}</TableCell>
                  <TableCell>
                    {item.room ? item.room.roomNumber : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </SidebarInset>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เพิ่มครุภัณฑ์</DialogTitle>
          </DialogHeader>
          <div>
            {newEquipment.map((item, index) => (
              <div key={index} className="mb-4">
                <Input
                  placeholder="ชื่อครุภัณฑ์"
                  value={item.name}
                  onChange={(e) => handleNewEquipmentChange(index, "name", e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="เลขครุภัณฑ์"
                  value={item.serialNumber}
                  onChange={(e) => handleNewEquipmentChange(index, "serialNumber", e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="สถานะ"
                  value={item.status}
                  onChange={(e) => handleNewEquipmentChange(index, "status", e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="หมวดหมู่"
                  value={item.acquisitionMethod}
                  onChange={(e) => handleNewEquipmentChange(index, "acquisitionMethod", e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="ห้อง"
                  value={item.room}
                  onChange={(e) => handleNewEquipmentChange(index, "room", e.target.value)}
                  className="mb-2"
                />
              </div>
            ))}
            <Button onClick={handleAddNewEquipmentField}>Add Another</Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEquipment}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
