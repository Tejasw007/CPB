import { UserRole } from "@/lib/types";

export function hasRequiredRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  if (userRole === "ADMIN" && !allowedRoles.includes("INFRA_ADMIN")) {
    return true;
  }
  return allowedRoles.includes(userRole);
}
