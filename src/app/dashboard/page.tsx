'use client';
import { useEquipments } from "@/hook/api";
import React from "react";

export const Dashboard = () => {
  const { equipments, loading, error, page, setPage, limit, setLimit } = useEquipments();

  if (loading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">รายการอุปกรณ์</h1>
      
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
  );
};

export default Dashboard;
