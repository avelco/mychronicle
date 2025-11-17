'use client';

import React, { useState } from 'react';
import { MessageSquare, GitFork, BookOpen, Menu, X, ChevronRight, Play } from 'lucide-react';

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

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

const Tabs = ({ children, defaultValue }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className="w-full">
      {React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement<TabsListProps | TabsContentProps>, { activeTab, setActiveTab })
      )}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const TabsList = ({ children, activeTab, setActiveTab }: TabsListProps) => (
  <div className="inline-flex h-12 items-center justify-center rounded-md bg-slate-900 p-1 mb-8">
    {React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement<TabsTriggerProps>, { activeTab, setActiveTab })
    )}
  </div>
);

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const TabsTrigger = ({ children, value, activeTab, setActiveTab }: TabsTriggerProps) => (
  <button
    onClick={() => setActiveTab?.(value)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-2 text-sm font-medium transition-all ${
      activeTab === value
        ? 'bg-violet-600 text-white shadow-sm'
        : 'text-slate-400 hover:text-slate-100'
    }`}
  >
    {children}
  </button>
);

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  activeTab?: string;
}

const TabsContent = ({ children, value, activeTab }: TabsContentProps) => (
  activeTab === value ? <div className="mt-2">{children}</div> : null
);

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className = '' }: SeparatorProps) => (
  <div className={`shrink-0 bg-slate-800 h-[1px] w-full ${className}`} />
);

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
            <Button variant="outline" size="sm">Iniciar Sesión</Button>
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
              <Button variant="outline" className="w-full">Iniciar Sesión</Button>
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

          <div className="flex items-center justify-center gap-6 mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
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
            Mira cómo tus diálogos se transforman automáticamente en una crónica bellamente escrita y guardada para siempre en tu biblioteca.
          </p>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="chat">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="chat">Conversación (Mecánica)</TabsTrigger>
                  <TabsTrigger value="narrative">Narrativa (Resultado)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat">
                <Card className="p-8">
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">AI</div>
                      <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-sm p-4">
                        <p>La puerta antigua cruje. ¿Entras a la torre olvidada?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 bg-violet-600 rounded-2xl rounded-tr-sm p-4 max-w-sm ml-auto">
                        <p className="text-right">Sí, con cautela empujo la puerta</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">Tú</div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">AI</div>
                      <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-sm p-4">
                        <p>La luz de la luna ilumina un libro abierto en un pedestal de piedra.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 bg-violet-600 rounded-2xl rounded-tr-sm p-4 max-w-sm ml-auto">
                        <p className="text-right">Me acerco para leer sus páginas</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">Tú</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="narrative">
                <Card className="p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <div className="font-serif text-lg leading-loose space-y-6 max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-violet-300 mb-2">Capítulo III</h3>
                      <p className="text-slate-500 text-sm uppercase tracking-wider">La Torre Olvidada</p>
                    </div>
                    
                    <p className="text-slate-200">
                      La puerta antigua crujió bajo el peso de los siglos cuando la empujé con cautela. Sus bisagras protestaron, pero cedieron, revelando las sombras que habitaban el interior de la torre olvidada.
                    </p>
                    
                    <p className="text-slate-200">
                      La luz plateada de la luna se derramaba a través de una grieta en el techo, iluminando como un foco celestial un libro abierto que descansaba sobre un pedestal de piedra. Sus páginas amarillentas parecían susurrar secretos ancestrales.
                    </p>
                    
                    <p className="text-slate-200">
                      Me acerqué con pasos que resonaban en el silencio absoluto, cada eco una declaración de mi presencia en aquel lugar sagrado. Las palabras en el libro comenzaron a brillar con un fulgor dorado cuando mis ojos las contemplaron...
                    </p>

                    <div className="text-center mt-8 pt-8 border-t border-slate-700">
                      <p className="text-slate-500 text-sm italic">La historia continúa...</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
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