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
        className="rounded-full bg-red-200/50 hover:bg-red-200 focus:bg-red-200"
        onClick={handleLogoutClick}
        disabled={isSigningOut}
      >
        <LogOut className="h-10 w-10 text-red-700" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-[200px] border-red-100 rounded-lg"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex text-red-800/90 items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
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
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmLogout}
              disabled={isSigningOut}
            >
              {isSigningOut ? "Signing out..." : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { LogOut, AlertTriangle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { notify } from "@/utils/customToast";
// import { postSignOut } from "@/services/apis";
// import { useGetAccInfo } from "@/services/queries";
// import { useQueryClient } from "@tanstack/react-query";
// import React from "react";

// const LogoutButton = () => {
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false);
//   const [isSigningOut, setIsSigningOut] = React.useState(false);
//   const [isSignedOut, setIsSignedOut] = React.useState(false);
//   const [isError, setIsError] = React.useState(false);
//   const navigate = useNavigate();
//   const { data, isLoading, isError: apiError } = useGetAccInfo();
//   const queryClient = useQueryClient();

//   // Open confirmation dialog
//   const handleLogoutClick = (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   ) => {
//     e.preventDefault();
//     setIsDialogOpen(true);
//   };

//   const handleConfirmSignout = () => {
//     setIsDialogOpen(false);
//     setIsSigningOut(true);
//     queryClient.clear();
//     notify.promise()(postSignOut(), {
//       loading: "Signing out",
//       success: () => {
//         setIsSignedOut(true);
//         return "Signed out successfully";
//       },
//       error: () => {
//         setIsError(true);
//         return "Error: could not sign out gracefully";
//       },
//     });
//   };

//   const handleCancelSignout = () => {
//     setIsDialogOpen(false);
//   };

//   React.useEffect(() => {
//     if (isSignedOut || isError) {
//       void navigate("/auth/signin");
//     }
//   }, [isSignedOut, isError, navigate]);

//   if (isLoading || !data || apiError) {
//     return null;
//   }

//   return (
//     <>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="rounded-full bg-red-200/50 hover:bg-red-200 focus:bg-red-200"
//         onClick={handleLogoutClick}
//         disabled={isSigningOut}
//       >
//         <LogOut className="h-10 w-10 text-red-700" />
//       </Button>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent
//           className="max-w-[400px] border-red-100 rounded-lg"
//           onOpenAutoFocus={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <DialogHeader>
//             <DialogTitle className="flex text-red-800/90 items-center gap-2">
//               <AlertTriangle className="w-5 h-5 text-red-600" />
//               Confirm Logout
//             </DialogTitle>
//             <DialogDescription className="text-gray-600">
//               Are you sure you want to log out? You will need to sign in again
//               to access your account.
//             </DialogDescription>
//           </DialogHeader>

//           <DialogFooter className="flex gap-2 sm:gap-2">
//             <Button
//               variant="outline"
//               onClick={handleCancelSignout}
//               className="border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleConfirmSignout}
//               className="bg-red-600 hover:bg-red-700 text-white"
//             >
//               <LogOut className="w-4 h-4" />
//               Yes, Log out
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default LogoutButton;
