"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Box, Users, Home, Tag } from "lucide-react";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // ปิด sidebar เมื่อคลิกนอก sidebar บนมือถือ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "หน้าหลัก" },
    { href: "/equipment", icon: Box, label: "จัดการครุภัณฑ์" },
    { href: "/users", icon: Users, label: "จัดการผู้ใช้" },
    { href: "/rooms", icon: Home, label: "จัดการห้อง" },
    { href: "/categories", icon: Tag, label: "จัดการหมวดหมู่" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            ระบบจัดการ
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100 transition-colors"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "hover:bg-gray-100"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      isActive ? "text-blue-600" : "text-gray-500"
                    )}
                  />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-50 md:hidden bg-white shadow-lg hover:bg-gray-100 transition-colors duration-200"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
}
