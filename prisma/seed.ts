import { PrismaClient, Role, UserStatus, KycStatus, AccountType, AccountStatus, AccountTier, TransactionType, TransactionCategory, TransferMode, TransactionStatus, CardType, CardStatus, LoanType, LoanStatus, FdStatus, TicketCategory, TicketStatus, TicketPriority, StaffDesignation } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Code Paglu Bank (CPB) database in `cpb_bank`...");

  // Clean existing records
  await prisma.biometricCredential.deleteMany();
  await prisma.onboardingInvitation.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.sessionDevice.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.fixedDeposit.deleteMany();
  await prisma.card.deleteMany();
  await prisma.beneficiary.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.staffMember.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.systemSetting.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.deployment.deleteMany();
  await prisma.user.deleteMany();

  const customerPass = await bcrypt.hash("Customer@2026", 10);
  const staffPass = await bcrypt.hash("Staff@2026", 10);
  const adminPass = await bcrypt.hash("Admin@2026", 10);
  const devopsPass = await bcrypt.hash("DevOps@2026", 10);

  // 1. Create Branches
  const mumbaiBranch = await prisma.branch.create({
    data: {
      name: "Mumbai Nariman Point HQ",
      code: "CPB001",
      ifsc: "CPBN0001042",
      address: "Maker Chambers IV, 14th Floor, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      phone: "+91 22 6123 4567",
      staffCount: 42,
    },
  });

  const blrBranch = await prisma.branch.create({
    data: {
      name: "Bengaluru Tech Park Hub",
      code: "CPB002",
      ifsc: "CPBN0002088",
      address: "Embassy GolfLinks Business Park, Domlur",
      city: "Bengaluru",
      state: "Karnataka",
      phone: "+91 80 4123 8900",
      staffCount: 28,
    },
  });

  console.log("✅ Branches created");

  // 2. Exactly 1 Account Per Portal:

  // --- PORTAL 1: CUSTOMER (Rajesh Sharma) ---
  const customerUser = await prisma.user.create({
    data: {
      name: "Rajesh Sharma",
      email: "customer@cpb.bank",
      password: customerPass,
      phone: "+91 98201 44589",
      role: Role.CUSTOMER,
      status: UserStatus.ACTIVE,
      kycStatus: KycStatus.VERIFIED,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      panNumber: "ABCPS8841K",
      aadhaarNumber: "•••• •••• 8832",
      address: "Flat 1204, Sea Breeze Towers, Worli, Mumbai 400018",
      twoFactorEnabled: true,
    },
  });

  // Alias for compatibility
  const customerAlias = await prisma.user.create({
    data: {
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      password: customerPass,
      phone: "+91 98201 44589",
      role: Role.CUSTOMER,
      status: UserStatus.ACTIVE,
      kycStatus: KycStatus.VERIFIED,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      panNumber: "ABCPS8841K",
      aadhaarNumber: "•••• •••• 8832",
      address: "Flat 1204, Sea Breeze Towers, Worli, Mumbai 400018",
      twoFactorEnabled: true,
    },
  });

  // --- PORTAL 2: STAFF (Priya Sharma - Senior Teller) ---
  const staffUser = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "staff@cpb.bank",
      password: staffPass,
      phone: "+91 98200 11223",
      role: Role.STAFF,
      status: UserStatus.ACTIVE,
      kycStatus: KycStatus.VERIFIED,
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
  });

  await prisma.staffMember.create({
    data: {
      userId: staffUser.id,
      branchId: mumbaiBranch.id,
      department: "Branch Operations & Customer Onboarding",
      designation: StaffDesignation.TELLER,
      permissions: JSON.stringify(["COUNTER_DEPOSIT", "COUNTER_WITHDRAWAL", "KYC_VERIFY", "ONBOARD_DISPATCH", "REVERSALS"]),
      dailyReversalLimit: 50000,
    },
  });

  // --- PORTAL 3: ADMIN (Devendra Rao - CISO) ---
  const adminUser = await prisma.user.create({
    data: {
      name: "Devendra Rao",
      email: "admin@cpb.bank",
      password: adminPass,
      phone: "+91 98111 00001",
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      kycStatus: KycStatus.VERIFIED,
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      twoFactorEnabled: true,
    },
  });

  // --- PORTAL 4: DEVOPS / INFRA (Karan Verma - Lead SRE) ---
  const devopsUser = await prisma.user.create({
    data: {
      name: "Karan Verma",
      email: "devops@cpb.bank",
      password: devopsPass,
      phone: "+91 98111 22222",
      role: Role.INFRA_ADMIN,
      status: UserStatus.ACTIVE,
      kycStatus: KycStatus.VERIFIED,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      twoFactorEnabled: true,
    },
  });

  console.log("✅ 4 Core Dedicated Portal Accounts Created");

  // 3. Customer Accounts & Financial Products
  const savingsAccount = await prisma.account.create({
    data: {
      userId: customerUser.id,
      accountNumber: "8832014109",
      branchCode: mumbaiBranch.code,
      ifsc: mumbaiBranch.ifsc,
      type: AccountType.SAVINGS,
      balance: 842100.00,
      currency: "INR",
      status: AccountStatus.ACTIVE,
      tier: AccountTier.GOLD,
      openedAt: new Date("2023-04-10"),
    },
  });

  const currentAccount = await prisma.account.create({
    data: {
      userId: customerUser.id,
      accountNumber: "8832099318",
      branchCode: mumbaiBranch.code,
      ifsc: mumbaiBranch.ifsc,
      type: AccountType.CURRENT,
      balance: 640350.00,
      currency: "INR",
      status: AccountStatus.ACTIVE,
      tier: AccountTier.PLATINUM,
      openedAt: new Date("2023-08-15"),
    },
  });

  // Also bind to alias
  await prisma.account.create({
    data: {
      userId: customerAlias.id,
      accountNumber: "8832014110",
      branchCode: mumbaiBranch.code,
      ifsc: mumbaiBranch.ifsc,
      type: AccountType.SAVINGS,
      balance: 842100.00,
      currency: "INR",
      status: AccountStatus.ACTIVE,
      tier: AccountTier.GOLD,
      openedAt: new Date("2023-04-10"),
    },
  });

  // Fixed Deposit
  await prisma.fixedDeposit.create({
    data: {
      accountId: savingsAccount.id,
      userId: customerUser.id,
      principal: 500000.00,
      rate: 7.25,
      tenureMonths: 12,
      maturityAmount: 537250.00,
      startDate: new Date("2024-01-10"),
      maturityDate: new Date("2025-01-10"),
      status: FdStatus.ACTIVE,
    },
  });

  // Debit & Credit Cards
  await prisma.card.create({
    data: {
      userId: customerUser.id,
      accountId: savingsAccount.id,
      cardNumber: "4532884109418832",
      cardHolderName: "RAJESH SHARMA",
      type: CardType.DEBIT,
      expiryMonth: 8,
      expiryYear: 2029,
      cvv: "742",
      status: CardStatus.ACTIVE,
      atmLimit: 50000.00,
      onlineLimit: 150000.00,
      intlEnabled: true,
      contactlessEnabled: true,
    },
  });

  await prisma.card.create({
    data: {
      userId: customerUser.id,
      accountId: savingsAccount.id,
      cardNumber: "5241883200194411",
      cardHolderName: "RAJESH SHARMA",
      type: CardType.CREDIT,
      expiryMonth: 11,
      expiryYear: 2028,
      cvv: "318",
      status: CardStatus.ACTIVE,
      atmLimit: 30000.00,
      onlineLimit: 300000.00,
      intlEnabled: true,
      contactlessEnabled: true,
    },
  });

  // Beneficiaries
  await prisma.beneficiary.create({
    data: {
      userId: customerUser.id,
      name: "Ananya Patel",
      accountNumber: "5591028374",
      bankName: "Code Paglu Bank",
      ifsc: blrBranch.ifsc,
      nickname: "Ananya (BLR)",
      verified: true,
      dailyLimit: 200000.00,
    },
  });

  await prisma.beneficiary.create({
    data: {
      userId: customerUser.id,
      name: "Vikram Malhotra",
      accountNumber: "1044992011",
      bankName: "Code Paglu Bank",
      ifsc: "CPBN0003019",
      nickname: "Vikram Corp",
      verified: true,
      dailyLimit: 500000.00,
    },
  });

  // Biometric Credential for Customer Phone Login
  await prisma.biometricCredential.create({
    data: {
      userId: customerUser.id,
      credentialId: "bio-cred-customer-rajesh-sharma",
      publicKey: "webauthn-es256-verified-key",
      deviceName: "Customer Smartphone Fingerprint Sensor (TouchID)",
    },
  });

  // Transactions
  const txns = [
    {
      accountId: savingsAccount.id,
      type: TransactionType.CREDIT,
      amount: 185000.00,
      balanceAfter: 842100.00,
      description: "Monthly Salary Credit — TechCorp Global Solutions",
      category: TransactionCategory.TRANSFER,
      referenceId: "CPB-TXN-20260828-9901",
      counterpartyName: "TechCorp Global Solutions Pvt Ltd",
      counterpartyBank: "HDFC Bank",
      transferMode: TransferMode.NEFT,
      status: TransactionStatus.COMPLETED,
      createdAt: new Date(Date.now() - 3 * 86400000),
    },
    {
      accountId: savingsAccount.id,
      type: TransactionType.DEBIT,
      amount: 45000.00,
      balanceAfter: 657100.00,
      description: "Monthly Apartment Rental Payment",
      category: TransactionCategory.TRANSFER,
      referenceId: "CPB-TXN-20260827-4122",
      counterpartyName: "Worli Realty Trust",
      counterpartyBank: "Code Paglu Bank",
      counterpartyAccount: "8832091100",
      transferMode: TransferMode.INTRA_BANK,
      status: TransactionStatus.COMPLETED,
      createdAt: new Date(Date.now() - 4 * 86400000),
    },
    {
      accountId: savingsAccount.id,
      type: TransactionType.DEBIT,
      amount: 3450.00,
      balanceAfter: 702100.00,
      description: "Adani Electricity Mumbai — Bill Pay",
      category: TransactionCategory.BILL_PAY,
      referenceId: "CPB-TXN-20260825-1829",
      counterpartyName: "Adani Electricity Mumbai Ltd",
      status: TransactionStatus.COMPLETED,
      createdAt: new Date(Date.now() - 6 * 86400000),
    },
    {
      accountId: savingsAccount.id,
      type: TransactionType.DEBIT,
      amount: 18450.00,
      balanceAfter: 682049.00,
      description: "Apple Store Mumbai — Electronics Purchase",
      category: TransactionCategory.TRANSFER,
      referenceId: "CPB-TXN-20260820-5510",
      counterpartyName: "Apple India Retail Ltd",
      counterpartyBank: "Citibank N.A.",
      transferMode: TransferMode.IMPS,
      status: TransactionStatus.COMPLETED,
      createdAt: new Date(Date.now() - 11 * 86400000),
    },
  ];

  for (const t of txns) {
    await prisma.transaction.create({ data: t });
  }

  // Home Loan
  await prisma.loan.create({
    data: {
      userId: customerUser.id,
      type: LoanType.HOME,
      principal: 4500000.00,
      interestRate: 8.40,
      tenureMonths: 180,
      emiAmount: 44078.00,
      status: LoanStatus.DISBURSED,
      creditScore: 810,
      purpose: "Purchase of Residential Property in Worli",
      disbursedAt: new Date("2023-09-01"),
      notes: "CIBIL 810. Approved by Branch Manager Arun Mehta.",
    },
  });

  // Support Ticket
  const ticket1 = await prisma.supportTicket.create({
    data: {
      ticketNumber: "CPB-TCK-8821",
      userId: customerUser.id,
      subject: "Request for International POS Limit Increase to ₹3,00,000",
      category: TicketCategory.CARD,
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.MEDIUM,
      assignedStaffId: staffUser.id,
    },
  });

  await prisma.ticketMessage.create({
    data: {
      ticketId: ticket1.id,
      senderId: customerUser.id,
      senderRole: "CUSTOMER",
      senderName: "Rajesh Sharma",
      message: "Hello team, I am traveling to London next week for a business conference and need my credit card international limit temporarily elevated to ₹3,00,000.",
    },
  });

  await prisma.ticketMessage.create({
    data: {
      ticketId: ticket1.id,
      senderId: staffUser.id,
      senderRole: "STAFF",
      senderName: "Priya Sharma (Senior Teller)",
      message: "Greetings Mr. Sharma, we have initiated the temporary limit increase verification against your gold tier profile. This should reflect on your dashboard within 2 hours.",
    },
  });

  // Deployments
  await prisma.deployment.create({
    data: {
      version: "v2.14.0",
      commitHash: "8f92a1c",
      environment: "PRODUCTION",
      deployedBy: "devops@cpb.bank",
      status: "SUCCESS",
      deployedAt: new Date(Date.now() - 2 * 86400000),
      rollbackNotes: "Stable build with low-latency ledger pipeline",
    },
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      actorId: adminUser.id,
      actorName: "Devendra Rao (CISO)",
      actorRole: "ADMIN",
      action: "SYSTEM_INITIALIZE_CORE_LEDGER",
      targetType: "SYSTEM_CONFIG",
      targetId: "GLOBAL",
      ipAddress: "10.0.4.12",
      userAgent: "CPB-Admin-Console/2.14.0",
      metadata: JSON.stringify({ note: "Initial core banking configuration and ledger engine validation" }),
      severity: "INFO",
    },
  });

  console.log("🎉 Seeding completed with 1 dedicated account per portal!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
