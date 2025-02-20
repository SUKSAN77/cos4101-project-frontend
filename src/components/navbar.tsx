"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement logout logic here
    console.log("Logging out...")
    router.push("/login")
  }

  return (
    <div className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-4 md:px-6 transition-all duration-200">
        <div className="ml-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-gray-100 transition-colors duration-200"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <Avatar className="h-9 w-9 ring-2 ring-gray-100">
                  <AvatarImage src="/avatars/01.png" alt="@somchai" />
                  <AvatarFallback className="bg-blue-500 text-white">สช</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56" 
              align="end" 
              forceMount
              sideOffset={8}
              className="animate-in fade-in-0 zoom-in-95"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-medium leading-none">สมชาย ใจดี</p>
                  <p className="text-xs leading-none text-muted-foreground">somchai@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                <User className="mr-2 h-4 w-4" />
                <span>ข้อมูลส่วนตัว</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                <Settings className="mr-2 h-4 w-4" />
                <span>ตั้งค่า</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>ออกจากระบบ</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

