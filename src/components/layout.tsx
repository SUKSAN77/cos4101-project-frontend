"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Box, Users, Home, Tag } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white p-6 shadow-md transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
      >
        <nav className="space-y-2">
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
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
