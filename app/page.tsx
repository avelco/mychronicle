'use client';

import React, { useState } from 'react';
import { MessageSquare, GitFork, BookOpen, Menu, X, ChevronRight, Play, Check } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'sm';
  className?: string;
}

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20',
    outline: 'border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100',
    ghost: 'hover:bg-slate-800 text-slate-100'
  };
  const sizes = {
    default: 'h-10 px-6 py-2',
    lg: 'h-12 px-8 text-lg',
    sm: 'h-8 px-4 text-sm'
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 ${className}`}>
    {children}
  </div>
);

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className = '' }: SeparatorProps) => (
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
          <h4 className="font-semibold text-lg text-slate-100 flex-1">{question}</h4>
          <ChevronRight className={`h-5 w-5 text-violet-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </div>
        {isOpen && (
          <p className="mt-4 text-slate-400 leading-relaxed">
            {answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default function MyChronicle() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Características</a>
            <a href="#demo" className="text-sm text-slate-300 hover:text-white transition-colors">Historias</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Precios</a>
            <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">FAQ</a>
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  Ingresar
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm">
                  Registrarme
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-6">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Características</a>
              <a href="#demo" className="text-slate-300 hover:text-white transition-colors">Historias</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Precios</a>
              <a href="#faq" className="text-slate-300 hover:text-white transition-colors">FAQ</a>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Ingresar
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full">
                    Registrarme
                  </Button>
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
            Escribe tu historia,<br />una conversación a la vez
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tu Crónica Personal. Cada chat es una aventura donde tus decisiones definen la trama. ¿Qué final escribirás?
          </p>

          {/* Phone Mockup Visual */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Chat Interface */}
              <Card className="p-8 transform hover:scale-105 transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs">AI</div>
                    <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-sm p-4">
                      <p className="text-sm">El dragón te observa. Sus ojos brillan como brasas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 bg-violet-600 rounded-2xl rounded-tr-sm p-4 max-w-xs ml-auto">
                      <p className="text-sm text-right">Bajo mi espada lentamente</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">Tú</div>
                  </div>
                </div>
                <ChevronRight className="mx-auto mt-6 h-8 w-8 text-violet-500 animate-pulse" />
              </Card>

              {/* Narrative Output */}
              <Card className="p-8 transform hover:scale-105 transition-transform bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="font-serif text-left space-y-4">
                  <p className="text-lg leading-relaxed text-slate-200">
                    El dragón te observó con ojos que brillaban como brasas en la oscuridad. Un momento de tensión se extendió entre ambos.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-200">
                    Con cuidado, bajaste tu espada, un gesto de paz que resonó en el silencio ancestral de la caverna...
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <Button size="lg" className="text-lg px-10 group">
            Comenzar mi crónica
            <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">
            Convierte la Interacción en<br />Historial Legendario
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:border-violet-600/50 transition-all hover:shadow-lg hover:shadow-violet-600/10">
              <MessageSquare className="h-12 w-12 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-semibold mb-3">Chatea con Personajes Vivos</h3>
              <p className="text-slate-400 leading-relaxed">
                Interactúa con narradores de IA que reaccionan a tus elecciones y estilo de diálogo.
              </p>
              <div className="mt-4 text-sm text-violet-400 font-medium">Conversación dinámica</div>
            </Card>

            <Card className="group hover:border-violet-600/50 transition-all hover:shadow-lg hover:shadow-violet-600/10">
              <GitFork className="h-12 w-12 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-semibold mb-3">Crea Ramas de la Trama</h3>
              <p className="text-slate-400 leading-relaxed">
                Cada decisión y respuesta es un punto de bifurcación que te lleva a un final único y personal.
              </p>
              <div className="mt-4 text-sm text-violet-400 font-medium">Múltiples finales</div>
            </Card>

            <Card className="group hover:border-violet-600/50 transition-all hover:shadow-lg hover:shadow-violet-600/10">
              <BookOpen className="h-12 w-12 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-semibold mb-3">Tu Biblioteca de Crónicas</h3>
              <p className="text-slate-400 leading-relaxed">
                Todas tus aventuras se guardan y formatean como libros digitales para tu colección personal.
              </p>
              <div className="mt-4 text-sm text-violet-400 font-medium">Colección / Permanencia</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-6">
            De Conversación Instantánea<br />a Prosa Épica
          </h2>
          
          <p className="text-center text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Elige tu historia y chatea con personajes únicos. Cada conversación se transforma en una crónica épica.
          </p>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Historias */}
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-violet-300">Historias Disponibles</h3>
                <div className="space-y-6">
                  {/* Historia 1 */}
                  <Card className="group hover:border-violet-600/50 transition-all overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-violet-600 to-indigo-800 flex-shrink-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <h4 className="font-serif text-lg font-bold mb-2">El Dragón Olvidado</h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            Descubre la verdad detrás del último dragón en una aventura de fantasía épica.
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          Comenzar
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
                          <h4 className="font-serif text-lg font-bold mb-2">Misterio en el Expreso</h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            Resuelve un asesinato en un tren de lujo mientras viajas por Europa.
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          Comenzar
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
                          <h4 className="font-serif text-lg font-bold mb-2">La Ciudad Perdida</h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            Explora ruinas antiguas y descubre secretos de una civilización olvidada.
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          Comenzar
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
                          <h4 className="font-serif text-lg font-bold mb-2">Romance en París</h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            Una historia de amor en la ciudad de las luces con finales múltiples.
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">
                          Comenzar
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right Column - Avatares de Chat */}
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-violet-300">Personajes Disponibles</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Avatar 1 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-violet-600 to-purple-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🧙‍♂️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">El Sabio</h4>
                    <p className="text-xs text-slate-400">Mago ancestral</p>
                  </Card>

                  {/* Avatar 2 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-red-600 to-orange-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">⚔️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">La Guerrera</h4>
                    <p className="text-xs text-slate-400">Campeona invicta</p>
                  </Card>

                  {/* Avatar 3 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-amber-600 to-yellow-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🕵️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">El Detective</h4>
                    <p className="text-xs text-slate-400">Investigador astuto</p>
                  </Card>

                  {/* Avatar 4 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-emerald-600 to-green-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🗺️</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">La Exploradora</h4>
                    <p className="text-xs text-slate-400">Aventurera audaz</p>
                  </Card>

                  {/* Avatar 5 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-rose-600 to-pink-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">💕</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">El Romántico</h4>
                    <p className="text-xs text-slate-400">Poeta soñador</p>
                  </Card>

                  {/* Avatar 6 */}
                  <Card className="group hover:border-violet-600/50 transition-all text-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-slate-600 to-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🐉</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">El Dragón</h4>
                    <p className="text-xs text-slate-400">Criatura milenaria</p>
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
              Elige tu Plan de Aventura
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Desde explorador casual hasta cronista legendario. Cada plan desbloquea nuevas posibilidades narrativas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="relative overflow-hidden hover:border-slate-700 transition-all">
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">Explorador</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Gratis</span>
                </div>
                <p className="text-slate-400 mb-6">Perfecto para comenzar tu primera crónica</p>
                
                <Button variant="outline" className="w-full mb-8">Comenzar Gratis</Button>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">3 historias simultáneas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">50 mensajes por día</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">Biblioteca básica</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">Género: Aventura clásica</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Pro Plan - Featured */}
            <Card className="relative overflow-hidden border-violet-600 shadow-xl shadow-violet-600/20 scale-105">
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                MÁS POPULAR
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">Cronista</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-slate-400 mb-6">Para narradores apasionados</p>
                
                <Button className="w-full mb-8 shadow-lg shadow-violet-600/30">Elegir Plan Pro</Button>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Historias ilimitadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Mensajes ilimitados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Todos los géneros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Exportar PDF/EPUB</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Personajes personalizados</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Legend Plan */}
            <Card className="relative overflow-hidden hover:border-violet-700 transition-all bg-gradient-to-br from-slate-900 to-violet-950/30">
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">Leyenda</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$19.99</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-slate-400 mb-6">Para autores de sagas épicas</p>
                
                <Button variant="outline" className="w-full mb-8 border-violet-600 hover:bg-violet-600">Elegir Leyenda</Button>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Todo lo de Cronista, más:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">IA avanzada (GPT-4)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Generación de imágenes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Múltiples personajes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Soporte premium 24/7</span>
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
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre My Chronicle
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem 
              question="¿Puedo cambiar de plan en cualquier momento?"
              answer="Sí, puedes actualizar o degradar tu plan cuando lo desees. Los cambios se reflejan inmediatamente y se prorratean según el tiempo restante de tu ciclo de facturación."
            />
            
            <FAQItem 
              question="¿Qué sucede con mis historias si cancelo mi suscripción?"
              answer="Todas tus historias permanecen guardadas en tu biblioteca personal de forma permanente. Con el plan gratuito, seguirás teniendo acceso completo a todas las crónicas que hayas creado, solo se limitarán las nuevas interacciones."
            />
            
            <FAQItem 
              question="¿Puedo exportar mis historias?"
              answer="Los planes Cronista y Leyenda incluyen exportación en formatos PDF y EPUB. Tus historias se formatean profesionalmente como libros digitales con portadas personalizadas y tipografía elegante."
            />
            
            <FAQItem 
              question="¿Cómo funciona la generación de imágenes?"
              answer="El plan Leyenda incluye generación de imágenes mediante IA para ilustrar momentos clave de tus historias. Puedes generar ilustraciones de personajes, escenarios y escenas épicas que se integran en tu crónica."
            />
            
            <FAQItem 
              question="¿Las historias son completamente privadas?"
              answer="Sí, todas tus historias son 100% privadas por defecto. Solo el plan Leyenda te permite compartir historias públicas si así lo deseas, pero siempre mantienes control total sobre qué compartir."
            />
            
            <FAQItem 
              question="¿Ofrecen descuentos para estudiantes?"
              answer="Sí, ofrecemos un 40% de descuento en planes Cronista y Leyenda para estudiantes y educadores verificados. Contáctanos con tu credencial académica para más información."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-violet-950/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            ¿Listo para ser el protagonista?
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Descarga My Chronicle hoy y descubre un universo que espera tus órdenes.
          </p>

          <Button size="lg" className="text-xl px-12 py-6 h-auto shadow-2xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all">
            Comenzar Aventura
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
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Términos</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacidad</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}