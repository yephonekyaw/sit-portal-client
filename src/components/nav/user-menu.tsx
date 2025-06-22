import { Settings, LogOut, User, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
}

export function UserMenu({
  user = {
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    initials: "AC",
  },
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm transition-all hover:bg-purple-700">
          {user.initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-0" align="end" forceMount>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <DropdownMenuItem className="rounded-xl p-3 cursor-pointer">
            <User className="mr-3 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl p-3 cursor-pointer">
            <Settings className="mr-3 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl p-3 cursor-pointer">
            <Shield className="mr-3 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
        </div>

        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <DropdownMenuItem className="rounded-xl p-3 cursor-pointer text-red-600 dark:text-red-400">
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
