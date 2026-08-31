export type UserRole = 'CUSTOMER' | 'STAFF' | 'ADMIN' | 'INFRA_ADMIN';

export type StaffDesignation = 'TELLER' | 'LOAN_OFFICER' | 'SUPPORT_AGENT' | 'BRANCH_MANAGER';

export interface BankUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  staffDesignation?: StaffDesignation;
  branchName?: string;
  branchCode?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  address?: string;
  twoFactorEnabled?: boolean;
}

export interface BankAccount {
  id: string;
  userId: string;
  accountNumber: string;
  branchCode: string;
  ifsc: string;
  type: 'SAVINGS' | 'CURRENT' | 'FIXED_DEPOSIT';
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'DORMANT' | 'CLOSED';
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
  openedAt: string;
}

export interface BankTransaction {
  id: string;
  accountId: string;
  accountNumber: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
  balanceAfter: number;
  description: string;
  category: 'TRANSFER' | 'BILL_PAY' | 'LOAN_DISBURSEMENT' | 'LOAN_EMI' | 'FD_DEPOSIT' | 'INTEREST' | 'FEE' | 'REVERSAL' | 'CASH_DEPOSIT' | 'CASH_WITHDRAWAL';
  referenceId: string;
  counterpartyAccount?: string;
  counterpartyName?: string;
  counterpartyBank?: string;
  transferMode?: 'INTRA_BANK' | 'NEFT' | 'RTGS' | 'IMPS';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED';
  createdAt: string;
}

export interface BankBeneficiary {
  id: string;
  userId: string;
  name: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  nickname?: string;
  verified: boolean;
  coolingPeriodEndsAt?: string;
  dailyLimit: number;
  createdAt: string;
}

export interface BankCard {
  id: string;
  userId: string;
  accountId: string;
  cardNumber: string;
  cardHolderName: string;
  type: 'DEBIT' | 'CREDIT';
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  status: 'ACTIVE' | 'BLOCKED' | 'EXPIRED';
  atmLimit: number;
  onlineLimit: number;
  intlEnabled: boolean;
  contactlessEnabled: boolean;
}

export interface BankLoan {
  id: string;
  userId: string;
  userName?: string;
  type: 'PERSONAL' | 'HOME' | 'AUTO' | 'EDUCATION';
  principal: number;
  interestRate: number;
  tenureMonths: number;
  emiAmount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'CLOSED';
  creditScore: number;
  purpose?: string;
  disbursedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface BankFixedDeposit {
  id: string;
  accountId: string;
  userId: string;
  principal: number;
  rate: number;
  tenureMonths: number;
  maturityAmount: number;
  startDate: string;
  maturityDate: string;
  status: 'ACTIVE' | 'MATURED' | 'PREMATURE_CLOSED';
}

export interface BankTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  subject: string;
  category: 'TRANSACTION' | 'CARD' | 'LOAN' | 'ACCOUNT' | 'GENERAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'ESCALATED' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    senderId: string;
    senderRole: string;
    senderName: string;
    message: string;
    createdAt: string;
  }[];
}

export interface BankAuditLog {
  id: string;
  actorId?: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetType?: string;
  targetId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: string;
  severity: 'INFO' | 'WARN' | 'CRITICAL';
  createdAt: string;
}

export interface BankIncident {
  id: string;
  title: string;
  severity: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';
  status: 'INVESTIGATING' | 'IDENTIFIED' | 'MONITORING' | 'RESOLVED';
  summary: string;
  timeline?: string;
  postMortem?: string;
  leadEngineer: string;
  createdAt: string;
  resolvedAt?: string;
}
