import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-on-background text-surface-container-high">
      <div className="max-w-[1280px] mx-auto px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-gutter-desktop mb-space-xl">
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-label-lg font-label-lg text-surface-container-lowest uppercase tracking-wider mb-space-xs">
              About CPB Bank
            </h3>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Corporate Profile
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Board of Directors & Leadership
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Financial Results & Reports
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Investor Relations
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Career Opportunities
            </Link>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-label-lg font-label-lg text-surface-container-lowest uppercase tracking-wider mb-space-xs">
              Products & Solutions
            </h3>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Savings & Current A/C
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Fixed & Recurring Deposits
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Retail Home & Auto Loans
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Corporate Credit Facilities
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Trade Finance & Forex
            </Link>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-label-lg font-label-lg text-surface-container-lowest uppercase tracking-wider mb-space-xs">
              Customer Service
            </h3>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              24x7 Helpdesk: 1800-419-0068
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Banking Ombudsman Scheme
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Download Banking Forms
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Grievance Redressal Matrix
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Doorstep Banking Services
            </Link>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-label-lg font-label-lg text-surface-container-lowest uppercase tracking-wider mb-space-xs">
              Security & Safety
            </h3>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Cyber Fraud Awareness
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Phishing Defense Guidelines
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              SIM Swap Protection Advisory
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Report Unauthorised Trans (1930)
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Emergency Card Blocking
            </Link>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-label-lg font-label-lg text-surface-container-lowest uppercase tracking-wider mb-space-xs">
              Regulatory & Compliance
            </h3>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              RBI Monetary Policy Updates
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Citizen's Charter
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Fair Practices Code (FPC)
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Schedule of Charges & Fees
            </Link>
            <Link
              className="text-body-sm font-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Statutory Audit & Disclosures
            </Link>
          </div>
        </div>
        <div className="bg-inverse-surface p-space-md rounded-lg mb-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-tertiary-fixed text-[32px]">
              shield
            </span>
            <div className="flex flex-col">
              <span className="text-label-lg font-label-lg text-surface-container-lowest font-semibold">
                DICGC Deposit Insurance Notice
              </span>
              <span className="text-body-sm font-body-sm text-surface-variant">
                Bank deposits are insured by DICGC (Deposit Insurance and Credit
                Guarantee Corporation) up to ₹5,00,000 per depositor.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg shrink-0">
            <div className="flex items-center gap-space-xs text-surface-variant text-label-sm font-label-sm">
              <span className="material-symbols-outlined text-[16px] text-surface-container-lowest">
                lock
              </span>
              <span>256-bit TLS Encrypted</span>
            </div>
            <div className="flex items-center gap-space-xs text-surface-variant text-label-sm font-label-sm">
              <span className="material-symbols-outlined text-[16px] text-surface-container-lowest">
                verified
              </span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between text-label-sm font-label-sm text-surface-variant pt-space-md gap-space-sm">
          <p>
            Copyright © 2025 Code Paglu Bank Limited (CPB). Regulated by the
            Reserve Bank of India.
          </p>
          <div className="flex items-center gap-space-md">
            <Link
              className="hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Terms of Use
            </Link>
            <Link
              className="hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Hyperlink Policy
            </Link>
            <Link
              className="hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
