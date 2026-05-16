// import { createContext, useContext } from "react";

// export type UserRole = "learner" | "admin";

// export interface RoleContextType {
//   role: UserRole;
//   setRole: (role: UserRole) => void;
//   userName: string;
//   setUserName: (name: string) => void;
// }

// export const RoleContext = createContext<RoleContextType | null>(null);

// export function useRole() {
//   const ctx = useContext(RoleContext);
//   if (!ctx) throw new Error("useRole must be used within RoleProvider");
//   return ctx;
// }
