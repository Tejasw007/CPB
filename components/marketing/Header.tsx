import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      <div className="bg-on-background text-surface-variant h-9 px-margin-desktop">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between text-label-sm font-label-sm">
          <div className="flex items-center gap-space-md">
            <span className="text-surface-container-lowest font-semibold tracking-wider">
              SEGMENT:
            </span>
            <div className="flex items-center gap-space-sm">
              <Link
                className="text-surface-container-lowest font-medium hover:text-primary-fixed-dim transition-colors"
                href="/"
              >
                Personal
              </Link>
              <span className="text-secondary">|</span>
              <Link
                className="text-surface-variant hover:text-surface-container-lowest transition-colors"
                href="#"
              >
                NRI
              </Link>
              <span className="text-secondary">|</span>
              <Link
                className="text-surface-variant hover:text-surface-container-lowest transition-colors"
                href="#"
              >
                Business / SME
              </Link>
              <span className="text-secondary">|</span>
              <Link
                className="text-surface-variant hover:text-surface-container-lowest transition-colors"
                href="#"
              >
                Corporate
              </Link>
              <span className="text-secondary">|</span>
              <Link
                className="text-surface-variant hover:text-surface-container-lowest transition-colors"
                href="#"
              >
                Institutional
              </Link>
              <span className="text-secondary">|</span>
              <Link
                className="text-surface-variant hover:text-surface-container-lowest transition-colors"
                href="#"
              >
                Wealth
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px] text-surface-container-lowest">
                call
              </span>
              <span className="text-surface-variant">24x7 Care:</span>
              <span className="text-surface-container-lowest font-semibold font-financial-numeric">
                1800-419-0068
              </span>
            </div>
            <Link
              className="hover:text-surface-container-lowest transition-colors flex items-center gap-space-xs"
              href="#"
            >
              <span className="material-symbols-outlined text-[14px]">
                location_on
              </span>
              Locate Branch & ATM
            </Link>
            <Link
              className="hover:text-surface-container-lowest transition-colors flex items-center gap-space-xs"
              href="#"
            >
              <span className="material-symbols-outlined text-[14px]">
                percent
              </span>
              Rates & Charges
            </Link>
            <Link
              className="hover:text-surface-container-lowest transition-colors"
              href="#"
            >
              Regulatory Disclosures
            </Link>
            <div className="flex items-center gap-space-xs bg-inverse-surface px-space-xs py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">
                translate
              </span>
              <span className="text-surface-container-lowest">EN / हिन्दी</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 bg-surface-container-lowest px-margin-desktop">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-md">
            <img
              alt="CPB Code Paglu Bank Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZWHXbXdudoSMhFLDsnn9TAtobCsWRsLTwKvpJhqKXCcb6P5w-0EiZZ8t5j88HQi1qLu0gMBR_AbvIBHGKnOBp5-a7edeAteqj2wbS_aCXtQw0t0tjURR7ScCwdF0MfRMI2HMCRDxDggd8DwRjLF5LvtiMEyW2m3ZeOXk72uWsK8eNWENo9x31SskPcoVCvMfPldavvulH68h3QIHEEf8UjBxgJ3yXuqJ1TdWKBJvxTCiBMBiO-8Nqs0I"
            />
            <div className="flex flex-col">
              <span className="text-headline-sm font-headline-sm text-primary tracking-tight font-bold leading-none">
                CPB BANK
              </span>
              <span className="text-label-sm font-label-sm text-secondary tracking-widest uppercase text-[9px]">
                Code Paglu Commercial Bank
              </span>
            </div>
          </div>
          <nav className="hidden xl:flex items-center gap-space-lg h-full">
            <Link
              className="transition-colors h-full flex items-center text-primary font-bold border-b-2 border-primary"
              href="/"
            >
              Accounts
            </Link>
            <Link
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors h-full flex items-center"
              href="/cards"
            >
              Cards
            </Link>
            <Link
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors h-full flex items-center"
              href="/loans"
            >
              Loans
            </Link>
            <Link
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors h-full flex items-center"
              href="#"
            >
              Investments & Wealth
            </Link>
            <Link
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors h-full flex items-center"
              href="#"
            >
              Digital Banking
            </Link>
            <Link
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors h-full flex items-center"
              href="/security"
            >
              Security & Fraud Center
            </Link>
            <Link
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors h-full flex items-center"
              href="#"
            >
              Locator
            </Link>
          </nav>
          <div className="flex items-center gap-space-md">
            <div className="relative hidden lg:block">
              <input
                className="w-56 h-9 pl-8 pr-3 bg-surface-container-low text-body-sm font-body-sm text-on-surface placeholder:text-outline rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Search IFSC, schemes, forms..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-outline">
                search
              </span>
            </div>
            <Link
              className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
              href="/customer/login"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>NetBanking</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary-container text-on-secondary-container h-10 px-margin-desktop flex items-center">
        <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between text-body-sm font-body-sm">
          <div className="flex items-center gap-space-sm overflow-hidden">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
              verified_user
            </span>
            <span className="font-label-md font-label-md uppercase tracking-wider text-primary shrink-0">
              RBI Advisory:
            </span>
            <span className="truncate text-on-surface-variant">
              Never share your OTP, UPI PIN, CVV, or NetBanking password with
              anyone. Bank officials will never solicit credentials.
            </span>
          </div>
          <div className="shrink-0 ml-space-md flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-error text-[16px]">
              warning
            </span>
            <span className="text-label-sm font-label-sm">
              National Cyber Fraud Helpline:
            </span>
            <span className="font-bold font-financial-numeric text-label-md text-error">
              1930
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
