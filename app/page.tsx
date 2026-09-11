"use client";
import React from 'react';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import Link from 'next/link';
import { EmiCalculator } from '@/components/marketing/EmiCalculator';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-0 min-h-screen bg-background" id="page-content">
        <div className="max-w-[1280px] mx-auto px-margin-desktop py-space-lg">
            <div className="flex flex-col w-full">
                
                <nav aria-label="Breadcrumb"
                    className="flex items-center gap-space-xs text-body-sm font-body-sm text-secondary mb-space-md">
                    <a className="hover:text-primary transition-colors" href="#">Home</a>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-on-surface font-semibold">Accounts &amp; Deposits</span>
                </nav>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full rounded-2xl overflow-hidden mb-space-2xl shadow-2xl bg-surface-container-lowest border border-outline-variant group"
                >
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src="/images/hero_home_1789122875387.jpg" 
                            alt="Premium Banking abstract composition"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 px-space-xl py-[120px] md:w-2/3">
                        <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm font-label-sm uppercase tracking-widest mb-space-md backdrop-blur-md">
                            <span className="material-symbols-outlined text-[16px]">assured_workload</span>
                            RBI Regulated Scheduled Commercial Bank
                        </div>
                        <h1 className="text-display-sm md:text-display-md font-display-sm md:font-display-md text-on-surface tracking-tight mb-space-md">
                            Elevate Your Banking with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Code Paglu</span>
                        </h1>
                        <p className="text-body-lg font-body-lg text-on-surface-variant mb-space-xl max-w-xl">
                            Experience transparent interest yields, multi-tier security, and seamless paperless digital onboarding designed for the modern economy.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
                            <a className="inline-flex items-center justify-center gap-space-sm bg-gradient-to-r from-primary to-primary-container hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 text-on-primary font-label-lg text-label-lg px-space-xl py-space-md rounded-full transition-all duration-300"
                                href="#process-flow">
                                <span>Open Account Instantly</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </a>
                            <a className="inline-flex items-center justify-center gap-space-sm bg-surface-container-lowest/50 backdrop-blur-md border border-outline hover:bg-surface-container-low text-on-surface font-label-lg text-label-lg px-space-xl py-space-md rounded-full transition-colors"
                                href="#quick-calculator">
                                <span className="material-symbols-outlined text-[20px]">calculate</span>
                                <span>Yield Calculator</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
                
                <section aria-label="Deposit Rates Strip"
                    className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm mb-space-lg">
                    <div
                        className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-space-md mb-space-md bg-surface-container-low p-space-md rounded-lg gap-space-sm">
                        <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-primary text-[24px]">trending_up</span>
                            <div>
                                <h2 className="text-headline-sm font-headline-sm text-on-surface">Standard Card Rates for
                                    Retail Term &amp; Savings Deposits</h2>
                                <p className="text-body-sm font-body-sm text-secondary">Effective w.e.f. Current Financial
                                    Quarter | Applicable for amounts &lt; ₹3.00 Crores</p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-space-xs text-label-sm font-label-sm text-tertiary-container bg-tertiary-fixed px-space-sm py-1 rounded">
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            <span>Senior Citizen +0.50% p.a. benefit applicable across select tenures</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
                        
                        <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
                            <div>
                                <span
                                    className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">Savings
                                    Account</span>
                                <div className="flex items-baseline gap-space-xs mt-space-xs">
                                    <span
                                        className="text-headline-xl font-headline-xl text-primary font-financial-numeric">4.00%</span>
                                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">p.a.
                                        max</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">Calculated on
                                    daily end-of-day balances, paid quarterly.</p>
                            </div>
                            <div
                                className="mt-space-md pt-space-sm bg-surface-container px-space-xs py-1 rounded text-label-sm font-label-sm text-primary flex items-center justify-between">
                                <span>Tier: Above ₹1.00 Lakh</span>
                                <span className="font-financial-numeric">3.50% - 4.00%</span>
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
                            <div>
                                <span
                                    className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">Regular
                                    FD (1 Year)</span>
                                <div className="flex items-baseline gap-space-xs mt-space-xs">
                                    <span
                                        className="text-headline-xl font-headline-xl text-primary font-financial-numeric">7.10%</span>
                                    <span
                                        className="text-label-sm font-label-sm text-on-surface-variant font-medium">p.a.</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">Guaranteed
                                    yield with quarterly compounding option.</p>
                            </div>
                            <div
                                className="mt-space-md pt-space-sm bg-surface-container px-space-xs py-1 rounded text-label-sm font-label-sm text-primary flex items-center justify-between">
                                <span>Senior Citizen Yield</span>
                                <span className="font-financial-numeric font-bold">7.60% p.a.</span>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-high p-space-md rounded-lg flex flex-col justify-between relative shadow-sm">
                            <div
                                className="absolute -top-3 right-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                Flagship Tenure
                            </div>
                            <div>
                                <span
                                    className="text-label-sm font-label-sm uppercase tracking-wider text-primary font-bold">CPB
                                    444-Day Special FD</span>
                                <div className="flex items-baseline gap-space-xs mt-space-xs">
                                    <span
                                        className="text-headline-xl font-headline-xl text-primary font-financial-numeric">7.45%</span>
                                    <span className="text-label-sm font-label-sm text-on-surface font-medium">p.a.</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">Peak return
                                    tenure designed for maximized capital appreciation.</p>
                            </div>
                            <div
                                className="mt-space-md pt-space-sm bg-surface-container-lowest px-space-xs py-1 rounded text-label-sm font-label-sm text-primary font-semibold flex items-center justify-between">
                                <span>Senior Citizens:</span>
                                <span className="font-financial-numeric text-primary font-bold text-headline-sm">7.95%
                                    p.a.</span>
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
                            <div>
                                <span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">Tax
                                    Saver 5-Yr FD (80C)</span>
                                <div className="flex items-baseline gap-space-xs mt-space-xs">
                                    <span
                                        className="text-headline-xl font-headline-xl text-primary font-financial-numeric">7.25%</span>
                                    <span
                                        className="text-label-sm font-label-sm text-on-surface-variant font-medium">p.a.</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">Deduction up to
                                    ₹1,50,000 per FY with 5-year lock-in.</p>
                            </div>
                            <div
                                className="mt-space-md pt-space-sm bg-surface-container px-space-xs py-1 rounded text-label-sm font-label-sm text-primary flex items-center justify-between">
                                <span>Lock-in Period</span>
                                <span className="font-semibold">60 Months Mandatory</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <EmiCalculator />
                
                <section aria-label="Core Account Types" className="mb-space-lg">
                    <div className="mb-space-md">
                        <h2 className="text-headline-lg font-headline-lg text-on-background tracking-tight">Institutional
                            &amp; Retail Core Accounts</h2>
                        <p className="text-body-md font-body-md text-on-surface-variant">Choose from specialized checking,
                            high-yield savings, salary structures, or commercial trade accounts.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter-desktop">
                        
                        <article
                            className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <div
                                        className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span
                                            className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                                    </div>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-container px-2 py-0.5 rounded text-primary font-semibold">Retail
                                        Flagship</span>
                                </div>
                                <h3 className="text-headline-md font-headline-md text-on-surface">CPB Advantage Savings</h3>
                                <p className="text-body-sm font-body-sm text-secondary mt-space-xs">General retail
                                    high-liquidity checking account with modern digital privileges.</p>
                                <div
                                    className="mt-space-md pt-space-sm bg-surface-container-low p-space-sm rounded-lg space-y-space-sm">
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>₹10,000</strong> Average Monthly Balance (AMB) requirement in
                                            Metro branches.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Free Platinum RuPay / Visa Chip</strong> contactless debit card
                                            issued instantly.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Unlimited Free ATM</strong> cash withdrawals across all CPB
                                            network ATMs.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Zero digital charges</strong> on NEFT, RTGS, and IMPS through
                                            NetBanking &amp; CPB Mobile App.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-space-lg space-y-space-xs">
                                <a className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
                                    href="#">
                                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                                    <span>Open Instantly with Video KYC</span>
                                </a>
                                <a className="w-full inline-flex items-center justify-center text-body-sm font-body-sm text-primary hover:text-on-primary-fixed-variant transition-colors py-1"
                                    href="#">
                                    View MITC &amp; Schedule of Fees
                                </a>
                            </div>
                        </article>
                        
                        <article
                            className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <div
                                        className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[24px]">badge</span>
                                    </div>
                                    <span
                                        className="text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed font-semibold px-2 py-0.5 rounded">Corporate
                                        Tie-up</span>
                                </div>
                                <h3 className="text-headline-md font-headline-md text-on-surface">CPB Smart Salary</h3>
                                <p className="text-body-sm font-body-sm text-secondary mt-space-xs">Zero-balance
                                    institutional payroll account engineered for salaried corporate personnel.</p>
                                <div
                                    className="mt-space-md pt-space-sm bg-surface-container-low p-space-sm rounded-lg space-y-space-sm">
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Zero Balance Account:</strong> No monthly average balance penalty
                                            or maintenance fee.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Free ₹50 Lakh</strong> complimentary accidental &amp; air death
                                            insurance cover.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>2 Complimentary Lounge Visits</strong> per calendar quarter at
                                            domestic airports.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Preferential rate discount</strong> (25 bps) on Retail Home &amp;
                                            Personal Loans.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-space-lg space-y-space-xs">
                                <a className="w-full inline-flex items-center justify-center gap-space-xs bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
                                    href="#">
                                    <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                                    <span>Corporate Tie-Up Request</span>
                                </a>
                                <a className="w-full inline-flex items-center justify-center text-body-sm font-body-sm text-primary hover:text-on-primary-fixed-variant transition-colors py-1"
                                    href="#">
                                    Download Corporate Enrollment Deck
                                </a>
                            </div>
                        </article>
                        
                        <article
                            className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <div
                                        className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[24px]">savings</span>
                                    </div>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-variant text-on-surface font-semibold px-2 py-0.5 rounded">Guaranteed
                                        ROI</span>
                                </div>
                                <h3 className="text-headline-md font-headline-md text-on-surface">CPB High-Yield FD</h3>
                                <p className="text-body-sm font-body-sm text-secondary mt-space-xs">Callable &amp;
                                    non-callable institutional fixed deposits with compounding schedules.</p>
                                <div
                                    className="mt-space-md pt-space-sm bg-surface-container-low p-space-sm rounded-lg space-y-space-sm">
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Yield up to 7.95% p.a.</strong> with monthly, quarterly, or
                                            cumulative payout options.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>DICGC Insured:</strong> Fully covered under RBI DICGC framework up
                                            to ₹5,00,000.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Instant Overdraft Facility:</strong> Draw credit up to 90% of
                                            deposit without breaking FD.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Auto-Renewal options</strong> with configurable maturity mandates
                                            online.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-space-lg space-y-space-xs">
                                <a className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
                                    href="#">
                                    <span className="material-symbols-outlined text-[18px]">add_task</span>
                                    <span>Book FD Online</span>
                                </a>
                                <a className="w-full inline-flex items-center justify-center text-body-sm font-body-sm text-primary hover:text-on-primary-fixed-variant transition-colors py-1"
                                    href="#">
                                    Check Premature Closure Terms
                                </a>
                            </div>
                        </article>
                        
                        <article
                            className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <div
                                        className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[24px]">store</span>
                                    </div>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-container-highest text-on-surface font-semibold px-2 py-0.5 rounded">MSME
                                        &amp; Traders</span>
                                </div>
                                <h3 className="text-headline-md font-headline-md text-on-surface">CPB Current Account</h3>
                                <p className="text-body-sm font-body-sm text-secondary mt-space-xs">Built for high-volume
                                    cash inflows, trader merchant settlement, and MSME operations.</p>
                                <div
                                    className="mt-space-md pt-space-sm bg-surface-container-low p-space-sm rounded-lg space-y-space-sm">
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>High Daily Cash Deposit:</strong> Up to ₹50,000/day free at base
                                            branch network.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>100 Free Cheque Leaves</strong> per calendar month with CTS-2010
                                            compatibility.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Integrated Soundbox &amp; POS:</strong> Zero MDR on UPI
                                            settlements via CPB QR.</span>
                                    </div>
                                    <div className="flex items-start gap-space-xs text-body-sm font-body-sm">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                        <span><strong>Bulk Beneficiary API</strong> integration for automated payroll
                                            &amp; vendor payouts.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-space-lg space-y-space-xs">
                                <a className="w-full inline-flex items-center justify-center gap-space-xs bg-inverse-surface hover:bg-on-background text-inverse-on-surface font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
                                    href="#">
                                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                                    <span>Explore Current Accounts</span>
                                </a>
                                <a className="w-full inline-flex items-center justify-center text-body-sm font-body-sm text-primary hover:text-on-primary-fixed-variant transition-colors py-1"
                                    href="#">
                                    Download MSME Tariff Sheet
                                </a>
                            </div>
                        </article>
                    </div>
                </section>
                
                <section aria-label="Account Opening Workflow"
                    className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm mb-space-lg" id="process-flow">
                    <div className="mb-space-lg">
                        <div
                            className="flex items-center gap-space-xs text-primary font-semibold text-label-sm font-label-sm uppercase tracking-wider mb-1">
                            <span className="material-symbols-outlined text-[16px]">bolt</span>
                            Paperless Digital Onboarding
                        </div>
                        <h2 className="text-headline-lg font-headline-lg text-on-surface">Open an Account in 4 Simple Steps
                        </h2>
                        <p className="text-body-md font-body-md text-on-surface-variant">Approved under RBI Master Direction
                            on Digital KYC. No branch visit mandatory.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop relative">
                        
                        <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-md">
                                    <span
                                        className="text-headline-md font-headline-md font-financial-numeric text-primary bg-surface-container-lowest w-10 h-10 rounded-full flex items-center justify-center shadow-sm">01</span>
                                    <span
                                        className="material-symbols-outlined text-secondary text-[24px]">phonelink_ring</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">Basic Details &amp; Mobile
                                    OTP</h3>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">
                                    Enter your mobile number linked with Aadhaar, verify with a one-time passcode (OTP),
                                    and enter essential demographic details.
                                </p>
                            </div>
                            <div
                                className="mt-space-md text-label-sm font-label-sm text-secondary bg-surface-container px-space-sm py-1 rounded">
                                Estimated Time: 45 Seconds
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-md">
                                    <span
                                        className="text-headline-md font-headline-md font-financial-numeric text-primary bg-surface-container-lowest w-10 h-10 rounded-full flex items-center justify-center shadow-sm">02</span>
                                    <span
                                        className="material-symbols-outlined text-secondary text-[24px]">fingerprint</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">DigiLocker KYC
                                    Verification</h3>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">
                                    Directly fetch verified Aadhaar XML and Permanent Account Number (PAN) records with
                                    one-touch DigiLocker consent.
                                </p>
                            </div>
                            <div
                                className="mt-space-md text-label-sm font-label-sm text-secondary bg-surface-container px-space-sm py-1 rounded">
                                Zero Document Uploads
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-md">
                                    <span
                                        className="text-headline-md font-headline-md font-financial-numeric text-primary bg-surface-container-lowest w-10 h-10 rounded-full flex items-center justify-center shadow-sm">03</span>
                                    <span className="material-symbols-outlined text-secondary text-[24px]">videocam</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">3-Minute Video KYC</h3>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">
                                    Connect via encrypted video link with a verified CPB Compliance Officer. Display
                                    original PAN card and sign on blank white paper.
                                </p>
                            </div>
                            <div
                                className="mt-space-md text-label-sm font-label-sm text-secondary bg-surface-container px-space-sm py-1 rounded">
                                Available 8:00 AM - 9:00 PM Daily
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-md">
                                    <span
                                        className="text-headline-md font-headline-md font-financial-numeric text-primary bg-surface-container-lowest w-10 h-10 rounded-full flex items-center justify-center shadow-sm">04</span>
                                    <span
                                        className="material-symbols-outlined text-secondary text-[24px]">credit_card</span>
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface">Instant Account Activation
                                </h3>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mt-space-xs">
                                    Account number, IFSC, and Virtual Platinum Debit Card issued immediately. NetBanking
                                    and UPI are enabled instantaneously.
                                </p>
                            </div>
                            <div
                                className="mt-space-md text-label-sm font-label-sm text-secondary bg-surface-container px-space-sm py-1 rounded">
                                Immediate Fund Transfer Ready
                            </div>
                        </div>
                    </div>
                </section>
                
                <section aria-label="Documentation Requirements"
                    className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm mb-space-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">
                        <div>
                            <h2 className="text-headline-md font-headline-md text-on-surface">KYC Documentation &amp;
                                Eligibility Checklist</h2>
                            <p className="text-body-sm font-body-sm text-secondary">Statutory requirements under Reserve
                                Bank of India Prevention of Money Laundering (PMLA) Rules.</p>
                        </div>
                        <div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
                            <span className="material-symbols-outlined text-[16px] text-primary">policy</span>
                            <span>Updated per RBI/DBR/2024-25/110 Guidelines</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr
                                    className="bg-surface-container-low text-on-surface text-label-md font-label-md uppercase tracking-wider">
                                    <th className="py-space-sm px-space-md rounded-l-lg">Entity Profile</th>
                                    <th className="py-space-sm px-space-md">Identity Proof (OVD)</th>
                                    <th className="py-space-sm px-space-md">Proof of Address (POA)</th>
                                    <th className="py-space-sm px-space-md">Tax Identification</th>
                                    <th className="py-space-sm px-space-md rounded-r-lg">Operating Mandate</th>
                                </tr>
                            </thead>
                            <tbody className="text-body-sm font-body-sm text-on-surface-variant">
                                <tr className="hover:bg-surface-container-low transition-colors">
                                    <td className="py-space-md px-space-md font-semibold text-on-surface">
                                        Individual (Resident Indian)
                                        <div className="text-label-sm font-label-sm text-secondary font-normal">Age 18+
                                            years</div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Aadhaar Biometric / DigiLocker XML, Valid Passport, Voter ID Card, or Driving
                                        License.
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Aadhaar address or utility bill (Electricity/Piped Gas) not older than 2
                                        calendar months.
                                    </td>
                                    <td className="py-space-md px-space-md font-financial-numeric">
                                        PAN Card (Form 60/61 if PAN not allocated).
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Self-operated single mandate.
                                    </td>
                                </tr>
                                <tr
                                    className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
                                    <td className="py-space-md px-space-md font-semibold text-on-surface">
                                        Joint Accounts (Max 4 Holders)
                                        <div className="text-label-sm font-label-sm text-secondary font-normal">Family /
                                            Co-applicants</div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        OVD mandatory for each co-applicant individually.
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Permanent and Communication address proof for each individual applicant.
                                    </td>
                                    <td className="py-space-md px-space-md font-financial-numeric">
                                        PAN Cards for all secondary and tertiary holders.
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Either or Survivor / Former or Survivor / Jointly Operated.
                                    </td>
                                </tr>
                                <tr className="hover:bg-surface-container-low transition-colors">
                                    <td className="py-space-md px-space-md font-semibold text-on-surface">
                                        Sole Proprietorship Firm
                                        <div className="text-label-sm font-label-sm text-secondary font-normal">Traders,
                                            Retailers, Agencies</div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Proprietor's Aadhaar &amp; PAN + 2 entity registration certificates.
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        GST Registration Certificate (GSTR-06), Shops &amp; Establishment Act license,
                                        or MSME Udyam Certificate.
                                    </td>
                                    <td className="py-space-md px-space-md font-financial-numeric">
                                        Proprietor PAN &amp; GSTIN Registration Certificate.
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        Proprietor Sole Signature Mandate under Firm Seal.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <section
                    className="bg-surface-container p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                        <div
                            className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-[28px]">support_agent</span>
                        </div>
                        <div>
                            <h3 className="text-headline-sm font-headline-sm text-on-surface">Need Guided Assistance for
                                Corporate Bulk Deposits?</h3>
                            <p className="text-body-sm font-body-sm text-on-surface-variant">
                                Connect with dedicated CPB Treasury &amp; Wealth Relationship Managers for non-callable
                                deposits above ₹3.00 Crores.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-space-sm shrink-0">
                        <a className="inline-flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-bright text-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
                            href="tel:18004190068">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            <span className="font-financial-numeric">1800-419-0068</span>
                        </a>
                        <a className="inline-flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm"
                            href="#">
                            <span>Request Treasury Callback</span>
                        </a>
                    </div>
                </section>
            </div>
            
            
        </div>
    </main>
      <Footer />
    </>
  );
}
