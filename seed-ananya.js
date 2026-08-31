const { PrismaClient, AccountType, AccountStatus, AccountTier, CardType, CardStatus, FdStatus } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const ananyaEmail = "ananya@cpb.bank";
  const existingUser = await prisma.user.findUnique({ where: { email: ananyaEmail } });
  
  if (existingUser) {
    console.log("Ananya already exists!");
    return;
  }

  const branch = await prisma.branch.findUnique({ where: { code: 'CPB001' } });
  if (!branch) throw new Error("Branch not found");

  const ananyaPass = await bcrypt.hash("password123", 10);
  
  const user = await prisma.user.create({
    data: {
      id: "customer-ananya",
      name: "Ananya Patel",
      email: ananyaEmail,
      password: ananyaPass,
      phone: "+91 98200 44555",
      role: "CUSTOMER",
      kycStatus: "VERIFIED",
      status: "ACTIVE",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      panNumber: "BXYPA7721L",
      aadhaarNumber: "•••• •••• 9912",
    }
  });

  const account = await prisma.account.create({
    data: {
      userId: user.id,
      accountNumber: "5591028374",
      branchCode: branch.code,
      ifsc: branch.ifsc,
      type: "SAVINGS",
      balance: 154200.50,
      currency: "INR",
      status: "ACTIVE",
      tier: "SILVER",
      upiId: "9820044555@cpb"
    }
  });
  
  console.log("Successfully seeded Ananya Patel!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
