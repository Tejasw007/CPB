"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-container-lowest/90 backdrop-blur-xl shadow-sm border-b border-outline-variant"
          : "bg-surface-container-lowest/80 backdrop-blur-md"
      }`}
    >
      {/* Top Segment Bar */}
      <div className="hidden lg:block bg-on-surface text-surface-variant h-8 px-margin-desktop">
          <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between text-[11px] font-label-sm uppercase tracking-wider">
              <div className="flex items-center gap-space-md">
                  <span className="text-primary-fixed font-bold">Segment:</span>
                  <div className="flex items-center gap-space-sm">
                      <a className="text-surface-container-lowest font-medium hover:text-primary-fixed transition-colors" href="#">Personal</a>
                      <span className="text-secondary/50">|</span>
                      <a className="hover:text-surface-container-lowest transition-colors" href="#">NRI</a>
                      <span className="text-secondary/50">|</span>
                      <a className="hover:text-surface-container-lowest transition-colors" href="#">Business / SME</a>
                      <span className="text-secondary/50">|</span>
                      <a className="hover:text-surface-container-lowest transition-colors" href="#">Corporate</a>
                      <span className="text-secondary/50">|</span>
                      <a className="hover:text-surface-container-lowest transition-colors" href="#">Institutional</a>
                      <span className="text-secondary/50">|</span>
                      <a className="hover:text-surface-container-lowest transition-colors" href="#">Wealth</a>
                  </div>
              </div>
              <div className="flex items-center gap-space-lg">
                  <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-surface-container-lowest">call</span>
                      <span>24x7 Care: <strong className="text-surface-container-lowest">1800-419-0068</strong></span>
                  </div>
                  <a className="hover:text-surface-container-lowest transition-colors flex items-center gap-1" href="#">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> Locate Branch & ATM
                  </a>
                  <a className="hover:text-surface-container-lowest transition-colors" href="#">Rates & Charges</a>
                  <a className="hover:text-surface-container-lowest transition-colors" href="#">Regulatory Disclosures</a>
              </div>
          </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-margin-desktop flex items-center justify-between py-space-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-space-xs group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">
              account_balance
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-title-md font-title-md text-on-surface font-bold tracking-tight">
              Code Paglu Bank
            </span>
            <span className="text-[10px] font-label-sm text-primary tracking-widest uppercase">
              Commercial Bank
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          <Link
            href="/"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Accounts
          </Link>
          <Link
            href="/cards"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Cards
          </Link>
          <Link
            href="/loans"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Loans
          </Link>
          <Link
            href="#"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Investments & Wealth
          </Link>
          <Link
            href="#"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Digital Banking
          </Link>
          <Link
            href="/security"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Security Center
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-space-sm">
          <div className="relative hidden lg:block mr-space-sm">
            <input
              className="w-48 h-9 pl-8 pr-3 bg-surface-container-low/50 text-body-sm font-body-sm text-on-surface placeholder:text-outline rounded-full focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant"
              placeholder="Search IFS, schemes..." type="text" 
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-outline">search</span>
          </div>

          <Link
            href="/customer/login"
            className="bg-gradient-to-r from-primary to-primary-fixed text-on-primary font-label-lg text-label-lg px-space-lg py-2 rounded-full shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>NetBanking</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="xl:hidden text-on-surface p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-[28px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-surface-container-lowest border-b border-outline-variant overflow-hidden"
          >
            <nav className="flex flex-col px-margin-desktop py-space-md gap-space-md">
              <Link href="/" className="text-title-md text-on-surface" onClick={() => setMobileMenuOpen(false)}>Accounts</Link>
              <Link href="/cards" className="text-title-md text-on-surface" onClick={() => setMobileMenuOpen(false)}>Cards</Link>
              <Link href="/loans" className="text-title-md text-on-surface" onClick={() => setMobileMenuOpen(false)}>Loans</Link>
              <Link href="#" className="text-title-md text-on-surface" onClick={() => setMobileMenuOpen(false)}>Investments & Wealth</Link>
              <Link href="#" className="text-title-md text-on-surface" onClick={() => setMobileMenuOpen(false)}>Digital Banking</Link>
              <Link href="/security" className="text-title-md text-on-surface" onClick={() => setMobileMenuOpen(false)}>Security Center</Link>
              <hr className="border-outline-variant" />
              <Link href="/customer/login" className="bg-primary text-on-primary text-center py-space-sm rounded-full flex items-center justify-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <span className="material-symbols-outlined text-[18px]">lock</span> NetBanking Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
