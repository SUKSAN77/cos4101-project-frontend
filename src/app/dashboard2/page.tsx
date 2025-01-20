"use client";
// import { useEquipments } from "@/hook/api";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const equipments = [
  {
    id: "01947e23-223d-79f2-b7da-deb63f88447d",
    name: "Hat",
    description: "",
    lifetime: 0,
    price: "803.75",
    serialNumber: "a3b82717-a298-480f-bbd1-cc4b9d9a1ec7",
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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
    status: 0,
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

export const Dashboard = () => {
  // const { equipments, loading, error, page, setPage, limit, setLimit } = useEquipments();

  // if (false) return <div>กำลังโหลด...</div>;
  // if (false) return <div>เกิดข้อผิดพลาด: {error.message}</div>;

  const [limit, setLimit] = React.useState(15);
  const [page, setPage] = React.useState(1);

  return (
    <div className="flex flex-col">
      <div className="px-10 py-5">
        <div className="flex justify-between my-5">
          <h1 className="text-2xl text-center font-bold text-primary">
            ระบบจัดการครุภัณฑ์
          </h1>
          <Button className="text-secondary">เพิ่มครุภัณฑ์</Button>
        </div>
        <div className="flex gap-2">
          <div className="w-full mb-5">
            <label htmlFor="">ค้นหา</label>
            <Input placeholder="ค้นหาครุภัณฑ์" />
          </div>
          <div className="flex flex-col justify-center mb-5">
            <label htmlFor="">ค้นหาตาม</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="">ทั้งหมด</option>
              <option value="">ชื่อครุภัณฑ์</option>
              <option value="">หมายเลขครุภัณฑ์</option>
              <option value="">สถานที่ตั้ง</option>
              <option value="">สถานะการใช้งาน</option>
            </select>
          </div>
        </div>
        {/* ตารางแสดงข้อมูล */}
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">ชื่ออุปกรณ์</th>
              <th className="border p-2">รายละเอียด</th>
              <th className="border p-2">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {equipments?.map((equipment) => (
              <tr key={equipment.id}>
                <td className="border p-2">{equipment.name}</td>
                <td className="border p-2">{equipment.description}</td>
                <td className="border p-2">{equipment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex items-center gap-4">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border p-2"
          >
            <option value={5}>5 รายการ</option>
            <option value={10}>10 รายการ</option>
            <option value={20}>20 รายการ</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border disabled:opacity-50"
            >
              ก่อนหน้า
            </button>
            <span className="px-4 py-2">หน้า {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={equipments?.length < limit}
              className="px-4 py-2 border disabled:opacity-50"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
