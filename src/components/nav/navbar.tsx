import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotificationMenu } from "./noti-menu";
import { UserMenu } from "./user-menu";
import { Button } from "../ui/button";
import { MobileNavigation } from "./mobile-navigation";
import { DesktopNavigation } from "./desktop-navigation";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center px-2 md:p-0",
        className
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">SIT PORTAL</span>
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
            <MobileNavigation onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex md:hidden flex-1 items-center justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">SIT PORTAL</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <DesktopNavigation className="w-full max-w-4xl flex items-center justify-center" />
        </div>

        <nav className="flex items-center space-x-3">
          <NotificationMenu />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
