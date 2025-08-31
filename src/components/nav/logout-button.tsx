import * as React from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePostLogout } from "@/services/auth/mutations";
import { toast } from "sonner";

export function LogoutButton() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { mutate: logout, isPending: isSigningOut } = usePostLogout();

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsDialogOpen(false);
    toast.loading("Logging out...");
    logout();
  };

  const handleCancelLogout = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-rose-200/40 hover:bg-rose-200/60 focus:bg-rose-200/60"
        onClick={handleLogoutClick}
        disabled={isSigningOut}
        aria-label="Logout"
      >
        <LogOut className="h-10 w-10 text-rose-600" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-md border-rose-100 rounded-lg"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex text-rose-700 items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-medium">
              Are you sure you want to log out? You will need to sign in again
              to access your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelLogout}
              disabled={isSigningOut}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmLogout}
              disabled={isSigningOut}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              <LogOut className="w-4 h-4" />
              {isSigningOut ? "Signing out..." : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
