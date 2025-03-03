"use client";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">สมัครสมาชิก</CardTitle>
                    <CardDescription>
                        สร้างบัญชีใหม่โดยกรอกข้อมูลด้านล่างนี้
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">
                                    อีเมล{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="username"
                                    type="email"
                                    placeholder="cos@rumail.ru.ac.th"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    รหัสผ่าน{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstname">ชื่อ</Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        placeholder="ชื่อจริง"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">นามสกุล</Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        placeholder="นามสกุล"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                สมัครสมาชิก
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            มีบัญชีอยู่แล้ว?{" "}
                            <Link
                                href="/login"
                                className="underline underline-offset-4"
                            >
                                เข้าสู่ระบบ
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
