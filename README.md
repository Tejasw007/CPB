# 🏦 Code Paglu Bank (CPB) — Core Enterprise Banking Platform

A full-featured, production-ready core banking system with 4 dedicated portals, double-entry ledger architecture, WebAuthn phone fingerprint KYC & onboarding, and TiDB Cloud MySQL database.

---

## 🌟 Key Features

* **🏛️ 4 Dedicated Standalone Portals:**
  * **Customer Banking Portal (`/customer`):** Accounts, Statements, Double-Entry Ledger Transfers, 3D Cards, Loans, FDs, and One-Touch Phone Fingerprint Login.
  * **Staff Operations Portal (`/staff`):** Customer Onboarding Link Dispatcher, KYC Review Station with OCR, Counter Cash Ops with denomination grid, Maker-Checker Reversals.
  * **Executive Admin Portal (`/admin`):** Bank-wide KPIs, AML Suspicious Activity Radar, Dynamic APY & FD Spread Editor, RBAC Matrix.
  * **DevOps & Infrastructure Console (`/server`):** TiDB Cloud latency, Safe Read-Only SQL Console, 1-Click Rollback Station, Real Audit Logs.
* **📱 Customer Self-Onboarding Flow (`/onboard/[token]`):**
  * Staff dispatches onboarding links. Customers enter PAN + Aadhaar and register their **phone fingerprint sensor** via native WebAuthn for instant account opening.
* **🗄️ Database & Cloud Stack:**
  * Next.js 14 (App Router) + TypeScript + Tailwind CSS
  * Prisma ORM + TiDB Cloud (Serverless MySQL on AWS)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Tejasw007/CPB.git
cd CPB
npm install
```

### 2. Configure Environment
Create `.env`:
```env
DATABASE_URL="mysql://<user>:<password>@<host>:4000/cpb_bank?sslaccept=strict"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Push & Seed
```bash
npx prisma db push
npm run seed
```

### 4. Run Development Server
```bash
npm run dev -- -p 3000
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Dedicated Demo Credentials (1 Account Per Portal)

| Portal | Role | Name | Email | Password / Key |
|---|---|---|---|---|
| **Customer Portal** | `CUSTOMER` | Rajesh Sharma | `customer@cpb.bank` | `Customer@2026` *(or Fingerprint)* |
| **Staff Operations** | `STAFF` | Priya Sharma | `staff@cpb.bank` | `Staff@2026` *(ID: CPB-EMP-4012)* |
| **Admin & Risk** | `ADMIN` | Devendra Rao | `admin@cpb.bank` | `Admin@2026` *(2FA: 892104)* |
| **DevOps SRE** | `INFRA_ADMIN` | Karan Verma | `devops@cpb.bank` | `cpb_sre_sec_99182a4c` |

---

## 📄 License
MIT License • © 2026 Code Paglu Bank (CPB)
