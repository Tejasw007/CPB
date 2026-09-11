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
          ? "bg-surface-container-lowest/80 backdrop-blur-lg shadow-sm border-b border-outline-variant py-space-sm"
          : "bg-transparent py-space-md"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-margin-desktop flex items-center justify-between">
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
            <span className="text-label-sm font-label-sm text-primary tracking-widest uppercase">
              Premium
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-space-lg">
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
            href="/security"
            className="text-label-lg font-label-lg text-on-surface hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
          >
            Security
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-space-sm">
          <Link
            href="/customer/login"
            className="text-label-lg font-label-lg text-primary hover:text-on-primary-fixed-variant px-space-md py-space-sm rounded-full transition-colors"
          >
            Login
          </Link>
          <Link
            href="#process-flow"
            className="bg-gradient-to-r from-primary to-primary-fixed text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-full shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-space-xs"
          >
            <span>Open Account</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-on-surface p-2"
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
            className="md:hidden bg-surface-container-lowest border-b border-outline-variant overflow-hidden"
          >
            <nav className="flex flex-col px-margin-desktop py-space-md gap-space-md">
              <Link
                href="/cards"
                className="text-title-md text-on-surface"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cards
              </Link>
              <Link
                href="/loans"
                className="text-title-md text-on-surface"
                onClick={() => setMobileMenuOpen(false)}
              >
                Loans
              </Link>
              <Link
                href="/security"
                className="text-title-md text-on-surface"
                onClick={() => setMobileMenuOpen(false)}
              >
                Security
              </Link>
              <hr className="border-outline-variant" />
              <Link
                href="/customer/login"
                className="text-title-md text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login to NetBanking
              </Link>
              <Link
                href="#process-flow"
                className="bg-primary text-on-primary text-center py-space-sm rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Open Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
