"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  GitFork,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  Play,
  Check,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  className?: string;
}

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default:
      "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20",
    outline:
      "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
    ghost: "hover:bg-slate-800 text-slate-100",
  };
  const sizes = {
    default: "h-10 px-6 py-2",
    lg: "h-12 px-8 text-lg",
    sm: "h-8 px-4 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 ${className}`}
  >
    {children}
  </div>
);

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className = "" }: SeparatorProps) => (
  <div className={`shrink-0 bg-slate-800 h-[1px] w-full ${className}`} />
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm cursor-pointer hover:border-violet-600/50 transition-all"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-semibold text-lg text-slate-100 flex-1">
            {question}
          </h4>
          <ChevronRight
            className={`h-5 w-5 text-violet-500 flex-shrink-0 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
        {isOpen && (
          <p className="mt-4 text-slate-400 leading-relaxed">{answer}</p>
        )}
      </div>
    </div>
  );
};

export default function MyChronicle() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tNav = useTranslations('nav');
  const tHero = useTranslations('hero');
  const tFeatures = useTranslations('features');
  const tDemo = useTranslations('demo');
  const tPricing = useTranslations('pricing');
  const tFaq = useTranslations('faq');
  const tCta = useTranslations('cta');
  const tFooter = useTranslations('footer');
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        .font-serif { font-family: 'Lora', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-violet-500" />
            <span className="font-serif text-xl font-bold">My Chronicle</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {tNav('features')}
            </a>
            <a
              href="#demo"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {tNav('stories')}
            </a>
            <a
              href="#pricing"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {tNav('pricing')}
            </a>
            <a
              href="#faq"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {tNav('faq')}
            </a>
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  {tNav('signIn')}
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm">{tNav('signUp')}</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-6">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {tNav('features')}
              </a>
              <a
                href="#demo"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {tNav('stories')}
              </a>
              <a
                href="#pricing"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {tNav('pricing')}
              </a>
              <a
                href="#faq"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {tNav('faq')}
              </a>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    {tNav('signIn')}
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full">{tNav('signUp')}</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton />
                </div>
              </SignedIn>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-radial from-violet-950/20 via-transparent to-transparent" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-violet-100 to-slate-300 bg-clip-text text-transparent">
            {tHero('title').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {tHero('subtitle')}
          </p>

          {/* Phone Mockup Visual */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Chat Interface */}
              <Card className="p-8 transform hover:scale-105 transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs">
                      AI
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-sm p-4">
                      <p className="text-sm">
                        El dragón te observa. Sus ojos brillan como brasas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 bg-violet-600 rounded-2xl rounded-tr-sm p-4 max-w-xs ml-auto">
                      <p className="text-sm text-right">
                        Bajo mi espada lentamente
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                      Tú
                    </div>
                  </div>
                </div>
                <ChevronRight className="mx-auto mt-6 h-8 w-8 text-violet-500 animate-pulse" />
              </Card>

              {/* Narrative Output */}
              <Card className="p-8 transform hover:scale-105 transition-transform bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="font-serif text-left space-y-4">
                  <p className="text-lg leading-relaxed text-slate-200">
                    El dragón te observó con ojos que brillaban como brasas en
                    la oscuridad. Un momento de tensión se extendió entre ambos.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-200">
                    Con cuidado, bajaste tu espada, un gesto de paz que resonó
                    en el silencio ancestral de la caverna...
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <Button size="lg" className="text-lg px-10 group">
            {tHero('cta')}
            <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">
            {tFeatures('title').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:border-violet-600/50 transition-all hover:shadow-lg hover:shadow-violet-600/10">
              <MessageSquare className="h-12 w-12 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-semibold mb-3">
                {tFeatures('chat.title')}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {tFeatures('chat.description')}
              </p>
              <div className="mt-4 text-sm text-violet-400 font-medium">
                {tFeatures('chat.tag')}
              </div>
            </Card>

            <Card className="group hover:border-violet-600/50 transition-all hover:shadow-lg hover:shadow-violet-600/10">
              <GitFork className="h-12 w-12 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-semibold mb-3">
                {tFeatures('branches.title')}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {tFeatures('branches.description')}
              </p>
              <div className="mt-4 text-sm text-violet-400 font-medium">
                {tFeatures('branches.tag')}
              </div>
            </Card>

            <Card className="group hover:border-violet-600/50 transition-all hover:shadow-lg hover:shadow-violet-600/10">
              <BookOpen className="h-12 w-12 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-semibold mb-3">
                {tFeatures('library.title')}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {tFeatures('library.description')}
              </p>
              <div className="mt-4 text-sm text-violet-400 font-medium">
                {tFeatures('library.tag')}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-6">
            {tDemo('title').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p className="text-center text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            {tDemo('subtitle')}
          </p>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Historias */}
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-violet-300">
                  {tDemo('stories')}
                </h3>
                <div className="space-y-6">
                  {/* Historia 1 */}
                  <Card className="group hover:border-violet-600/50 transition-all overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-violet-600 to-indigo-800 flex-shrink-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <h4 className="font-serif text-lg font-bold mb-2">
                            {tDemo('story1.title')}
                          </h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {tDemo('story1.description')}
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          {tDemo('startButton')}
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Historia 2 */}
                  <Card className="group hover:border-violet-600/50 transition-all overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-orange-800 flex-shrink-0 flex items-center justify-center">
                        <MessageSquare className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <h4 className="font-serif text-lg font-bold mb-2">
                            {tDemo('story2.title')}
                          </h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {tDemo('story2.description')}
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          {tDemo('startButton')}
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Historia 3 */}
                  <Card className="group hover:border-violet-600/50 transition-all overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-emerald-600 to-teal-800 flex-shrink-0 flex items-center justify-center">
                        <GitFork className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <h4 className="font-serif text-lg font-bold mb-2">
                            {tDemo('story3.title')}
                          </h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {tDemo('story3.description')}
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          {tDemo('startButton')}
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Historia 4 */}
                  <Card className="group hover:border-violet-600/50 transition-all overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-rose-600 to-pink-800 flex-shrink-0 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <h4 className="font-serif text-lg font-bold mb-2">
                            {tDemo('story4.title')}
                          </h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {tDemo('story4.description')}
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          {tDemo('startButton')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right Column - Avatares de Chat */}
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-violet-300">
                  {tDemo('characters')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Avatar 1 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-violet-600 to-purple-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🧙‍♂️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{tDemo('character1.name')}</h4>
                    <p className="text-xs text-slate-400">{tDemo('character1.role')}</p>
                  </Card>

                  {/* Avatar 2 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-red-600 to-orange-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">⚔️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{tDemo('character2.name')}</h4>
                    <p className="text-xs text-slate-400">{tDemo('character2.role')}</p>
                  </Card>

                  {/* Avatar 3 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-amber-600 to-yellow-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🕵️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{tDemo('character3.name')}</h4>
                    <p className="text-xs text-slate-400">
                      {tDemo('character3.role')}
                    </p>
                  </Card>

                  {/* Avatar 4 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-emerald-600 to-green-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🗺️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">
                      {tDemo('character4.name')}
                    </h4>
                    <p className="text-xs text-slate-400">{tDemo('character4.role')}</p>
                  </Card>

                  {/* Avatar 5 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-rose-600 to-pink-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">💕</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{tDemo('character5.name')}</h4>
                    <p className="text-xs text-slate-400">{tDemo('character5.role')}</p>
                  </Card>

                  {/* Avatar 6 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-slate-600 to-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🐉</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{tDemo('character6.name')}</h4>
                    <p className="text-xs text-slate-400">{tDemo('character6.role')}</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              {tPricing('title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {tPricing('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="relative overflow-hidden hover:border-slate-700 transition-all">
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {tPricing('free.name')}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tPricing('free.price')}</span>
                </div>
                <p className="text-slate-400 mb-6">
                  {tPricing('free.description')}
                </p>

                <Button variant="outline" className="w-full mb-8">
                  {tPricing('free.cta')}
                </Button>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">
                      {tPricing('free.feature1')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">
                      {tPricing('free.feature2')}
                    </span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Pro Plan - Featured */}
            <Card className="relative overflow-hidden border-violet-600 shadow-xl shadow-violet-600/20 scale-105">
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                {tPricing('pro.badge')}
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">{tPricing('pro.name')}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tPricing('pro.price')}</span>
                  <span className="text-slate-400">{tPricing('pro.period')}</span>
                </div>
                <p className="text-slate-400 mb-6">
                  {tPricing('pro.description')}
                </p>

                <Button className="w-full mb-8 shadow-lg shadow-violet-600/30">
                  {tPricing('pro.cta')}
                </Button>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('pro.feature1')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('pro.feature2')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('pro.feature3')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('pro.feature4')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('pro.feature5')}
                    </span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Legend Plan */}
            <Card className="relative overflow-hidden hover:border-violet-700 transition-all bg-gradient-to-br from-slate-900 to-violet-950/30">
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">{tPricing('legend.name')}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tPricing('legend.price')}</span>
                  <span className="text-slate-400">{tPricing('legend.period')}</span>
                </div>
                <p className="text-slate-400 mb-6">
                  {tPricing('legend.description')}
                </p>

                <Button
                  variant="outline"
                  className="w-full mb-8 border-violet-600 hover:bg-violet-600"
                >
                  {tPricing('legend.cta')}
                </Button>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('legend.feature1')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('legend.feature2')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('legend.feature3')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('legend.feature4')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">
                      {tPricing('legend.feature5')}
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              {tFaq('title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {tFaq('subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question={tFaq('q1.question')}
              answer={tFaq('q1.answer')}
            />

            <FAQItem
              question={tFaq('q2.question')}
              answer={tFaq('q2.answer')}
            />
            
            <FAQItem
              question={tFaq('q4.question')}
              answer={tFaq('q4.answer')}
            />

            <FAQItem
              question={tFaq('q5.question')}
              answer={tFaq('q5.answer')}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-violet-950/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            {tCta('title')}
          </h2>

          <Button
            size="lg"
            className="text-xl px-12 py-6 h-auto shadow-2xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all"
          >
            {tCta('button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <Separator className="mb-12" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-violet-500" />
              <span className="font-serif font-bold">My Chronicle</span>
              <span className="text-slate-600 ml-2">© 2025</span>
            </div>

            <div className="flex gap-8">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                {tFooter('terms')}
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                {tFooter('privacy')}
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                {tFooter('twitter')}
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                {tFooter('discord')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
