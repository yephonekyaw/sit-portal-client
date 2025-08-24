// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useGetAuthUser } from "@/services/queries";
// import { useEffect, useState } from "react";
// import { isAxiosError } from "axios";
// import { PageLoader } from "@/pages/helper/Loaders";

// type Role = "manager" | "employee" | "owner" | "user";
// type Type = "admin" | "client";
// interface RouteConfig {
//   types: Type[];
//   roles: Role[];
// }
// interface ProtectedRouteProps extends RouteConfig {
//   children: React.ReactNode;
// }

// const ProtectedRoutes = ({ types, roles, children }: ProtectedRouteProps) => {
//   const location = useLocation();
//   const { data, error, isLoading } = useGetAuthUser();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | "null">(
//     "null",
//   );
//   const [hasType, setHasType] = useState<boolean | "null">("null");
//   const [hasRole, setHasRole] = useState<boolean | "null">("null");

//   useEffect(() => {
//     const checkAuth = () => {
//       if (data) {
//         const userData = data;
//         const role = userData.data.role as Role;
//         const type = role === "owner" || role === "user" ? "client" : "admin";
//         setIsAuthenticated(true);
//         setHasType(types.includes(type));
//         setHasRole(roles.includes(role));
//       }
//     };
//     checkAuth();
//   }, [data, types, roles]);

//   if (
//     isLoading &&
//     (isAuthenticated === "null" || hasType === "null" || hasRole === "null")
//   )
//     return (
//       <div className="w-full h-screen">
//         <PageLoader message="authenticating" />
//       </div>
//     );

//   if (isAxiosError(error) && error.status === 401)
//     return <Navigate to="/auth/signin" state={{ from: location }} replace />;

//   if (!isAuthenticated)
//     return <Navigate to="/auth/signin" state={{ from: location }} replace />;

//   if (!hasType || !hasRole)
//     return <Navigate to="/not-found-page" state={{ from: location }} replace />;

//   return children ? <>{children}</> : <Outlet />;
// };

// export default ProtectedRoutes;
