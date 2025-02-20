"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Box, Users, Home, Tag } from "lucide-react";
import { Navbar } from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-xl font-semibold">ระบบจัดการ</span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/equipment" onClick={() => setIsSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Box className="mr-2 h-4 w-4" />
              จัดการครุภัณฑ์
            </Button>
          </Link>
          <Link href="/users" onClick={() => setIsSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              จัดการผู้ใช้
            </Button>
          </Link>
          <Link href="/rooms" onClick={() => setIsSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              จัดการห้อง
            </Button>
          </Link>
          <Link href="/categories" onClick={() => setIsSidebarOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Tag className="mr-2 h-4 w-4" />
              จัดการหมวดหมู่
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
}
