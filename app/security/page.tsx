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
                
                <section
                    className="w-full bg-error text-on-error rounded-xl p-space-lg shadow-md mb-space-xl relative overflow-hidden">
                    <div
                        className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-surface-container-lowest opacity-5 pointer-events-none">
                    </div>
                    <div
                        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg relative z-10">
                        <div className="flex items-start gap-space-md">
                            <div className="p-space-sm bg-error-container text-on-error-container rounded-lg shrink-0 mt-1">
                                <span className="material-symbols-outlined text-[32px]"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
                            </div>
                            <div className="flex flex-col gap-space-xs">
                                <div
                                    className="inline-flex items-center gap-space-xs text-error-container font-label-sm text-label-sm tracking-widest uppercase">
                                    <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                                    <span>Mandatory Statutory Advisory • Reserve Bank of India Directive</span>
                                </div>
                                <h2
                                    className="text-headline-lg font-headline-lg font-bold text-surface-container-lowest leading-tight">
                                    CPB Bank NEVER asks for Password, OTP, Card PIN, or CVV.
                                </h2>
                                <p className="text-body-md font-body-md text-error-container">
                                    If you suspect unauthorized access or shared sensitive data by mistake, trigger an
                                    emergency freeze immediately.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col shrink-0 gap-space-sm w-full lg:w-auto">
                            <a className="flex items-center justify-center gap-space-sm bg-surface-container-lowest text-error hover:bg-surface-container-low px-space-lg py-space-sm rounded-lg transition-colors font-label-lg text-label-lg shadow-sm"
                                href="tel:1930">
                                <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                                <span>National Cyber Cell: <strong
                                        className="font-financial-numeric text-financial-numeric">1930</strong></span>
                            </a>
                            <a className="flex items-center justify-center gap-space-sm bg-on-error-container text-surface-container-lowest hover:bg-black/40 px-space-lg py-space-sm rounded-lg transition-colors font-label-lg text-label-lg"
                                href="tel:18004190068">
                                <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                                <span>CPB 24x7 War Room: <span
                                        className="font-financial-numeric text-financial-numeric">1800-419-0068</span></span>
                            </a>
                        </div>
                    </div>
                </section>
                
                <section className="w-full mb-space-xl">
                    <div className="flex items-center justify-between mb-space-md">
                        <div>
                            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-widest">Rapid
                                Intervention Module</span>
                            <h3 className="text-headline-md font-headline-md text-primary font-bold">Instant Emergency
                                Incident Response</h3>
                        </div>
                        <div
                            className="hidden sm:flex items-center gap-space-sm bg-surface-container px-space-md py-space-xs rounded-lg">
                            <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                            <span className="text-label-sm font-label-sm text-on-surface-variant">Active Defense Mode • 24x7
                                SOC Active</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <span className="p-2 rounded-lg bg-error-container text-on-error-container">
                                        <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-error bg-surface-container px-2 py-0.5 rounded font-semibold">Priority
                                        1</span>
                                </div>
                                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">Report
                                    Fraudulent Transaction</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                    Lodge unauthorized debit, card skimming, or suspicious UPI pull. Auto-generates
                                    formal FIR dossier and CPB Internal Incident ID.
                                </p>
                            </div>
                            <button
                                className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-sm px-space-md rounded-lg text-label-lg font-label-lg flex items-center justify-center gap-space-xs transition-colors"
                                onClick={() => {}}>
                                <span>Lodge Incident</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                        <span className="material-symbols-outlined text-[24px]">lock_reset</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">All
                                        Channels</span>
                                </div>
                                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">Instant
                                    Emergency Freeze</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                    Instantly lockdown all NetBanking access, mobile apps, UPI IDs, and automated NACH
                                    clearing debits in a single tap.
                                </p>
                            </div>
                            <button
                                className="w-full bg-inverse-surface hover:bg-on-background text-inverse-on-surface py-space-sm px-space-md rounded-lg text-label-lg font-label-lg flex items-center justify-center gap-space-xs transition-colors"
                                id="freeze-trigger-btn">
                                <span className="material-symbols-outlined text-[18px]">block</span>
                                <span>Emergency Freeze</span>
                            </button>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                        <span className="material-symbols-outlined text-[24px]">credit_card_off</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">Debit
                                        • Credit</span>
                                </div>
                                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">Block Lost /
                                    Stolen Card</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                    Permanently invalidate or temporarily switch off POS, International, and E-commerce
                                    transaction tokens on your plastic.
                                </p>
                            </div>
                            <button
                                className="w-full bg-secondary-container hover:bg-surface-container-highest text-on-secondary-container py-space-sm px-space-md rounded-lg text-label-lg font-label-lg flex items-center justify-center gap-space-xs transition-colors"
                                id="block-card-btn">
                                <span className="material-symbols-outlined text-[18px]">credit_card</span>
                                <span>Block Card Instantly</span>
                            </button>
                        </div>
                        
                        <div
                            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-sm">
                                    <span className="p-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant">
                                        <span className="material-symbols-outlined text-[24px]">phishing</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded font-medium">SOC
                                        Takedown</span>
                                </div>
                                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">Report
                                    Phishing &amp; Fake APKs</h4>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                                    Upload rogue WhatsApp handles, suspicious SMS sender strings, malicious APK
                                    downloads, or fake CPB mirror URLs.
                                </p>
                            </div>
                            <button
                                className="w-full bg-surface-container hover:bg-surface-container-high text-primary py-space-sm px-space-md rounded-lg text-label-lg font-label-lg flex items-center justify-center gap-space-xs transition-colors"
                                id="report-phishing-btn">
                                <span className="material-symbols-outlined text-[18px]">security_update_warning</span>
                                <span>Report Threat Vector</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/60"
                    id="quick-action-modal">
                    <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-lg w-full p-space-lg">
                        <div className="flex items-center justify-between pb-space-md">
                            <div className="flex items-center gap-space-sm">
                                <span className="material-symbols-outlined text-error text-[26px]">gpp_bad</span>
                                <span className="text-headline-sm font-headline-sm text-on-surface" id="modal-title">Confirm
                                    Channel Lockdown</span>
                            </div>
                            <button className="text-outline hover:text-on-surface" id="close-modal-btn">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <p className="text-body-md font-body-md text-on-surface-variant mb-space-md" id="modal-desc">
                            This emergency lock will suspend your credentials immediately across NetBanking, Mobile App,
                            UPI, and ATM terminals. You will require in-branch biometric re-KYC or branch approval to
                            restore service.
                        </p>
                        <div className="flex flex-col gap-space-sm mb-space-lg">
                            <label className="text-label-sm font-label-sm text-on-surface uppercase font-semibold">Enter
                                Registered Mobile or Customer ID</label>
                            <input
                                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-body-md rounded-lg focus:outline-none focus:bg-surface-container-high"
                                placeholder="e.g. 98200XXXXX / Cust ID" type="text" />
                        </div>
                        <div className="flex items-center justify-end gap-space-md">
                            <button
                                className="px-space-md py-space-sm text-label-lg font-label-lg text-secondary hover:text-on-surface"
                                id="cancel-modal-btn">Cancel</button>
                            <button
                                className="px-space-lg py-space-sm bg-error hover:bg-on-error-container text-on-error rounded-lg text-label-lg font-label-lg"
                                id="execute-lockdown-btn">Execute Lockdown</button>
                        </div>
                    </div>
                </div>
                
                <section className="w-full mb-space-xl">
                    <div className="mb-space-lg">
                        <span className="text-label-sm font-label-sm text-secondary uppercase tracking-widest">Statutory
                            Security Directives</span>
                        <h3 className="text-headline-lg font-headline-lg text-primary font-bold">Threat Intelligence &amp;
                            Defensive Guidelines</h3>
                        <p className="text-body-md font-body-md text-on-surface-variant max-w-3xl mt-space-xs">
                            Standard Operating Procedures enforced by CPB Bank and the Reserve Bank of India to defend
                            retail balances and commercial treasury pipelines.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                        
                        <div
                            className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-space-sm mb-space-md">
                                    <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                        <span className="material-symbols-outlined text-[26px]">mark_email_unread</span>
                                    </span>
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Directive
                                            01</span>
                                        <h4 className="text-headline-md font-headline-md text-on-surface font-semibold">
                                            Phishing, Smishing &amp; Vishing Countermeasures</h4>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low rounded-lg p-space-md mb-space-md">
                                    <div
                                        className="flex items-center gap-space-xs text-primary font-label-md text-label-md mb-space-xs">
                                        <span className="material-symbols-outlined text-[18px]">verified</span>
                                        <span>Official CPB SMS Header Verification Rule</span>
                                    </div>
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                                        Legitimate CPB SMS dispatches originate exclusively from telecom-registered
                                        headers ending with bank identifiers: <strong
                                            className="text-on-surface font-financial-numeric">AD-CPBBNK, VM-CPBBNK, or
                                            BZ-CPBBNK</strong>. Any SMS received from an ordinary 10-digit mobile number
                                        claiming to be CPB is a fraudulent transmission.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-md">
                                    <div className="bg-error-container/40 p-space-md rounded-lg">
                                        <div
                                            className="flex items-center gap-space-xs text-on-error-container font-label-md text-label-md mb-1 font-bold">
                                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                                            <span>Malicious Social Engineering</span>
                                        </div>
                                        <ul
                                            className="text-body-sm font-body-sm text-on-surface-variant flex flex-col gap-1 list-disc list-inside">
                                            <li>SMS claiming: "Your KYC expired, account blocked in 2 hrs."</li>
                                            <li>Fake alerts: "Electricity disconnected tonight due to bill."</li>
                                            <li>Fraudulent reward point redemption links on WhatsApp.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-surface-container p-space-md rounded-lg">
                                        <div
                                            className="flex items-center gap-space-xs text-primary font-label-md text-label-md mb-1 font-bold">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            <span>Statutory Verification Standard</span>
                                        </div>
                                        <ul
                                            className="text-body-sm font-body-sm text-on-surface-variant flex flex-col gap-1 list-disc list-inside">
                                            <li>KYC renewal happens ONLY through verified portal or branch.</li>
                                            <li>CPB never communicates utility payment notices.</li>
                                            <li>Reward points can solely be redeemed in logged-in NetBanking.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between pt-space-sm bg-surface-container-lowest text-secondary text-label-sm font-label-sm">
                                <span>TRAI DLT Portal Registration: DL-1002-CPB-COMM</span>
                                <span className="text-primary font-semibold">Ref: RBI/2023-24/112</span>
                            </div>
                        </div>
                        
                        <div
                            className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-space-sm mb-space-md">
                                    <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                        <span className="material-symbols-outlined text-[26px]">sim_card_download</span>
                                    </span>
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Directive
                                            02</span>
                                        <h4 className="text-headline-md font-headline-md text-on-surface font-semibold">SIM
                                            Swap &amp; eSIM Interception</h4>
                                    </div>
                                </div>
                                <p className="text-body-md font-body-md text-on-surface-variant mb-space-md">
                                    Cyber syndicates utilize fraudulent customer duplicates to reroute OTPs, bypass
                                    two-factor authentication, and initiate immediate treasury transfers.
                                </p>
                                <div className="bg-error-container/30 p-space-md rounded-lg mb-space-md">
                                    <h5
                                        className="text-label-lg font-label-lg text-on-error-container font-bold mb-space-xs flex items-center gap-space-xs">
                                        <span className="material-symbols-outlined text-[18px]">warning</span>
                                        Critical Danger Indicator
                                    </h5>
                                    <p className="text-body-sm font-body-sm text-on-surface">
                                        If your mobile phone displays <strong>"No Service"</strong>, <strong>"SOS
                                            Only"</strong>, or sudden loss of cellular connectivity for more than 15
                                        minutes in urban coverage areas, assume an unauthorized SIM Swap is currently
                                        active.
                                    </p>
                                </div>
                                <div className="bg-surface-container-low p-space-md rounded-lg">
                                    <span
                                        className="text-label-sm font-label-sm text-primary uppercase font-bold tracking-wider">Protocol
                                        Sequence</span>
                                    <ol
                                        className="text-body-sm font-body-sm text-on-surface-variant mt-1 flex flex-col gap-1.5 list-decimal list-inside">
                                        <li>Immediately dial Telecom Operator via secondary line.</li>
                                        <li>Instruct carrier to block duplicate SIM card instantly.</li>
                                        <li>Call CPB Fraud Desk (1800-419-0068) to freeze banking tokens.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="pt-space-md text-label-sm font-label-sm text-secondary">
                                <span>Telecom Regulatory Authority of India (TRAI) Guidelines Compliant</span>
                            </div>
                        </div>
                        
                        <div
                            className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-space-sm mb-space-md">
                                    <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                        <span className="material-symbols-outlined text-[26px]">screen_share</span>
                                    </span>
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Directive
                                            03</span>
                                        <h4 className="text-headline-md font-headline-md text-on-surface font-semibold">
                                            Remote Access &amp; URL Authenticity</h4>
                                    </div>
                                </div>
                                <div className="space-y-space-md">
                                    <div className="flex gap-space-sm items-start">
                                        <span
                                            className="material-symbols-outlined text-error text-[22px] shrink-0 mt-0.5">do_not_disturb_on</span>
                                        <div>
                                            <h5 className="text-headline-sm font-headline-sm text-on-surface">Screen Sharing
                                                Prohibitions</h5>
                                            <p className="text-body-sm font-body-sm text-on-surface-variant">
                                                Never install software such as <strong className="text-on-surface">AnyDesk,
                                                    TeamViewer, RustDesk, or QuickSupport</strong> under instructions
                                                from any caller claiming to be a CPB support manager, RBI auditor, or
                                                courier agent. These apps grant absolute mirror control of your mobile
                                                screen and PIN inputs.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-space-sm items-start">
                                        <span
                                            className="material-symbols-outlined text-surface-tint text-[22px] shrink-0 mt-0.5">verified_user</span>
                                        <div>
                                            <h5 className="text-headline-sm font-headline-sm text-on-surface">Domain
                                                Signature Inspection</h5>
                                            <p className="text-body-sm font-body-sm text-on-surface-variant">
                                                Official CPB digital gateways exclusively operate on:
                                                <code
                                                    className="bg-surface-container px-2 py-0.5 rounded text-primary font-mono text-body-sm">https://www.cpbbank.in</code>.
                                                Always verify the cryptographic certificate seal. Look out for
                                                misspelled typo-squatting variants like <span
                                                    className="text-error">cpb-bank-kyc.top</span> or <span
                                                    className="text-error">cpblogin.net</span>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="mt-space-md pt-space-sm bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
                                    <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                                    <span>Extended Validation (EV) TLS 1.3 Certified</span>
                                </div>
                                <span className="text-label-sm font-label-sm font-mono text-on-surface-variant">SHA-256 /
                                    RSA 4096</span>
                            </div>
                        </div>
                        
                        <div
                            className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-space-sm mb-space-md">
                                    <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                        <span className="material-symbols-outlined text-[26px]">local_atm</span>
                                    </span>
                                    <div>
                                        <span
                                            className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Directive
                                            04</span>
                                        <h4 className="text-headline-md font-headline-md text-on-surface font-semibold">
                                            Physical ATM &amp; POS Terminal Integrity</h4>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-md">
                                    <div className="bg-surface-container-low p-space-sm rounded-lg text-center">
                                        <span className="material-symbols-outlined text-primary text-[28px]">search</span>
                                        <h6 className="text-label-md font-label-md text-on-surface mt-1">Check Card Slot
                                        </h6>
                                        <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Inspect for
                                            loose overlay skimmers or adhesive glue marks.</p>
                                    </div>
                                    <div className="bg-surface-container-low p-space-sm rounded-lg text-center">
                                        <span className="material-symbols-outlined text-primary text-[28px]">pan_tool</span>
                                        <h6 className="text-label-md font-label-md text-on-surface mt-1">Shield PIN Entry
                                        </h6>
                                        <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Use your
                                            hand to obstruct hidden micro-pinhole cameras overhead.</p>
                                    </div>
                                    <div className="bg-surface-container-low p-space-sm rounded-lg text-center">
                                        <span className="material-symbols-outlined text-primary text-[28px]">receipt</span>
                                        <h6 className="text-label-md font-label-md text-on-surface mt-1">Verify Slip &amp;
                                            SMS</h6>
                                        <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Confirm
                                            immediate SMS notification matches POS machine charge.</p>
                                    </div>
                                </div>
                                <div className="bg-surface-container p-space-md rounded-lg">
                                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                                        <strong className="text-on-surface font-semibold">CPB Security Pro-Tip:</strong>
                                        Enable <em>Dynamic Daily Transaction Limits</em> inside CPB Mobile Banking to
                                        restrict ATM cash withdrawal to ₹10,000 whenever you are not traveling.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-space-md text-label-sm font-label-sm text-secondary">
                                <span>EMV-Chip Standard ISO/IEC 7816 Compliant Terminal Network</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="w-full mb-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                    
                    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm"
                        id="incident-reporting-form">
                        <div className="flex items-center justify-between mb-space-md">
                            <div className="flex items-center gap-space-sm">
                                <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                    <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                                </span>
                                <div>
                                    <span
                                        className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Fast-Track
                                        Investigation</span>
                                    <h3 className="text-headline-md font-headline-md text-on-surface font-bold">Lodge Cyber
                                        Incident Ticket</h3>
                                </div>
                            </div>
                            <span
                                className="text-label-sm font-label-sm text-surface-tint bg-secondary-container px-2 py-1 rounded font-semibold">
                                SLA: 2-Hour Action
                            </span>
                        </div>
                        <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                            Submitting this form triggers immediate token quarantine with CPB Cyber Security Operation
                            Center (C-SOC) and logs an initial case docket for National Cyber Crime Reporting Portal.
                        </p>
                        <form className="space-y-space-md" id="fraud-incident-form"
                            onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <div className="flex flex-col gap-space-xs">
                                    <label className="text-label-sm font-label-sm font-semibold text-on-surface">Account or
                                        16-Digit Card Number *</label>
                                    <input
                                        className="h-10 px-3 bg-surface-container-low text-body-md text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-high"
                                        placeholder="e.g. 50100293849102 / 4111..." required type="text" />
                                </div>
                                <div className="flex flex-col gap-space-xs">
                                    <label className="text-label-sm font-label-sm font-semibold text-on-surface">Registered
                                        Mobile Number *</label>
                                    <input
                                        className="h-10 px-3 bg-surface-container-low text-body-md text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-high"
                                        placeholder="+91 XXXXX XXXXX" required type="tel" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                                <div className="flex flex-col gap-space-xs">
                                    <label className="text-label-sm font-label-sm font-semibold text-on-surface">Date &amp;
                                        Time of Incident *</label>
                                    <input
                                        className="h-10 px-3 bg-surface-container-low text-body-md text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-high"
                                        required type="datetime-local" />
                                </div>
                                <div className="flex flex-col gap-space-xs">
                                    <label className="text-label-sm font-label-sm font-semibold text-on-surface">Transaction
                                        ID / UTR (if any)</label>
                                    <input
                                        className="h-10 px-3 bg-surface-container-low text-body-md text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-high"
                                        placeholder="12-digit UPI/NEFT ref" type="text" />
                                </div>
                                <div className="flex flex-col gap-space-xs">
                                    <label className="text-label-sm font-label-sm font-semibold text-on-surface">Amount
                                        Defrauded (INR) *</label>
                                    <input
                                        className="h-10 px-3 bg-surface-container-low text-body-md text-on-surface font-financial-numeric rounded-lg focus:outline-none focus:bg-surface-container-high"
                                        placeholder="₹ Amount" required type="number" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-space-xs">
                                <label className="text-label-sm font-label-sm font-semibold text-on-surface">Nature of Fraud
                                    Incident *</label>
                                <select
                                    className="h-10 px-3 bg-surface-container-low text-body-md text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-high"
                                    required>
                                    <option value="">-- Select Threat Vector --</option>
                                    <option value="upi">Unauthorized UPI Auto-Debit / QR Scan Phishing</option>
                                    <option value="card">Card Skimming / Unauthorized International E-com</option>
                                    <option value="vishing">Vishing / Social Engineering Call (OTP Shared)</option>
                                    <option value="remote">Remote Desktop Screen Sharing (AnyDesk/TeamViewer)</option>
                                    <option value="sim">SIM Swap / Inactive Cellular Network Hijack</option>
                                    <option value="rogue">Rogue CPB APK Installed on Device</option>
                                    <option value="other">Other Commercial Cyber Incident</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-space-xs">
                                <label className="text-label-sm font-label-sm font-semibold text-on-surface">Detailed
                                    Incident Narrative</label>
                                <textarea
                                    className="p-3 bg-surface-container-low text-body-md text-on-surface rounded-lg focus:outline-none focus:bg-surface-container-high"
                                    placeholder="State sequence of events: caller phone number, suspicious web link, SMS text received..."
                                    rows={3}></textarea>
                            </div>
                            <div className="flex flex-col gap-space-xs">
                                <label className="text-label-sm font-label-sm font-semibold text-on-surface">Upload
                                    Evidentiary Screenshot / SMS Export</label>
                                <div
                                    className="flex items-center justify-center p-space-md bg-surface-container-low rounded-lg text-center cursor-pointer hover:bg-surface-container transition-colors">
                                    <div className="flex flex-col items-center gap-space-xs">
                                        <span
                                            className="material-symbols-outlined text-outline text-[28px]">upload_file</span>
                                        <span className="text-body-sm font-body-sm text-on-surface font-medium">Click to
                                            upload or drag screenshot (JPG, PNG, PDF up to 5MB)</span>
                                        <span className="text-label-sm font-label-sm text-outline">Screenshots of SMS
                                            headers, WhatsApp chat, and bank transaction SMS</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
                                <input className="mt-1" id="statutory-declaration" required type="checkbox" />
                                <label className="text-body-sm font-body-sm text-on-surface-variant"
                                    htmlFor="statutory-declaration">
                                    I hereby declare under penalty of law that the information provided is accurate and
                                    truthful. I authorize CPB Bank to share details with the Cyber Crime Police Cell and
                                    Reserve Bank of India.
                                </label>
                            </div>
                            <div className="flex items-center justify-between pt-space-xs">
                                <span className="text-label-sm font-label-sm text-secondary">
                                    Encryption: 256-Bit TLS Secured Transmission
                                </span>
                                <button
                                    className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-lg transition-colors flex items-center gap-space-xs shadow-sm"
                                    type="submit">
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    <span>Submit Incident to 24x7 Fraud Desk</span>
                                </button>
                            </div>
                        </form>
                        
                        <div className="hidden mt-space-md p-space-md bg-surface-container rounded-lg"
                            id="incident-feedback">
                            <div className="flex items-center gap-space-sm text-primary mb-space-xs">
                                <span className="material-symbols-outlined text-[24px]">verified</span>
                                <h4 className="text-headline-sm font-headline-sm font-bold">Incident Registered Successfully
                                </h4>
                            </div>
                            <p className="text-body-sm font-body-sm text-on-surface-variant">
                                Case Reference: <strong
                                    className="text-on-surface font-financial-numeric">CPB-CYB-2025-88291</strong>. A
                                confirmation SMS with investigation tracking link has been dispatched to your registered
                                phone. Emergency transaction hold initiated.
                            </p>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                        <div className="flex items-center gap-space-sm mb-space-sm">
                            <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                                <span className="material-symbols-outlined text-[24px]">account_tree</span>
                            </span>
                            <div>
                                <span
                                    className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Statutory
                                    Compliance</span>
                                <h3 className="text-headline-md font-headline-md text-on-surface font-bold">Escalation
                                    Matrix</h3>
                            </div>
                        </div>
                        <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
                            In accordance with the <strong>RBI Master Direction on Customer Service (2021)</strong> and
                            Limiting Liability in Unauthorized Electronic Banking Transactions.
                        </p>
                        
                        <div className="space-y-space-md">
                            
                            <div className="bg-surface-container-low p-space-md rounded-lg">
                                <div className="flex items-center justify-between mb-space-xs">
                                    <span
                                        className="font-label-lg text-label-lg font-bold text-primary flex items-center gap-space-xs">
                                        <span
                                            className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-financial-numeric">1</span>
                                        <span>Level 1: Branch / 24x7 War Room</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-medium">SLA:
                                        48 Hours</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-xs">
                                    Initial dispute lodging through branch visit, portal ticket, or national hotline.
                                </p>
                                <div className="text-label-sm font-label-sm text-on-surface flex flex-col gap-0.5">
                                    <span>Toll Free: <strong>1800-419-0068</strong></span>
                                    <span>Email: <strong>frauddesk@cpbbank.in</strong></span>
                                </div>
                            </div>
                            
                            <div className="bg-surface-container-low p-space-md rounded-lg">
                                <div className="flex items-center justify-between mb-space-xs">
                                    <span
                                        className="font-label-lg text-label-lg font-bold text-primary flex items-center gap-space-xs">
                                        <span
                                            className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-financial-numeric">2</span>
                                        <span>Level 2: Regional Nodal Officers</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-medium">SLA:
                                        5 Days</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-xs">
                                    If dispute remains unresolved or unsatisfactory after 48 hours.
                                </p>
                                <div className="text-label-sm font-label-sm text-on-surface flex flex-col gap-0.5">
                                    <span>North Zone (New Delhi): <strong>nodal.north@cpbbank.in</strong>
                                        (011-23849100)</span>
                                    <span>West Zone (Mumbai): <strong>nodal.west@cpbbank.in</strong>
                                        (022-66914200)</span>
                                    <span>South Zone (Bengaluru): <strong>nodal.south@cpbbank.in</strong>
                                        (080-49281100)</span>
                                    <span>East Zone (Kolkata): <strong>nodal.east@cpbbank.in</strong>
                                        (033-22894100)</span>
                                </div>
                            </div>
                            
                            <div className="bg-surface-container-low p-space-md rounded-lg">
                                <div className="flex items-center justify-between mb-space-xs">
                                    <span
                                        className="font-label-lg text-label-lg font-bold text-primary flex items-center gap-space-xs">
                                        <span
                                            className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-financial-numeric">3</span>
                                        <span>Level 3: Principal Nodal Officer (PNO)</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-medium">SLA:
                                        7 Days</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-xs">
                                    Executive grievance escalation desk at CPB Corporate Towers.
                                </p>
                                <div className="text-label-sm font-label-sm text-on-surface flex flex-col gap-0.5">
                                    <span>Officer: <strong>Mr. Rajeshwar Rao (EVP, Quality Assurance)</strong></span>
                                    <span>Address: CPB Bank Towers, Bandra-Kurla Complex, Mumbai 400051</span>
                                    <span>Direct Line: <strong>022-67290099</strong> | pno@cpbbank.in</span>
                                </div>
                            </div>
                            
                            <div className="bg-primary-container text-on-primary p-space-md rounded-lg">
                                <div className="flex items-center justify-between mb-space-xs">
                                    <span className="font-label-lg text-label-lg font-bold flex items-center gap-space-xs">
                                        <span
                                            className="w-6 h-6 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center text-label-sm font-financial-numeric">4</span>
                                        <span>Level 4: RBI Integrated Ombudsman</span>
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm bg-surface-container-lowest/20 px-2 py-0.5 rounded">Statutory
                                        Final</span>
                                </div>
                                <p className="text-body-sm font-body-sm text-on-primary-container mb-space-sm">
                                    If the complaint is not resolved within 30 days or is rejected by the bank, account
                                    holders are entitled to approach the RBI Ombudsman directly.
                                </p>
                                <a className="inline-flex items-center gap-space-xs bg-surface-container-lowest text-primary hover:bg-surface-container-low px-space-md py-1.5 rounded text-label-md font-label-md font-semibold transition-colors"
                                    href="https://cms.rbi.org.in" rel="noopener noreferrer" target="_blank">
                                    <span>Open RBI Complaint Management System (CMS)</span>
                                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="w-full bg-surface-container rounded-xl p-space-lg mb-space-lg shadow-sm">
                    <div
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pb-space-md">
                        <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-primary text-[28px]">policy</span>
                            <h4 className="text-headline-md font-headline-md text-primary font-bold">RBI Zero Liability
                                Protection Summary</h4>
                        </div>
                        <span className="text-label-sm font-label-sm text-secondary">RBI Notification: RBI/2017-18/15
                            DBR.No.Leg.BC.78/09.07.005/2017-18</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                        <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col justify-between">
                            <div>
                                <span
                                    className="text-label-sm font-label-sm text-primary uppercase font-bold tracking-wider">Category
                                    1: Zero Liability</span>
                                <h5 className="text-headline-sm font-headline-sm text-on-surface mt-1 mb-space-xs">
                                    Contributory Fraud / System Breach</h5>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">
                                    Zero customer liability where unauthorized transaction occurs due to CPB system
                                    deficiency, technical failure, or third-party breach where neither the bank nor
                                    customer is at fault, reported within <strong>3 working days</strong>.
                                </p>
                            </div>
                            <span className="text-label-md font-label-md text-primary font-bold mt-space-md">Customer
                                Liability: ₹0.00</span>
                        </div>
                        <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col justify-between">
                            <div>
                                <span
                                    className="text-label-sm font-label-sm text-tertiary uppercase font-bold tracking-wider">Category
                                    2: Limited Liability</span>
                                <h5 className="text-headline-sm font-headline-sm text-on-surface mt-1 mb-space-xs">Reported
                                    within 4 to 7 Days</h5>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">
                                    If the delay in reporting is between 4 to 7 working days, per-transaction liability
                                    is capped by RBI: Basic Savings (₹5,000), Regular Savings / Credit Card limit up to
                                    ₹5 Lakhs (₹10,000), and Corporate accounts (₹25,000).
                                </p>
                            </div>
                            <span className="text-label-md font-label-md text-tertiary font-bold mt-space-md">Max Liability
                                Capped at ₹10,000</span>
                        </div>
                        <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col justify-between">
                            <div>
                                <span
                                    className="text-label-sm font-label-sm text-error uppercase font-bold tracking-wider">Category
                                    3: Customer Negligence</span>
                                <h5 className="text-headline-sm font-headline-sm text-on-surface mt-1 mb-space-xs">
                                    Credential Sharing (OTP/PIN)</h5>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">
                                    Where loss is due to customer negligence (e.g. sharing credentials or clicking
                                    unauthorized APK link), customer bears total loss until the unauthorized transaction
                                    is reported to the bank. Any subsequent debits post-reporting are 100% borne by CPB.
                                </p>
                            </div>
                            <span className="text-label-md font-label-md text-error font-bold mt-space-md">Full Liability
                                until Reported</span>
                        </div>
                    </div>
                </section>
                
                <section
                    className="w-full flex flex-wrap items-center justify-between gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
                    <div className="flex items-center gap-space-md flex-wrap">
                        <div className="flex items-center gap-space-xs text-on-surface font-label-lg text-label-lg">
                            <span className="material-symbols-outlined text-primary text-[20px]">link</span>
                            <span>Forensic Portals:</span>
                        </div>
                        <a className="text-body-sm font-body-sm text-primary hover:underline flex items-center gap-1"
                            href="https://cybercrime.gov.in" rel="noopener noreferrer" target="_blank">
                            <span>National Cyber Crime Reporting Portal</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                        <span className="text-secondary">•</span>
                        <a className="text-body-sm font-body-sm text-primary hover:underline flex items-center gap-1"
                            href="https://sancharsaathi.gov.in" rel="noopener noreferrer" target="_blank">
                            <span>Sanchar Saathi (Chakshu / CEIR Block)</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                        <span className="text-secondary">•</span>
                        <a className="text-body-sm font-body-sm text-primary hover:underline flex items-center gap-1"
                            href="https://www.cert-in.org.in" rel="noopener noreferrer" target="_blank">
                            <span>CERT-In Advisories</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
                        <span className="material-symbols-outlined text-[16px] text-surface-tint">verified</span>
                        <span>CPB Cyber Defense Center: SOC-MUM-V7</span>
                    </div>
                </section>
                
                
            </div>
        </div>
    </main>
      <Footer />
    </>
  );
}
