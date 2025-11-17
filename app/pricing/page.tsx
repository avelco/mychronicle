'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card className="cursor-pointer hover:border-violet-600/50 transition-all" onClick={() => setIsOpen(!isOpen)}>
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
    </Card>
  );
};


const PricingPage = () => {
  return (
    <>
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

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
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
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">3 historias simultáneas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">50 mensajes por día</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                    </div>
                    <span className="text-sm text-slate-300">Biblioteca básica</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
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
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Historias ilimitadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Mensajes ilimitados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Todos los géneros desbloqueados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Exportar como PDF/EPUB</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Personajes personalizados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Respuestas prioritarias</span>
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
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Todo lo de Cronista, más:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">IA avanzada (GPT-4)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Generación de imágenes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Tramas con múltiples personajes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Compartir historias públicas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm text-slate-100 font-medium">Soporte premium 24/7</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-3xl font-bold text-center mb-12">
              Preguntas Frecuentes
            </h3>

            <div className="space-y-4">
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
                question="¿Cómo funciona la generación de imágenes en el plan Leyenda?"
                answer="El plan Leyenda incluye generación de imágenes mediante IA para ilustrar momentos clave de tus historias. Puedes generar ilustraciones de personajes, escenarios y escenas épicas que se integran en tu crónica."
              />
              
              <FAQItem 
                question="¿Las historias son completamente privadas?"
                answer="Sí, todas tus historias son 100% privadas por defecto. Solo el plan Leyenda te permite compartir historias públicas si así lo deseas, pero siempre mantienes control total sobre qué compartir."
              />
              
              <FAQItem 
                question="¿Ofrecen descuentos para estudiantes o educadores?"
                answer="Sí, ofrecemos un 40% de descuento en planes Cronista y Leyenda para estudiantes y educadores verificados. Contáctanos en education@mychronicle.app con tu credencial académica."
              />
            </div>
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
    </>
  );
};

export default PricingPage;