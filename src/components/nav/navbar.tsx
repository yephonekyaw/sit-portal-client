import * as React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import DesktopNav from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
// import { NotificationMenu } from "./noti-menu";
// import { UserMenu } from "./user-menu";

export function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center px-2 md:p-0",
        className
      )}
    >
      <div className="container flex h-20 items-center">
        <div className="hidden md:flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-1 bg-blue-100 rounded-lg">
              <img src="/logos/temp_logo.svg" className="w-8 h-8" />
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              SIT PORTAL
            </span>
          </Link>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Use the button below to toggle the mobile navigation menu.
          </SheetDescription>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex md:hidden flex-1 items-center justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-1 bg-blue-100 rounded-lg">
              <img src="/logos/temp_logo.svg" className="w-8 h-8" />
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              SIT PORTAL
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <DesktopNav className="w-full max-w-4xl flex items-center justify-center" />
        </div>

        {/* <nav className="flex items-center gap-3">
          <NotificationMenu />
          <UserMenu />
        </nav> */}
      </div>
    </header>
  );
}
