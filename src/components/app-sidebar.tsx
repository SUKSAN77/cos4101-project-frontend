"use client";

import type * as React from "react";
import {
  LayoutDashboard,
  Users,
  Box,
  Tag,
  Home,
  Settings2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john-doe.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard3",
      icon: LayoutDashboard,
    },
    {
      title: "Equipment",
      url: "/equipment",
      icon: Box,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Rooms",
      url: "/rooms",
      icon: Home,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Tag,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Box className="h-6 w-6" />
          <span className="font-semibold">จัดการครุภัณฑ์</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
