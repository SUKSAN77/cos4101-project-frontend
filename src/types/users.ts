import type {
    GetApiV1UsersByIdResponse,
    GetApiV1UsersMeResponse,
    PatchApiV1UsersByIdData,
} from "@/client";

export type User = GetApiV1UsersByIdResponse;

export type UserMe = GetApiV1UsersMeResponse;

export type UpdateUser = PatchApiV1UsersByIdData["body"];

export enum UserRole {
    "ADMIN" = 0,
    "DEPARTMENT_HEAD" = 1,
    "INVENTORY_MANAGER" = 2,
    "INSTRUCTOR" = 3,
    "STAFF" = 4,
    "UNKNOWN" = 6,
}

// 👑 ADMIN	ผู้ดูแลระบบสูงสุด - เข้าถึงและจัดการทุกส่วนของระบบได้
// 🏢 DEPARTMENT_HEAD	หัวหน้าภาควิชา - จัดการผู้ใช้และทรัพยากรภายในภาควิชา
// 📦 INVENTORY_MANAGER	ผู้จัดการคลัง - ดูแลการเพิ่ม แก้ไข ลบ และติดตามอุปกรณ์
// 👨‍🏫 INSTRUCTOR	อาจารย์ - ดูข้อมูลทั่วไปและจัดการโปรไฟล์ส่วนตัว
// 👷 STAFF	เจ้าหน้าที่ - สิทธิ์เหมือนอาจารย์ ดูข้อมูลและจัดการโปรไฟล์ตัวเอง
// 🤷 UNKNOWN	ไม่ทราบบทบาท - ผู้ใช้ที่ไม่มีบทบาทในระบบ
