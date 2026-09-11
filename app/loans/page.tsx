"use client";
import React from 'react';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-36 min-h-screen bg-background" id="page-content">
        <div className="max-w-[1280px] mx-auto px-margin-desktop py-space-lg">
            <div className="flex flex-col w-full">
                
                <div
                    className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md text-label-md font-label-md text-on-surface-variant">
                    <div className="flex items-center gap-space-xs">
                        <a className="hover:text-primary transition-colors" href="#">Home</a>
                        <span className="text-outline-variant">/</span>
                        <a className="hover:text-primary transition-colors" href="#">Lending Solutions</a>
                        <span className="text-outline-variant">/</span>
                        <span className="text-primary font-semibold">Retail &amp; SME Loans</span>
                    </div>
                    <div className="flex items-center gap-space-md">
                        <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container rounded text-label-sm font-label-sm text-secondary">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            EBLR Benchmark Valid as of: Today, 08:30 IST
                        </span>
                        <span
                            className="hidden md:inline-flex items-center gap-1 text-label-sm font-label-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                            RBI Fair Lending Certified
                        </span>
                    </div>
                </div>
                
                <div
                    className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm mb-space-lg relative overflow-hidden">
                    <div className="max-w-3xl relative z-10">
                        <div className="flex items-center gap-space-xs mb-space-xs">
                            <span
                                className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded font-label-sm text-label-sm uppercase tracking-wider font-bold">Institutional
                                Financing Matrix</span>
                            <span className="text-label-sm font-label-sm text-secondary">| Sovereign &amp; Retail
                                Window</span>
                        </div>
                        <h2
                            className="text-headline-xl font-headline-xl text-on-surface tracking-tight font-bold mb-space-xs">
                            CPB Loans &amp; Institutional Financing</h2>
                        <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">Competitive
                            benchmark-linked rates, zero hidden charges, and regulatory digital in-principle sanction in
                            10 minutes.</p>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-10 pointer-events-none">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                            <path className="text-primary" d="M0 200L150 50L250 120L400 0V200H0Z" fill="currentColor">
                            </path>
                        </svg>
                    </div>
                </div>
                
                <section className="mb-space-xl">
                    <div className="flex items-center justify-between mb-space-md">
                        <div>
                            <h3 className="text-headline-md font-headline-md text-on-surface">Live External Benchmark
                                Dashboard</h3>
                            <p className="text-body-sm font-body-sm text-on-surface-variant">Pegged transparently to RBI
                                Repo Rate under Monetary Policy Committee Mandate</p>
                        </div>
                        <a className="text-label-lg font-label-lg text-primary hover:underline flex items-center gap-1"
                            href="#regulatory-notes">
                            <span>Policy Master Circular</span>
                            <span className="material-symbols-outlined text-[16px]">north_east</span>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
                        
                        <div
                            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="h-1 w-full bg-primary absolute top-0 left-0"></div>
                            <div>
                                <div
                                    className="flex items-center justify-between text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                                    <span>CPB Base Anchor</span>
                                    <span
                                        className="material-symbols-outlined text-[18px] text-primary">account_balance</span>
                                </div>
                                <div className="mt-2 text-headline-sm font-headline-sm text-on-surface">CPB RLLR</div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Repo Linked Lending Rate
                                </p>
                            </div>
                            <div className="mt-4 pt-space-xs flex items-baseline gap-1">
                                <span
                                    className="text-headline-lg font-headline-lg font-financial-numeric text-primary">9.10%</span>
                                <span className="text-label-sm font-label-sm text-secondary">p.a.</span>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="h-1 w-full bg-surface-tint absolute top-0 left-0"></div>
                            <div>
                                <div
                                    className="flex items-center justify-between text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                                    <span>Retail Priority</span>
                                    <span className="material-symbols-outlined text-[18px] text-surface-tint">home</span>
                                </div>
                                <div className="mt-2 text-headline-sm font-headline-sm text-on-surface">Home Loan</div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Salaried &amp;
                                    Professionals</p>
                            </div>
                            <div className="mt-4 pt-space-xs flex items-baseline gap-1">
                                <span className="text-label-sm font-label-sm text-on-surface-variant">From</span>
                                <span
                                    className="text-headline-lg font-headline-lg font-financial-numeric text-on-surface">8.40%</span>
                                <span className="text-label-sm font-label-sm text-secondary">p.a.</span>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="h-1 w-full bg-secondary absolute top-0 left-0"></div>
                            <div>
                                <div
                                    className="flex items-center justify-between text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                                    <span>Clean Credit</span>
                                    <span className="material-symbols-outlined text-[18px] text-secondary">person</span>
                                </div>
                                <div className="mt-2 text-headline-sm font-headline-sm text-on-surface">Personal Loan</div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Unsecured Instant Line</p>
                            </div>
                            <div className="mt-4 pt-space-xs flex items-baseline gap-1">
                                <span className="text-label-sm font-label-sm text-on-surface-variant">From</span>
                                <span
                                    className="text-headline-lg font-headline-lg font-financial-numeric text-on-surface">10.49%</span>
                                <span className="text-label-sm font-label-sm text-secondary">p.a.</span>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="h-1 w-full bg-tertiary absolute top-0 left-0"></div>
                            <div>
                                <div
                                    className="flex items-center justify-between text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                                    <span>Special EV Subsidy</span>
                                    <span
                                        className="material-symbols-outlined text-[18px] text-tertiary">electric_car</span>
                                </div>
                                <div className="mt-2 text-headline-sm font-headline-sm text-on-surface">Auto &amp; EV Credit
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">0.25% EV Concession</p>
                            </div>
                            <div className="mt-4 pt-space-xs flex items-baseline gap-1">
                                <span className="text-label-sm font-label-sm text-on-surface-variant">From</span>
                                <span
                                    className="text-headline-lg font-headline-lg font-financial-numeric text-on-surface">8.75%</span>
                                <span className="text-label-sm font-label-sm text-secondary">p.a.</span>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="h-1 w-full bg-primary-container absolute top-0 left-0"></div>
                            <div>
                                <div
                                    className="flex items-center justify-between text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                                    <span>Enterprise Suite</span>
                                    <span
                                        className="material-symbols-outlined text-[18px] text-primary-container">store</span>
                                </div>
                                <div className="mt-2 text-headline-sm font-headline-sm text-on-surface">MSME Term &amp; WC
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">Working Capital / CGTMSE
                                </p>
                            </div>
                            <div className="mt-4 pt-space-xs flex items-baseline gap-1">
                                <span className="text-label-sm font-label-sm text-on-surface-variant">From</span>
                                <span
                                    className="text-headline-lg font-headline-lg font-financial-numeric text-primary-container">9.25%</span>
                                <span className="text-label-sm font-label-sm text-secondary">p.a.</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="mb-space-xl">
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        <div
                            className="p-space-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                            <div>
                                <span
                                    className="px-2.5 py-0.5 bg-primary text-on-primary rounded text-label-sm font-label-sm uppercase font-bold tracking-wider">Financial
                                    Engine</span>
                                <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">Loan EMI &amp;
                                    Principal Amortization Simulator</h3>
                                <p className="text-body-md font-body-md text-on-surface-variant">Compute standard monthly
                                    liability using exact reducing-balance formula aligned with RBI master directions.
                                </p>
                            </div>
                            <div className="flex items-center gap-space-sm">
                                <button
                                    className="px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-variant text-on-surface rounded text-label-sm font-label-sm transition-colors shadow-sm"
                                    onClick={() => {}} type="button">Home (₹50L / 8.4%)</button>
                                <button
                                    className="px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-variant text-on-surface rounded text-label-sm font-label-sm transition-colors shadow-sm"
                                    onClick={() => {}} type="button">Personal (₹12L /
                                    10.49%)</button>
                                <button
                                    className="px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-variant text-on-surface rounded text-label-sm font-label-sm transition-colors shadow-sm"
                                    onClick={() => {}} type="button">Car/EV (₹18L / 8.75%)</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                            
                            <div className="lg:col-span-7 p-space-lg md:p-space-xl flex flex-col gap-space-lg">
                                
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-label-lg font-label-lg text-on-surface"
                                            htmlFor="amountRange">Loan Quantum (Principal)</label>
                                        <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded">
                                            <span className="text-secondary font-semibold">₹</span>
                                            <input
                                                className="w-32 bg-transparent text-right font-financial-numeric text-financial-numeric text-on-surface focus:outline-none"
                                                id="amountInput" max="20000000" min="100000" step="50000" type="number"
                                                value="5000000" />
                                        </div>
                                    </div>
                                    <input
                                        className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary-container"
                                        id="amountRange" max="20000000" min="100000" step="50000" type="range"
                                        value="5000000" />
                                    <div className="flex justify-between text-label-sm font-label-sm text-secondary mt-1">
                                        <span>₹1,00,000</span>
                                        <span>₹1,00,00,000</span>
                                        <span>₹2,00,00,000</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-label-lg font-label-lg text-on-surface"
                                            htmlFor="rateRange">Benchmark Rate of Interest (% p.a.)</label>
                                        <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded">
                                            <input
                                                className="w-20 bg-transparent text-right font-financial-numeric text-financial-numeric text-on-surface focus:outline-none"
                                                id="rateInput" max="18" min="6.5" step="0.05" type="number"
                                                value="8.40" />
                                            <span className="text-secondary font-semibold">%</span>
                                        </div>
                                    </div>
                                    <input
                                        className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary-container"
                                        id="rateRange" max="18" min="6.5" step="0.05" type="range" value="8.40" />
                                    <div className="flex justify-between text-label-sm font-label-sm text-secondary mt-1">
                                        <span>6.50% (Repo Concession)</span>
                                        <span>12.00%</span>
                                        <span>18.00% (Unsecured)</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-label-lg font-label-lg text-on-surface"
                                            htmlFor="tenureRange">Repayment Tenure (Years)</label>
                                        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded">
                                            <input
                                                className="w-14 bg-transparent text-right font-financial-numeric text-financial-numeric text-on-surface focus:outline-none"
                                                id="tenureInput" max="30" min="1" step="1" type="number" value="20" />
                                            <span className="text-body-sm font-body-sm text-secondary"
                                                id="tenureMonthsDisplay">(240 Mos)</span>
                                        </div>
                                    </div>
                                    <input
                                        className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary-container"
                                        id="tenureRange" max="30" min="1" step="1" type="range" value="20" />
                                    <div className="flex justify-between text-label-sm font-label-sm text-secondary mt-1">
                                        <span>1 Year (12 Mos)</span>
                                        <span>15 Years</span>
                                        <span>30 Years (360 Mos)</span>
                                    </div>
                                </div>
                                
                                <div
                                    className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm">
                                    <span
                                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                                        Zero prepayment penalties apply to all individual retail floating-rate term
                                        loans as per Reserve Bank of India Master Circular.
                                    </p>
                                </div>
                            </div>
                            
                            <div
                                className="lg:col-span-5 bg-surface-container p-space-lg md:p-space-xl flex flex-col justify-between">
                                <div>
                                    <span
                                        className="text-label-sm font-label-sm uppercase tracking-wider text-secondary font-semibold">Estimated
                                        Monthly Outflow</span>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span
                                            className="text-headline-xl font-headline-xl font-financial-numeric text-primary"
                                            id="emiDisplay">₹43,075</span>
                                        <span className="text-label-md font-label-md text-on-surface-variant">/ month</span>
                                    </div>
                                    
                                    <div
                                        className="mt-space-md p-space-md bg-surface-container-lowest rounded-lg shadow-sm">
                                        <div className="flex items-center justify-between gap-space-md">
                                            <div className="relative w-28 h-28 shrink-0">
                                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                    
                                                    <path className="text-surface-container-high"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="currentColor" stroke-width="5"></path>
                                                    
                                                    <path className="text-tertiary-container"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" id="donutInterestPath" stroke="currentColor"
                                                        stroke-dasharray="54, 100" stroke-linecap="round"
                                                        stroke-width="5"></path>
                                                    
                                                    <path className="text-primary-container"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" id="donutPrincipalPath" stroke="currentColor"
                                                        stroke-dasharray="46, 100" stroke-dashoffset="-54"
                                                        stroke-linecap="round" stroke-width="5"></path>
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span
                                                        className="text-label-sm font-label-sm text-secondary">Ratio</span>
                                                    <span
                                                        className="text-label-md font-label-md font-financial-numeric text-on-surface"
                                                        id="ratioDisplay">46:54</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-space-sm flex-1">
                                                <div>
                                                    <div
                                                        className="flex items-center justify-between text-label-sm font-label-sm">
                                                        <span className="flex items-center gap-1.5 text-on-surface">
                                                            <span
                                                                className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                                                            Principal
                                                        </span>
                                                        <span
                                                            className="font-financial-numeric font-semibold text-on-surface"
                                                            id="totalPrincipalDisplay">₹50,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        className="flex items-center justify-between text-label-sm font-label-sm">
                                                        <span className="flex items-center gap-1.5 text-on-surface">
                                                            <span
                                                                className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                                                            Total Interest
                                                        </span>
                                                        <span
                                                            className="font-financial-numeric font-semibold text-on-surface"
                                                            id="totalInterestDisplay">₹53,38,069</span>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <div
                                                        className="flex items-center justify-between text-label-sm font-label-sm">
                                                        <span className="font-semibold text-on-surface">Total
                                                            Repayable</span>
                                                        <span className="font-financial-numeric font-bold text-primary"
                                                            id="totalPayableDisplay">₹1,03,38,069</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-space-lg flex flex-col gap-space-sm">
                                    <a className="w-full py-3 bg-primary-container hover:bg-primary text-on-primary text-center font-label-lg text-label-lg rounded transition-colors shadow-sm flex items-center justify-center gap-2"
                                        href="#digital-workflow">
                                        <span className="material-symbols-outlined text-[18px]">verified</span>
                                        <span>Apply with Pre-Approved Sanction</span>
                                    </a>
                                    <button
                                        className="w-full py-2.5 bg-surface-container-lowest hover:bg-surface-variant text-on-surface text-center font-label-lg text-label-lg rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                                        onClick={() => {}} type="button">
                                        <span className="material-symbols-outlined text-[18px]">table_chart</span>
                                        <span id="amortizationToggleText">View Amortization Schedule
                                            (Year-by-Year)</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden bg-surface-container-lowest p-space-lg" id="amortizationSchedule">
                            <div className="flex items-center justify-between mb-space-md">
                                <div>
                                    <h4 className="text-headline-sm font-headline-sm text-on-surface">Yearly Amortization
                                        &amp; Outstanding Debt Matrix</h4>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">Illustrative
                                        year-on-year breakdown assuming constant interest benchmark without prepayments.
                                    </p>
                                </div>
                                <button
                                    className="flex items-center gap-1 text-label-sm font-label-sm text-primary hover:underline"
                                    onClick={() => {}} type="button">
                                    <span className="material-symbols-outlined text-[16px]">download</span>
                                    <span>Download CSV</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            className="bg-surface-container-low text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                                            <th className="py-3 px-4">Financial Year</th>
                                            <th className="py-3 px-4 text-right">Opening Balance</th>
                                            <th className="py-3 px-4 text-right">Principal Paid</th>
                                            <th className="py-3 px-4 text-right">Interest Paid</th>
                                            <th className="py-3 px-4 text-right">Total Annual Outflow</th>
                                            <th className="py-3 px-4 text-right">Closing Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-body-sm font-body-sm divide-y divide-surface-container-high"
                                        id="amortizationTableBody">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="mb-space-xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
                        <div>
                            <span
                                className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded text-label-sm font-label-sm uppercase font-bold tracking-wider">Product
                                Suite</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">CPB Credit &amp;
                                Institutional Financing Facilities</h3>
                            <p className="text-body-md font-body-md text-on-surface-variant">Tailored credit facilities
                                backed by structured liquidity, fast-track digital appraisal, and statutory
                                transparency.</p>
                        </div>
                        <div
                            className="mt-4 md:mt-0 flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                            <span className="flex items-center gap-1"><span
                                    className="w-2 h-2 rounded-full bg-primary"></span>Zero Prepayment Penalty</span>
                            <span className="flex items-center gap-1"><span
                                    className="w-2 h-2 rounded-full bg-primary-container"></span>DigiLocker
                                Integration</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
                            <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover"
                                    data-alt="Modern architectural house exterior with warm lighting and manicured lawn, photographed at dusk with corporate blue skies and institutional elegance, showcasing stability and wealth creation"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuADGlp3BnQ0IDR_nt8qAChVdjvV1AL1oh1vR3SOnI14lr-m4IiyJrpxcpUdQ0ZKPrDPUnJ3qWpfvI63B4WQThHy7yKgCN9kiRbGInRvQ6xmMcFfcqcW60l8b0lFZGaIYdetxNi57cWAbi0lNgb_7J04loTRi3bJWv__WiSx8cxdy63U5V_wQzz8A2RR7ouPcdf9AwiND6bft7j9EQdWKJIBBtxFSmrFO6eBPWP8Qr2T4FhkxTkJTrsz" />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent">
                                </div>
                                <div
                                    className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-surface-container-lowest">
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm uppercase tracking-wider text-surface-variant font-semibold">Floating
                                            Benchmark-Linked</span>
                                        <h4 className="text-headline-md font-headline-md font-bold leading-tight">CPB
                                            Express Home Loan</h4>
                                    </div>
                                    <span
                                        className="px-2.5 py-1 bg-surface-container-lowest/20 backdrop-blur rounded text-label-sm font-label-sm font-financial-numeric">From
                                        8.40% p.a.</span>
                                </div>
                            </div>
                            <div className="p-space-lg flex-1 flex flex-col justify-between">
                                <ul
                                    className="flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Transparent floating rates tied dynamically to RBI Repo rate adjustments
                                            without lag.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Repayment tenure options stretched up to 30 years (360 EMIs) to maximize
                                            eligibility.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Zero prepayment &amp; foreclosure charges for individual residential
                                            borrowers.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Digital legal title search &amp; certified technical property evaluation
                                            across 500+ pin-codes.</span>
                                    </li>
                                </ul>
                                <div className="pt-space-md flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-label-sm font-label-sm text-secondary">Processing Fee</span>
                                        <span className="font-financial-numeric font-semibold text-on-surface">0.25% (Max
                                            ₹10,000)</span>
                                    </div>
                                    <button
                                        className="px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary rounded text-label-lg font-label-lg transition-colors shadow-sm"
                                        onClick={() => {}} type="button">
                                        Check Pre-Sanction
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
                            <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover"
                                    data-alt="Professional Indian executive working on a sleek laptop inside an upscale corporate headquarters with architectural glass windows and cool morning ambient light"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCV1dgTzpal4J25MOB1fjUobqueAw2cImIU0W1sLOyQGnrVeI1AfvRWANqL-Pgxj7W3WzDsb9BLkdeKIEwFV68L5ME_4csynPkWwBO9hGvGdszKAbOgUbmfysR7tCmQ4_VcuajW1wN_9OCDXSG6eUptmFDjTmCwHYTDYf327H23QKFaCp1psLbBvozQ48HpFvKZBfQA6IIQX-VdnePUJtee6ZkJqcWun2LrZ8z-zD5LF-yQioY5NoA" />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent">
                                </div>
                                <div
                                    className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-surface-container-lowest">
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm uppercase tracking-wider text-surface-variant font-semibold">Direct
                                            Disbursal in 3 Seconds</span>
                                        <h4 className="text-headline-md font-headline-md font-bold leading-tight">Instant
                                            Pre-Approved Personal Loan</h4>
                                    </div>
                                    <span
                                        className="px-2.5 py-1 bg-surface-container-lowest/20 backdrop-blur rounded text-label-sm font-label-sm font-financial-numeric">From
                                        10.49% p.a.</span>
                                </div>
                            </div>
                            <div className="p-space-lg flex-1 flex flex-col justify-between">
                                <ul
                                    className="flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Sanctions up to ₹25,00,000 for verified CPB salary and premier savings
                                            account holders.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>100% paperless digital journey: Zero physical physical branches, slips, or
                                            wet signatures.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Under-3-second direct RTGS/NEFT credit straight into your primary CPB
                                            operative account.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Flexible micro-tenure structures ranging from 12 to 60 calendar
                                            months.</span>
                                    </li>
                                </ul>
                                <div className="pt-space-md flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-label-sm font-label-sm text-secondary">Documentation</span>
                                        <span className="font-label-md font-semibold text-on-surface">Zero
                                            (Pre-Underwritten)</span>
                                    </div>
                                    <button
                                        className="px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary rounded text-label-lg font-label-lg transition-colors shadow-sm"
                                        onClick={() => {}} type="button">
                                        Claim Pre-Approved Line
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
                            <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover"
                                    data-alt="Modern electric vehicle plugged into an institutional charging station in front of an upscale minimalist corporate office building in daytime sunlight"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBETalfU5BCtV9sQIXp5p0LfSCn-Tfo9yTxtvpSHiqqR_wDmYbxAQz54_DMf7JgSUQS1Qo5MqE4He7WyH0W2TqQ6IQFYJ3eZFMQdxTKyaXJVWKbE4rfD9yMZVd86tEeLZK5FNwOCJMkuAcTturQ5xL3-qX_yGhvKggkH3Cq7wjatdHxMw4dWPmfxqRxH-GjdWViaibuaH-WxuLxO442u9pyd2LqfOqimWer_3wEwp__fzCW5lRAU4zN" />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent">
                                </div>
                                <div
                                    className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-surface-container-lowest">
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm uppercase tracking-wider text-surface-variant font-semibold">ESG
                                            Concession Programme</span>
                                        <h4 className="text-headline-md font-headline-md font-bold leading-tight">CPB Green
                                            Vehicle &amp; Auto Loan</h4>
                                    </div>
                                    <span
                                        className="px-2.5 py-1 bg-surface-container-lowest/20 backdrop-blur rounded text-label-sm font-label-sm font-financial-numeric">From
                                        8.75% p.a.</span>
                                </div>
                            </div>
                            <div className="p-space-lg flex-1 flex flex-col justify-between">
                                <ul
                                    className="flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Special 25 bps (0.25%) interest concession exclusively for electric
                                            four-wheelers.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Up to 100% on-road financing covering RTO registration, battery warranty,
                                            and state road taxes.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Extended repayment terms up to 84 months (7 years) with step-down EMI
                                            alternatives.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Instant direct tie-up delivery order dispatch to 2,400+ authorized
                                            automobile dealerships.</span>
                                    </li>
                                </ul>
                                <div className="pt-space-md flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-label-sm font-label-sm text-secondary">Financing Cap</span>
                                        <span className="font-financial-numeric font-semibold text-on-surface">Up to 100%
                                            On-Road</span>
                                    </div>
                                    <button
                                        className="px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary rounded text-label-lg font-label-lg transition-colors shadow-sm"
                                        onClick={() => {}} type="button">
                                        Calculate Auto EMI
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
                            <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover"
                                    data-alt="High-tech automated manufacturing facility with precision industrial machinery and engineers monitoring automated control systems under balanced clean lighting"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo9uXBX2diyd6fmewnI526mSyUUzfEu8SgyM73Cs9rI4EpC5oLOW7Beu8b5bvVnBxk0RpI1Rw1A2Tx4qf1xsDoRnMKqdv1FU9T6-mHWLymJuoUzc_3TT_53hZdm0ThrT-TTRz8loylo4uFDCoigyckITSuutEpgt_24mpCph6YBhO9EBgzkPQI4ggNNMAjVnQpqMNjCTQwgMyNR8qWoVD5VX2kcV4rPkbQa8Y-_Ah9YyL6-UYwVoBe" />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent">
                                </div>
                                <div
                                    className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-surface-container-lowest">
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm uppercase tracking-wider text-surface-variant font-semibold">Institutional
                                            Treasury &amp; Credit</span>
                                        <h4 className="text-headline-md font-headline-md font-bold leading-tight">MSME &amp;
                                            Enterprise Credit Facility</h4>
                                    </div>
                                    <span
                                        className="px-2.5 py-1 bg-surface-container-lowest/20 backdrop-blur rounded text-label-sm font-label-sm font-financial-numeric">From
                                        9.25% p.a.</span>
                                </div>
                            </div>
                            <div className="p-space-lg flex-1 flex flex-col justify-between">
                                <ul
                                    className="flex flex-col gap-space-sm text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Working Capital (Cash Credit / Overdraft), Inland/Foreign Letters of
                                            Credit (LC) &amp; Bank Guarantees.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Collateral-free credit backing up to ₹5 Crore under Government of India
                                            CGTMSE guarantee scheme.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>GST-streamlined appraisal: Automated turn-around via direct Goods &amp;
                                            Services Tax API pulling.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Dedicated Relationship Manager &amp; priority trade desk access for
                                            cross-border fx remittances.</span>
                                    </li>
                                </ul>
                                <div className="pt-space-md flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-label-sm font-label-sm text-secondary">Collateral
                                            Cushion</span>
                                        <span className="font-financial-numeric font-semibold text-on-surface">CGTMSE up to
                                            ₹5 Cr</span>
                                    </div>
                                    <button
                                        className="px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary rounded text-label-lg font-label-lg transition-colors shadow-sm"
                                        onClick={() => {}} type="button">
                                        Connect SME Desk
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="mb-space-xl" id="digital-workflow">
                    <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
                        <div className="max-w-2xl mb-space-lg">
                            <span
                                className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded text-label-sm font-label-sm uppercase font-bold tracking-wider">Fast-Track
                                Origination</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">4-Stage Express Sanction
                                Journey</h3>
                            <p className="text-body-md font-body-md text-on-surface-variant">From eligibility check to legal
                                disbursement in 10 minutes through India Stack and RBI Account Aggregator framework.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md relative">
                            
                            <div
                                className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between relative">
                                <div>
                                    <div className="flex items-center justify-between mb-space-sm">
                                        <span
                                            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-financial-numeric text-label-md font-bold">01</span>
                                        <span className="material-symbols-outlined text-primary text-[20px]">speed</span>
                                    </div>
                                    <h4 className="text-headline-sm font-headline-sm text-on-surface mb-1">Check
                                        In-Principle Eligibility</h4>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">Instant soft bureau
                                        query across CIBIL, Experian &amp; CRIF High Mark with zero negative impact on
                                        your credit score rating.</p>
                                </div>
                                <div
                                    className="mt-space-md pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1">
                                    <span>Latency: ~45 Seconds</span>
                                </div>
                            </div>
                            
                            <div
                                className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between relative">
                                <div>
                                    <div className="flex items-center justify-between mb-space-sm">
                                        <span
                                            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-financial-numeric text-label-md font-bold">02</span>
                                        <span
                                            className="material-symbols-outlined text-primary text-[20px]">cloud_sync</span>
                                    </div>
                                    <h4 className="text-headline-sm font-headline-sm text-on-surface mb-1">Account
                                        Aggregator &amp; KYC</h4>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">One-tap consent via
                                        RBI-regulated Account Aggregator (AA) for last 6 months bank statements, and
                                        DigiLocker for instant PAN/Aadhaar verification.</p>
                                </div>
                                <div
                                    className="mt-space-md pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1">
                                    <span>Paperless API Validation</span>
                                </div>
                            </div>
                            
                            <div
                                className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between relative">
                                <div>
                                    <div className="flex items-center justify-between mb-space-sm">
                                        <span
                                            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-financial-numeric text-label-md font-bold">03</span>
                                        <span
                                            className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
                                    </div>
                                    <h4 className="text-headline-sm font-headline-sm text-on-surface mb-1">Algorithmic
                                        Sanction Letter</h4>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">Underwriting algorithm
                                        outputs an official, binding In-Principle Sanction Letter detailing loan
                                        quantum, benchmark rate, and APR charges.</p>
                                </div>
                                <div
                                    className="mt-space-md pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1">
                                    <span>Digitally Timestamped</span>
                                </div>
                            </div>
                            
                            <div
                                className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between relative">
                                <div>
                                    <div className="flex items-center justify-between mb-space-sm">
                                        <span
                                            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-financial-numeric text-label-md font-bold">04</span>
                                        <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                                    </div>
                                    <h4 className="text-headline-sm font-headline-sm text-on-surface mb-1">e-Sign &amp;
                                        Direct Disbursal</h4>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">Execute the loan
                                        agreement via Aadhaar OTP e-Sign (NeSL compliant e-stamping). Funds are
                                        disbursed straight to the destination bank account.</p>
                                </div>
                                <div
                                    className="mt-space-md pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1">
                                    <span>Direct Account Credit</span>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            className="mt-space-lg p-space-md bg-surface-container rounded-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
                            <div className="flex items-center gap-space-md">
                                <span
                                    className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
                                    <span className="material-symbols-outlined text-[24px]">fingerprint</span>
                                </span>
                                <div>
                                    <div className="text-headline-sm font-headline-sm text-on-surface">Ready to start your
                                        digital credit application?</div>
                                    <div className="text-body-sm font-body-sm text-on-surface-variant">Provide your
                                        registered mobile number linked to Aadhaar to begin soft evaluation.</div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-auto items-center gap-2">
                                <input
                                    className="px-3 py-2 bg-surface-container-lowest rounded text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none w-full md:w-52 shadow-sm"
                                    maxLength={10} placeholder="Enter 10-digit mobile" type="tel" />
                                <button
                                    className="px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary rounded text-label-lg font-label-lg transition-colors whitespace-nowrap shadow-sm"
                                    type="button">
                                    Proceed with OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="mb-space-xl" id="regulatory-notes">
                    <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-space-md">
                            <span className="material-symbols-outlined text-primary text-[24px]">gavel</span>
                            <h3 className="text-headline-md font-headline-md text-on-surface">Statutory Compliance, Fair
                                Practices Code &amp; Lending Disclosures</h3>
                        </div>
                        <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
                            In strict adherence with Reserve Bank of India (RBI) Master Directions on Fair Practices
                            Code for Lenders, Guidelines on Digital Lending (2022), and Recovery Agent Framework.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                            
                            <div className="bg-surface-container-low p-space-md rounded-lg">
                                <div
                                    className="text-label-lg font-label-lg text-on-surface font-semibold mb-space-xs flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-secondary text-[18px]">rule</span>
                                    <span>Foreclosure &amp; Prepayment Norms</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-2">
                                    Individual floating-rate term loans (Home, Auto, Personal) bear <strong>0.00%
                                        prepayment penalty</strong>, irrespective of the source of prepayment.
                                </p>
                                <ul className="text-body-sm font-body-sm text-secondary space-y-1">
                                    <li>• Fixed rate term loans: Nil penalty after 24 elapsed EMIs.</li>
                                    <li>• Commercial entity term loans: Max 1.5% on outstanding balance.</li>
                                    <li>• Duplicate NOC / Title Release charge: Nil.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-surface-container-low p-space-md rounded-lg">
                                <div
                                    className="text-label-lg font-label-lg text-on-surface font-semibold mb-space-xs flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-secondary text-[18px]">badge</span>
                                    <span>Empanelled Direct Selling Agents (DSAs)</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-2">
                                    CPB engages strictly certified, code-compliant Lending Service Providers (LSPs) and
                                    DSAs. No cash collections are permissible.
                                </p>
                                <ul className="text-body-sm font-body-sm text-secondary space-y-1">
                                    <li>• Authorized DSAs carry QR-verifiable CPB credentials.</li>
                                    <li>• Processing fees payable only to CPB Central Escrow account.</li>
                                    <li>• List of all active sourcing agencies accessible on portal.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-surface-container-low p-space-md rounded-lg">
                                <div
                                    className="text-label-lg font-label-lg text-on-surface font-semibold mb-space-xs flex items-center gap-1.5">
                                    <span
                                        className="material-symbols-outlined text-secondary text-[18px]">support_agent</span>
                                    <span>Nodal Grievance Redressal Officer</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-2">
                                    Unsatisfied loan applicants may escalate complaints directly to our designated
                                    Principal Nodal Officer before approaching the RBI Ombudsman.
                                </p>
                                <div className="text-body-sm font-body-sm text-on-surface-variant space-y-0.5">
                                    <div className="font-semibold text-on-surface">Shri Arvind S. Ramanathan, PNO</div>
                                    <div>Toll-Free Escalate Line: <span
                                            className="font-financial-numeric text-primary font-semibold">1800-419-0069</span>
                                    </div>
                                    <div>Email: <span className="text-primary font-medium">nodalofficer@cpbbank.in</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            className="mt-space-lg pt-space-md bg-surface-container-low p-space-sm rounded text-label-sm font-label-sm text-secondary flex flex-col md:flex-row items-center justify-between gap-space-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                                <span>Annual Percentage Rate (APR) transparently provided in Key Fact Statement (KFS)
                                    prior to loan contract execution.</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <a className="hover:text-primary transition-colors" href="#">Download Fair Practice Charter
                                    (PDF)</a>
                                <span>•</span>
                                <a className="hover:text-primary transition-colors" href="#">RBI Ombudsman Scheme 2021</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            
        </div>
    </main>
      <Footer />
    </>
  );
}
