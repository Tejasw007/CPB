import { BankUser, UserRole } from "@/lib/types";

export const DEMO_PERSONAS: BankUser[] = [
  {
    id: "customer-rajesh",
    name: "Rajesh Sharma",
    email: "customer@cpb.bank",
    role: "CUSTOMER",
    phone: "+91 98201 44589",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    kycStatus: "VERIFIED",
    status: "ACTIVE",
    branchName: "Mumbai Nariman Point HQ",
    branchCode: "CPB001",
    panNumber: "ABCPS8841K",
    aadhaarNumber: "•••• •••• 8832",
    aadhaarNumber: "•••• •••• 8832",
    twoFactorEnabled: true,
  },
  {
    id: "customer-ananya",
    name: "Ananya Patel",
    email: "ananya@cpb.bank",
    role: "CUSTOMER",
    phone: "+91 98200 44555",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    kycStatus: "VERIFIED",
    status: "ACTIVE",
    branchName: "Mumbai Nariman Point HQ",
    branchCode: "CPB001",
    panNumber: "BXYPA7721L",
    aadhaarNumber: "•••• •••• 9912",
    twoFactorEnabled: false,
  },
  {
    id: "staff-priya",
    name: "Priya Sharma",
    email: "staff@cpb.bank",
    role: "STAFF",
    staffDesignation: "TELLER",
    phone: "+91 98200 11223",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    kycStatus: "VERIFIED",
    status: "ACTIVE",
    branchName: "Mumbai Nariman Point HQ",
    branchCode: "CPB001",
  },
  {
    id: "admin-devendra",
    name: "Devendra Rao",
    email: "admin@cpb.bank",
    role: "ADMIN",
    phone: "+91 98111 00001",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    kycStatus: "VERIFIED",
    status: "ACTIVE",
    branchName: "Global CPB Headquarters",
    branchCode: "CPB001",
    twoFactorEnabled: true,
  },
  {
    id: "devops-karan",
    name: "Karan Verma",
    email: "devops@cpb.bank",
    role: "INFRA_ADMIN",
    phone: "+91 98111 22222",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    kycStatus: "VERIFIED",
    status: "ACTIVE",
    branchName: "DevOps & Cloud Reliability",
    branchCode: "INFRA",
    twoFactorEnabled: true,
  },
];

export function getDefaultUser(): BankUser {
  return DEMO_PERSONAS[0];
}

export function hasRequiredRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  if (userRole === "ADMIN" && !allowedRoles.includes("INFRA_ADMIN")) {
    return true;
  }
  return allowedRoles.includes(userRole);
}
