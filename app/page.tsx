import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Fingerprint,
  Smartphone,
  CreditCard,
  Wallet,
  PiggyBank,
  ShieldCheck,
  Building2,
  Terminal,
  ChevronRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { EmiCalculator } from "@/components/marketing/EmiCalculator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* ----------------- TOP NAVBAR ----------------- */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-lg shadow-md shadow-blue-500/20">
            CPB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                Code Paglu Bank
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold hidden sm:block">
              Premium Retail Banking
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600">
          <Link href="#accounts" className="hover:text-blue-600 transition-colors">Accounts</Link>
          <Link href="#cards" className="hover:text-blue-600 transition-colors">Credit Cards</Link>
          <Link href="#loans" className="hover:text-blue-600 transition-colors">Loans</Link>
          <Link href="#tools" className="hover:text-blue-600 transition-colors">Calculators</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/onboard"
            className="hidden sm:flex px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all items-center gap-1.5"
          >
            Open an Account
          </Link>
          <Link
            href="/customer/login"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" /> Login
          </Link>
        </div>
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-slate-50 pointer-events-none -z-10" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[80px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 bg-blue-100/50 px-3 py-1.5 rounded-full border border-blue-200 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" /> Rated #1 Digital Bank in India
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
              Banking that keeps pace with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ambition.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
              Experience zero-fee digital savings accounts, instant biometric authentication, and lightning-fast UPI transfers. Open your account in under 3 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/onboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                Open an Account Instantly <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/customer/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                Login to Customer Portal
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-8 text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Balance Setup</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Virtual Debit Card</div>
            </div>
          </div>
        </div>

        {/* ----------------- PRODUCTS SHOWCASE ----------------- */}
        <section id="accounts" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Products</h2>
              <p className="text-slate-500 font-medium">Tailored financial solutions designed to help you build wealth and achieve your goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Savings Account */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wallet className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Savings</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Earn up to 7.1% p.a. interest with our zero-balance digital savings account. Comes with a complimentary Platinum Visa Debit Card.
                </p>
                <Link href="/onboard" className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Apply Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Credit Cards */}
              <div id="cards" className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">CPB Aura Credit Card</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Experience unlimited 2% cashback on all spends. Zero joining fees and complimentary international airport lounge access.
                </p>
                <Link href="/onboard" className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore Cards <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Fixed Deposits */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <PiggyBank className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Fixed Deposits</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Secure your future with industry-leading interest rates up to 8.5% p.a. Flexible tenures from 7 days to 10 years.
                </p>
                <Link href="/onboard" className="text-emerald-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Rates <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- EMI CALCULATOR SECTION ----------------- */}
        <section id="tools" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                  Calculate your loan EMIs in seconds.
                </h2>
                <p className="text-lg text-slate-400 font-medium max-w-md leading-relaxed">
                  Whether you're buying your dream home or a new car, use our interactive calculator to plan your finances with absolute clarity.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><CheckCircle2 className="w-4 h-4" /></div>
                    <span className="font-medium text-slate-300">Instant Approval up to ₹50L</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><CheckCircle2 className="w-4 h-4" /></div>
                    <span className="font-medium text-slate-300">Zero Foreclosure Charges</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-slate-900">
                <EmiCalculator />
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- BIOMETRIC SECURITY SECTION ----------------- */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-[2.5rem] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none" />
              
              <div className="space-y-6 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                  <Smartphone className="w-4 h-4" /> Military Grade Security
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Passwordless authentication built for the modern era.
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  We've eliminated passwords. Access your customer portal instantly using our proprietary AI-driven Face Recognition and Fingerprint biometric scanners directly from your browser.
                </p>
                <div className="pt-4">
                  <Link
                    href="/customer/login"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-xl hover:bg-slate-100 transition-all"
                  >
                    <Fingerprint className="w-4 h-4 text-blue-600" /> Try Biometric Login
                  </Link>
                </div>
              </div>
              
              {/* Abstract Security Graphic */}
              <div className="w-full md:w-auto relative z-10 hidden md:block">
                <div className="w-64 h-64 rounded-full border-4 border-dashed border-white/20 animate-[spin_20s_linear_infinite] flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border border-blue-400/30 scale-75 animate-ping" />
                  <Fingerprint className="w-20 h-20 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ----------------- CORPORATE FOOTER & INTERNAL PORTALS ----------------- */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-md">
                CPB
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Code Paglu Bank
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              A futuristic core banking platform demonstrating production-grade microservices, biometric authentication, and enterprise financial workflows.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Internal Portals</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/staff/login" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Branch Staff Desk
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Executive Admin & CISO
                </Link>
              </li>
              <li>
                <Link href="/server/login" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> DevOps & Cloud Infra
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">RBI Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© 2026 Code Paglu Bank. All rights reserved.</p>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Systems Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
