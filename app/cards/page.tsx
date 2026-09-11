"use client";
import React from 'react';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-0 min-h-screen bg-background" id="page-content">
        <div className="max-w-[1280px] mx-auto px-margin-desktop py-space-lg">
            <div className="flex flex-col w-full">
                
                <div className="flex items-center justify-between py-space-sm mb-space-md">
                    <nav className="flex items-center gap-space-xs text-body-sm font-body-sm text-secondary">
                        <a className="hover:text-primary transition-colors" href="#">Home</a>
                        <span className="text-outline">/</span>
                        <a className="hover:text-primary transition-colors" href="#">Cards</a>
                        <span className="text-outline">/</span>
                        <span className="text-on-surface font-semibold">Commercial &amp; Retail Portfolio</span>
                    </nav>
                    <div
                        className="hidden sm:flex items-center gap-space-sm bg-surface-container px-space-md py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-label-sm font-label-sm uppercase tracking-wider text-primary">RBI Compliant
                            Tokenization Ready</span>
                    </div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full rounded-2xl overflow-hidden mb-space-2xl shadow-2xl bg-surface-container-lowest border border-outline-variant group"
                >
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src="/images/hero_cards_1789122892758.jpg" 
                            alt="Premium Black Metal Credit Card"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 px-space-xl py-[100px] md:w-3/4">
                        <span className="inline-block px-space-sm py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm font-label-sm uppercase tracking-widest mb-space-md backdrop-blur-md">
                            Portfolio Hub 2025
                        </span>
                        <h1 className="text-display-sm md:text-display-md font-display-sm md:font-display-md text-on-surface tracking-tight mb-space-xs">
                            CPB Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Credit & Forex</span> Cards
                        </h1>
                        <p className="text-body-lg font-body-lg text-on-surface-variant mb-space-xl max-w-2xl">
                            Precision-engineered for enterprise rewards, institutional travel, contactless payments, and multi-currency global expense management with 256-bit encrypted core ledger integration.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md bg-surface-container-lowest/40 backdrop-blur-md p-space-md rounded-xl border border-outline/50 w-full max-w-4xl">
                            <div className="flex flex-col">
                                <span className="text-label-sm font-label-sm uppercase text-secondary">Zero-Liability Period</span>
                                <span className="text-title-md font-title-md text-primary mt-1">Instant Freeze</span>
                                <span className="text-body-sm font-body-sm text-on-surface-variant">Via CPB App</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-label-sm font-label-sm uppercase text-secondary">Forex Currencies</span>
                                <span className="text-title-md font-title-md text-primary mt-1">16 Locked FX</span>
                                <span className="text-body-sm font-body-sm text-on-surface-variant">Multi-wallet hedge</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-label-sm font-label-sm uppercase text-secondary">Lounge Access</span>
                                <span className="text-title-md font-title-md text-primary mt-1">Unlimited</span>
                                <span className="text-body-sm font-body-sm text-on-surface-variant">Priority Pass</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-label-sm font-label-sm uppercase text-secondary">Interest-Free Window</span>
                                <span className="text-title-md font-title-md text-primary mt-1">Up to 50 Days</span>
                                <span className="text-body-sm font-body-sm text-on-surface-variant">Commercial tiers</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-lg">
                    <button
                        className="px-space-md py-2 text-label-lg font-label-lg rounded bg-primary text-on-primary shadow-sm whitespace-nowrap">
                        All Cards
                    </button>
                    <button
                        className="px-space-md py-2 text-label-lg font-label-lg rounded bg-surface-container text-on-surface-variant hover:bg-secondary-container transition-colors whitespace-nowrap">
                        Credit Cards
                    </button>
                    <button
                        className="px-space-md py-2 text-label-lg font-label-lg rounded bg-surface-container text-on-surface-variant hover:bg-secondary-container transition-colors whitespace-nowrap">
                        Corporate &amp; Business Cards
                    </button>
                    <button
                        className="px-space-md py-2 text-label-lg font-label-lg rounded bg-surface-container text-on-surface-variant hover:bg-secondary-container transition-colors whitespace-nowrap">
                        Debit Cards
                    </button>
                    <button
                        className="px-space-md py-2 text-label-lg font-label-lg rounded bg-surface-container text-on-surface-variant hover:bg-secondary-container transition-colors whitespace-nowrap">
                        Travel &amp; Forex Cards
                    </button>
                </div>
                
                <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm mb-space-xl">
                    <div className="flex items-center justify-between mb-space-md">
                        <div className="flex items-center gap-space-sm">
                            <span
                                className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-label-sm font-label-sm uppercase tracking-wide">FLAGSHIP</span>
                            <span className="text-label-md font-label-md text-secondary">Institutional Grade Tier 1</span>
                        </div>
                        <div className="flex items-center gap-space-xs text-secondary text-body-sm font-body-sm">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                            <span>DICGC Insurance Certified</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                        
                        <div className="lg:col-span-5 flex justify-center">
                            <div
                                className="w-full max-w-sm aspect-[1.586/1] bg-gradient-to-tr from-on-background via-primary to-primary-container rounded-xl p-space-lg flex flex-col justify-between text-on-primary shadow-xl relative overflow-hidden">
                                
                                <div
                                    className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]">
                                </div>
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex flex-col">
                                        <span
                                            className="text-label-sm font-label-sm tracking-widest text-primary-fixed uppercase font-semibold">Code
                                            Paglu Commercial Bank</span>
                                        <span
                                            className="text-headline-md font-headline-md tracking-tight font-bold">SAPPHIRE
                                            INSTITUTIONAL</span>
                                    </div>
                                    <span
                                        className="material-symbols-outlined text-surface-variant text-[28px]">contactless</span>
                                </div>
                                
                                <div className="flex items-center gap-space-md my-space-xs relative z-10">
                                    <svg className="w-11 h-9 rounded bg-surface-container-highest shadow-inner p-1 text-on-surface-variant"
                                        fill="none" viewBox="0 0 36 28">
                                        <rect fill="#E2E8F0" height="28" rx="4" width="36"></rect>
                                        <path d="M0 14h36M12 0v28M24 0v28" stroke="#94A3B8" stroke-width="1"></path>
                                        <rect fill="#CBD5E1" height="12" rx="2" width="12" x="12" y="8"></rect>
                                    </svg>
                                    <span
                                        className="text-label-sm font-label-sm tracking-widest text-surface-variant">INTERNATIONAL
                                        CORPORATE</span>
                                </div>
                                <div className="relative z-10 flex flex-col gap-1">
                                    <span className="font-financial-numeric text-financial-numeric tracking-widest">4291
                                        •••• •••• 8842</span>
                                    <div className="flex justify-between items-end mt-space-xs">
                                        <div className="flex flex-col">
                                            <span
                                                className="text-[9px] uppercase tracking-wider text-outline-variant leading-none">Account
                                                Holder</span>
                                            <span className="text-label-md font-label-md tracking-wide">VIKRAM S.
                                                MEHTA</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span
                                                className="text-[9px] uppercase tracking-wider text-outline-variant leading-none">Valid
                                                Thru</span>
                                            <span className="text-label-md font-label-md tracking-wide">09/30</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-7 h-7 rounded-full bg-error opacity-90 -mr-2.5"></div>
                                            <div className="w-7 h-7 rounded-full bg-tertiary-fixed opacity-90"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <h2 className="text-headline-lg font-headline-lg text-on-background mb-space-xs">CPB Sapphire
                                Institutional Credit Card</h2>
                            <p className="text-body-md font-body-md text-on-surface-variant mb-space-md">
                                Conceived for salaried leaders, CXOs, and treasury managers demanding friction-free
                                international utility with comprehensive zero-liability underwriting.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
                                <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                                    <span
                                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">flight_takeoff</span>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-label-lg text-on-surface">4X Acceleration
                                            Points</span>
                                        <span className="text-body-sm font-body-sm text-on-surface-variant">Flights, dining,
                                            and luxury international resort portfolios.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                                    <span
                                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">chair</span>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-label-lg text-on-surface">Airport Lounge
                                            Access</span>
                                        <span className="text-body-sm font-body-sm text-on-surface-variant">2 complimentary
                                            domestic lounge visits per calendar quarter.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                                    <span
                                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">currency_exchange</span>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-label-lg text-on-surface">Zero Foreign
                                            Markup</span>
                                        <span className="text-body-sm font-body-sm text-on-surface-variant">0% FX markup for
                                            foreign education, medical fees &amp; tuition.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                                    <span
                                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">volunteer_activism</span>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-label-lg text-on-surface">Annual Spend
                                            Waiver</span>
                                        <span className="text-body-sm font-body-sm text-on-surface-variant">Annual fee
                                            completely waived on ₹2,00,000 threshold spend.</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md bg-surface-container rounded-lg gap-space-md">
                                <div className="flex items-center gap-space-xl">
                                    <div>
                                        <span className="text-label-sm font-label-sm text-secondary uppercase block">Monthly
                                            Finance APR</span>
                                        <span
                                            className="text-headline-sm font-headline-sm text-on-surface font-financial-numeric">3.49%
                                            <span className="text-body-sm font-body-sm text-secondary font-normal">(41.88%
                                                p.a.)</span></span>
                                    </div>
                                    <div>
                                        <span className="text-label-sm font-label-sm text-secondary uppercase block">Joining
                                            / Annual Fee</span>
                                        <span
                                            className="text-headline-sm font-headline-sm text-on-surface font-financial-numeric">₹0
                                            <span className="text-body-sm font-body-sm text-secondary font-normal">Salary
                                                Acc.</span></span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-space-sm w-full sm:w-auto">
                                    <a className="px-space-md py-2.5 bg-primary-container hover:bg-primary text-on-primary text-label-lg font-label-lg rounded text-center transition-colors shadow-sm w-full sm:w-auto"
                                        href="#">
                                        Apply Online in 2 Mins
                                    </a>
                                    <a className="px-space-md py-2.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-label-lg font-label-lg rounded text-center transition-colors shadow-sm shrink-0"
                                        href="#">
                                        Schedule of Charges
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop mb-space-xl">
                    
                    <div
                        className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-space-md">
                                <div
                                    className="w-12 h-8 rounded bg-inverse-surface flex items-center justify-center text-surface-container-lowest">
                                    <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm uppercase">Commercial
                                    Suite</span>
                            </div>
                            <h3 className="text-headline-md font-headline-md text-on-surface mb-space-xs">CPB Business
                                Executive Card</h3>
                            <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                Structured for startup founders, SME entrepreneurs, and corporate directors seeking
                                consolidated ledger exports and automated tax filings.
                            </p>
                            <div className="space-y-space-sm mb-space-lg">
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                                    <span>Automated GST reconciliation &amp; ITC reports</span>
                                </div>
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                                    <span>50-Day interest-free enterprise credit period</span>
                                </div>
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                                    <span>Dual-tier dynamic spending sub-limits for staff</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="pt-space-md bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-body-sm font-body-sm text-secondary">Annual Fee</span>
                                <span
                                    className="text-headline-sm font-headline-sm text-on-surface font-financial-numeric">₹2,500
                                    <span className="text-label-sm font-label-sm text-secondary">+ GST</span></span>
                            </div>
                            <a className="w-full py-2 bg-primary hover:bg-primary-container text-on-primary text-label-lg font-label-lg rounded text-center transition-colors"
                                href="#">
                                Apply for Enterprise Suite
                            </a>
                        </div>
                    </div>
                    
                    <div
                        className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-space-md">
                                <div
                                    className="w-12 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary">
                                    <span className="material-symbols-outlined text-[20px]">public</span>
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-label-sm font-label-sm uppercase">Global
                                    FX</span>
                            </div>
                            <h3 className="text-headline-md font-headline-md text-on-surface mb-space-xs">Global
                                Multi-Currency Forex Card</h3>
                            <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                Shield cross-border corporate travel and foreign disbursements against exchange market
                                fluctuations with pre-locked institutional currency rates.
                            </p>
                            <div className="space-y-space-sm mb-space-lg">
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
                                    <span>Pre-load up to 16 currencies (USD, EUR, GBP, AED)</span>
                                </div>
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span
                                        className="material-symbols-outlined text-primary text-[18px]">trending_flat</span>
                                    <span>Zero cross-currency volatility once balance is loaded</span>
                                </div>
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">support</span>
                                    <span>Worldwide emergency cash delivery via Visa Assist</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="pt-space-md bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-body-sm font-body-sm text-secondary">Card Issuance Fee</span>
                                <span
                                    className="text-headline-sm font-headline-sm text-on-surface font-financial-numeric">₹150
                                    <span className="text-label-sm font-label-sm text-secondary">+ Nil markup</span></span>
                            </div>
                            <a className="w-full py-2 bg-primary hover:bg-primary-container text-on-primary text-label-lg font-label-lg rounded text-center transition-colors"
                                href="#">
                                Buy Forex Card
                            </a>
                        </div>
                    </div>
                    
                    <div
                        className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-space-md">
                                <div
                                    className="w-12 h-8 rounded bg-secondary flex items-center justify-center text-on-secondary">
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm uppercase">Retail
                                    Premier</span>
                            </div>
                            <h3 className="text-headline-md font-headline-md text-on-surface mb-space-xs">Platinum RuPay
                                Select Debit</h3>
                            <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                Seamlessly integrated with CPB Retail Savings Accounts. Features domestic UPI on Credit
                                linking and comprehensive personal accidental insurance.
                            </p>
                            <div className="space-y-space-sm mb-space-lg">
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">qr_code_2</span>
                                    <span>Link card to BHIM &amp; UPI for credit-like merchant scan</span>
                                </div>
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span
                                        className="material-symbols-outlined text-primary text-[18px]">health_and_safety</span>
                                    <span>Complimentary accidental insurance cover up to ₹10 Lakh</span>
                                </div>
                                <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[18px]">restaurant</span>
                                    <span>Up to 20% savings at 4,000+ dining partner outlets</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="pt-space-md bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-body-sm font-body-sm text-secondary">Annual Maintenance</span>
                                <span
                                    className="text-headline-sm font-headline-sm text-on-surface font-financial-numeric">₹300
                                    <span className="text-label-sm font-label-sm text-secondary">+ GST</span></span>
                            </div>
                            <a className="w-full py-2 bg-primary hover:bg-primary-container text-on-primary text-label-lg font-label-lg rounded text-center transition-colors"
                                href="#">
                                Link to Savings Account
                            </a>
                        </div>
                    </div>
                </div>
                
                <div
                    className="relative rounded-xl overflow-hidden shadow-sm mb-space-xl bg-inverse-surface text-surface-container-lowest">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-7 p-space-lg md:p-space-xl flex flex-col justify-center">
                            <div
                                className="flex items-center gap-space-xs text-tertiary-fixed text-label-sm font-label-sm uppercase tracking-widest mb-space-xs">
                                <span className="material-symbols-outlined text-[16px]">security</span>
                                <span>Regulatory Micro-Architecture</span>
                            </div>
                            <h2 className="text-headline-lg font-headline-lg text-surface-container-lowest mb-space-sm">
                                Tokenized Security with Zero Liability Framework</h2>
                            <p className="text-body-md font-body-md text-surface-variant mb-space-md">
                                CPB card numbers are encrypted with merchant-specific network tokens approved by RBI. No
                                online platform stores your actual 16-digit Primary Account Number (PAN), neutralizing
                                the impact of external database compromises.
                            </p>
                            <div className="flex flex-wrap gap-space-md">
                                <div
                                    className="flex items-center gap-space-xs text-label-md font-label-md text-surface-container-lowest">
                                    <span
                                        className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                                    <span>Dynamic CVV Option</span>
                                </div>
                                <div
                                    className="flex items-center gap-space-xs text-label-md font-label-md text-surface-container-lowest">
                                    <span
                                        className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                                    <span>Location Geofencing via Mobile App</span>
                                </div>
                                <div
                                    className="flex items-center gap-space-xs text-label-md font-label-md text-surface-container-lowest">
                                    <span
                                        className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                                    <span>Zero Unauthorized Loss After Reporting</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative h-64 lg:h-auto">
                            <img className="w-full h-full object-cover"
                                data-alt="Modern high security institutional banking command room with glowing blue interface monitors, network topologies, cyber fraud prevention telemetry, and pristine corporate architecture in deep navy and cobalt tones."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd2_kT2hrhR3LSDNTWYQakY2CSDS-m63JGrIDRmYXDCX5e-8uk4AocBQ_Bj-ShzBcGohjwjHyfxCxpeGK6mhmqbFcgbTLQoEmZGbBAE3erPAUWHxdVbDHs8ICgxz02aQnEZkZNKFZ9Ou3QKAJezxgD-9cZqn7DmIUlDeO1aN7zzlKrNF1oO23y8lqE-B86AqCAeekOlbiOu_6C-LNOLfFXsvRSIhLPKtsgmNudnBvm0cM4ND7jdtck" />
                            <div
                                className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-inverse-surface via-transparent to-transparent">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm mb-space-xl">
                    <div
                        className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-lg pb-space-sm">
                        <div>
                            <span
                                className="text-label-md font-label-md uppercase tracking-wider text-primary font-semibold">24x7
                                Self-Care Terminal</span>
                            <h2 className="text-headline-lg font-headline-lg text-on-background">Card Management Control
                                Panel</h2>
                        </div>
                        <div
                            className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded text-secondary text-body-sm font-body-sm">
                            <span className="material-symbols-outlined text-primary text-[18px]">encrypted</span>
                            <span>Secured via Two-Factor 2FA Authentication</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
                        
                        <a className="p-space-md bg-surface-container-low hover:bg-surface-container transition-all rounded-lg flex flex-col justify-between group"
                            href="#">
                            <div className="flex justify-between items-start mb-space-md">
                                <span
                                    className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">pin</span>
                                </span>
                                <span
                                    className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">arrow_forward</span>
                            </div>
                            <div>
                                <h4 className="text-label-lg font-label-lg text-on-surface mb-1">Set / Reset PIN</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Instant 4-digit ATM &amp;
                                    POS authorization pin generation via OTP.</p>
                            </div>
                        </a>
                        
                        <a className="p-space-md bg-surface-container-low hover:bg-surface-container transition-all rounded-lg flex flex-col justify-between group"
                            href="#">
                            <div className="flex justify-between items-start mb-space-md">
                                <span
                                    className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">tune</span>
                                </span>
                                <span
                                    className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">arrow_forward</span>
                            </div>
                            <div>
                                <h4 className="text-label-lg font-label-lg text-on-surface mb-1">Manage Usage Limits</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Toggle domestic,
                                    e-commerce, and contactless tap limits in real-time.</p>
                            </div>
                        </a>
                        
                        <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-space-md">
                                <span className="w-10 h-10 rounded bg-error text-on-error flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">ac_unit</span>
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input className="sr-only peer" id="freezeToggle" onChange={() => {}}
                                        type="checkbox" />
                                    <div
                                        className="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-outline after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-error">
                                    </div>
                                </label>
                            </div>
                            <div>
                                <h4 className="text-label-lg font-label-lg text-on-surface mb-1">Instant Card Freeze</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant" id="freezeStateText">
                                    Temporarily lock card transactions for misplaced instruments.</p>
                            </div>
                        </div>
                        
                        <a className="p-space-md bg-surface-container-low hover:bg-surface-container transition-all rounded-lg flex flex-col justify-between group"
                            href="#">
                            <div className="flex justify-between items-start mb-space-md">
                                <span
                                    className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                </span>
                                <span
                                    className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">arrow_forward</span>
                            </div>
                            <div>
                                <h4 className="text-label-lg font-label-lg text-on-surface mb-1">Convert to Easy EMI</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Transform big-ticket
                                    purchases into 3 to 24 month EMIs from 12.5% p.a.</p>
                            </div>
                        </a>
                        
                        <a className="p-space-md bg-surface-container-low hover:bg-surface-container transition-all rounded-lg flex flex-col justify-between group"
                            href="#">
                            <div className="flex justify-between items-start mb-space-md">
                                <span
                                    className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">card_giftcard</span>
                                </span>
                                <span
                                    className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">arrow_forward</span>
                            </div>
                            <div>
                                <h4 className="text-label-lg font-label-lg text-on-surface mb-1">Reward Catalog</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Redeem points for air
                                    miles, luxury hotel vouchers, or statement credit.</p>
                            </div>
                        </a>
                    </div>
                </div>
                
                <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm mb-space-xl">
                    <div className="flex items-center gap-space-sm mb-space-xs">
                        <span className="material-symbols-outlined text-primary text-[24px]">gavel</span>
                        <h2 className="text-headline-md font-headline-md text-on-surface">Most Important Terms &amp;
                            Conditions (MITC) &amp; Statutory Matrix</h2>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-lg max-w-4xl">
                        In adherence to Reserve Bank of India (RBI) Master Direction on Credit Card and Debit Card
                        Issuance and Conduct (2022/23), cardholders are provided standard statutory metrics governing
                        financial disclosures, late charges, and grievance turnaround.
                    </p>
                    
                    <div className="overflow-x-auto rounded-lg bg-surface-container-low">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-secondary-container text-on-secondary-container">
                                    <th className="p-space-md text-label-md font-label-md uppercase">Regulatory Category
                                    </th>
                                    <th className="p-space-md text-label-md font-label-md uppercase">Statutory Guideline /
                                        Rule</th>
                                    <th className="p-space-md text-label-md font-label-md uppercase text-right">CPB Tariff /
                                        Threshold</th>
                                    <th className="p-space-md text-label-md font-label-md uppercase text-right">Governing
                                        SLA</th>
                                </tr>
                            </thead>
                            <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-surface-container">
                                <tr className="hover:bg-surface-container transition-colors">
                                    <td className="p-space-md font-semibold text-on-surface">Billing Cycle Definition</td>
                                    <td className="p-space-md text-on-surface-variant">Statements generated on chosen
                                        calendar date (1st, 10th, or 20th). Minimum 20 days payment window prior to
                                        interest accrual.</td>
                                    <td className="p-space-md text-right font-financial-numeric text-primary">Monthly Ledger
                                    </td>
                                    <td className="p-space-md text-right text-secondary">Immediate (Auto-mail)</td>
                                </tr>
                                <tr className="hover:bg-surface-container transition-colors">
                                    <td className="p-space-md font-semibold text-on-surface">Minimum Amount Due (MAD)</td>
                                    <td className="p-space-md text-on-surface-variant">Includes 100% of EMIs, fees, taxes +
                                        5% of aggregate unsettled principal retail transactions.</td>
                                    <td className="p-space-md text-right font-financial-numeric text-primary">5% + T&amp;C
                                    </td>
                                    <td className="p-space-md text-right text-secondary">Due Date + 3 Days Grace</td>
                                </tr>
                                <tr className="hover:bg-surface-container transition-colors">
                                    <td className="p-space-md font-semibold text-on-surface">Late Payment Fee Tiers</td>
                                    <td className="p-space-md text-on-surface-variant">Tiered schedule applicable only if
                                        MAD is unpaid post 3-day grace cycle. ₹0 for balances &lt; ₹500.</td>
                                    <td className="p-space-md text-right font-financial-numeric text-primary">₹500 to ₹1,300
                                    </td>
                                    <td className="p-space-md text-right text-secondary">Next Statement Run</td>
                                </tr>
                                <tr className="hover:bg-surface-container transition-colors">
                                    <td className="p-space-md font-semibold text-on-surface">Foreign Currency Markup</td>
                                    <td className="p-space-md text-on-surface-variant">Applicable on overseas retail card
                                        swipes and e-commerce transactions executed in foreign currencies.</td>
                                    <td className="p-space-md text-right font-financial-numeric text-primary">0% to 1.99%
                                    </td>
                                    <td className="p-space-md text-right text-secondary">T+2 FX Settlement</td>
                                </tr>
                                <tr className="hover:bg-surface-container transition-colors">
                                    <td className="p-space-md font-semibold text-on-surface">Dispute Resolution Protocol
                                    </td>
                                    <td className="p-space-md text-on-surface-variant">Formal chargeback filings for
                                        uncredited ATM reversals or fraudulent merchant swipes.</td>
                                    <td className="p-space-md text-right font-financial-numeric text-primary">100% Auto-Hold
                                    </td>
                                    <td className="p-space-md text-right font-semibold text-primary">48 Hrs Acknowledgment
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div
                        className="mt-space-md p-space-md bg-surface-container rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                        <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-primary text-[20px]">headset_mic</span>
                            <div className="flex flex-col">
                                <span className="text-label-md font-label-md text-on-surface font-semibold">Grievance
                                    Redressal Officer</span>
                                <span className="text-body-sm font-body-sm text-on-surface-variant">Email:
                                    grievance.cards@cpbbank.in | Toll-Free Banking Ombudsman: 14448</span>
                            </div>
                        </div>
                        <a className="text-label-md font-label-md text-primary hover:underline shrink-0" href="#">
                            Download Comprehensive Cardholder Handbook (PDF, 4.2 MB)
                        </a>
                    </div>
                </div>
                
                
            </div>
        </div>
    </main>
      <Footer />
    </>
  );
}
