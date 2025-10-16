// components/QuizBienestar.tsx
'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';
import { FRUTAS_QUIZ as DATA } from '@/data/frutas';

type Objetivo = 'energia' | 'defensas' | 'digestion' | 'recuperacion' | 'suenio' | 'hidratacion' | 'piel';
type Formato = 'pieza' | 'zumo' | 'smoothie' | 'bowl';
type Momento = 'desayuno' | 'pre' | 'post' | 'noche';

type RestricRules = 'evitar-citricos' | 'alergia-kiwi-pinya' | 'bajo-azucar' | 'meds-pomelo';

type Nutrientes = {
  vitC_mg?: number; potasio_mg?: number; fibra_g?: number; agua_pct?: number;
  carotenoides?: boolean; polifenoles?: boolean; licopeno?: boolean; luteina_zeaxantina?: boolean;
  bromelina?: boolean; papaina?: boolean; actinidina?: boolean; melatonina?: boolean; grasas_saludables?: boolean;
};

type FruitQuiz = {
  _id: string;
  nombre: string;
  precio: number;
  unidad: string;
  foto: string;
  beneficios: Objetivo[];
  formatosBuenos: Formato[];
  momentoBueno: Momento[];
  temporada: number[];
  restricciones: string[]; // internas (p. ej. interaccion-medicacion-pomelo)
  nutrientes: Nutrientes;
};

type Answers = {
  objetivo?: Objetivo;
  formato?: Formato;
  momento?: Momento;
  restricciones: RestricRules[];
};

const OBJETIVOS: { key: Objetivo; label: string; helper: string }[] = [
  { key: 'energia', label: 'Activarme', helper: 'Energía y foco' },
  { key: 'defensas', label: 'Defensas', helper: 'Vitamina C y antioxidantes' },
  { key: 'digestion', label: 'Digestión', helper: 'Enzimas y pectina' },
  { key: 'recuperacion', label: 'Recuperación', helper: 'Potasio y antiinflamatorios' },
  { key: 'suenio', label: 'Dormir mejor', helper: 'Melatonina natural' },
  { key: 'hidratacion', label: 'Hidratación', helper: '% agua alto' },
  { key: 'piel', label: 'Piel & vista', helper: 'Carotenoides + C' },
];

const FORMATOS: { key: Formato; label: string }[] = [
  { key: 'pieza', label: 'Pieza' },
  { key: 'zumo', label: 'Zumo' },
  { key: 'smoothie', label: 'Smoothie' },
  { key: 'bowl', label: 'Bowl con yogur' },
];

const MOMENTOS: { key: Momento; label: string }[] = [
  { key: 'desayuno', label: 'Desayuno' },
  { key: 'pre', label: 'Antes de entrenar' },
  { key: 'post', label: 'Después de entrenar' },
  { key: 'noche', label: 'Noche' },
];

const RESTRICCIONES: { key: RestricRules; label: string }[] = [
  { key: 'evitar-citricos', label: 'Evitar cítricos / reflujo' },
  { key: 'alergia-kiwi-pinya', label: 'Alergia a kiwi/piña' },
  { key: 'bajo-azucar', label: 'Bajo azúcar' },
  { key: 'meds-pomelo', label: 'Tomo medicación (evitar pomelo)' },
];

// Grupos rápidos para reglas adicionales
const CÍTRICOS = new Set(['limon', 'lima', 'naranja-valencia', 'mandarina-clementina', 'pomelo-rosa']);
const AZUCAR_ALTA = new Set(['platano-canario', 'uva-blanca', 'uva-negra', 'mango', 'higo', 'cereza', 'chirimoya', 'caqui', 'maracuya']);
const KIWI_PIÑA = new Set(['kiwi-verde', 'kiwi-amarillo', 'pinya']);

function scoreFruit(f: FruitQuiz, a: Answers, month: number): number {
  let s = 0;

  // Preferencias principales
  if (a.objetivo && f.beneficios?.includes(a.objetivo)) s += 3;
  if (a.formato && f.formatosBuenos?.includes(a.formato)) s += 2;
  if (a.momento && f.momentoBueno?.includes(a.momento)) s += 2;

  // Temporada
  if (Array.isArray(f.temporada) && f.temporada.includes(month)) s += 1;

  // Restricciones del usuario
  if (a.restricciones?.includes('evitar-citricos') && CÍTRICOS.has(f._id)) s -= 100;
  if (a.restricciones?.includes('alergia-kiwi-pinya') && KIWI_PIÑA.has(f._id)) s -= 100;
  if (a.restricciones?.includes('bajo-azucar') && AZUCAR_ALTA.has(f._id)) s -= 2;
  if (a.restricciones?.includes('meds-pomelo') && (f._id === 'pomelo-rosa' || f.restricciones?.includes('interaccion-medicacion-pomelo'))) s -= 100;

  // Restricciones internas de la fruta (suaves)
  if (f.restricciones?.includes('evitar-reflujo') && a.restricciones?.includes('evitar-citricos')) s -= 2;

  return s;
}

function topRecomendadas(data: FruitQuiz[], answers: Answers): FruitQuiz[] {
  const month = new Date().getMonth() + 1; // 1..12
  const scored = data
    .map((f) => ({ f, s: scoreFruit(f as FruitQuiz, answers, month) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 9)
    .map(({ f }) => f as FruitQuiz);
  return scored;
}

function formatChipFromNutrients(n: Nutrientes): string[] {
  const chips: string[] = [];
  if ((n.vitC_mg ?? 0) >= 40 || n.polifenoles) chips.push('Vit C / Antiox');
  if ((n.potasio_mg ?? 0) >= 300) chips.push('Potasio');
  if ((n.fibra_g ?? 0) >= 2) chips.push('Fibra');
  if (n.carotenoides || n.licopeno || n.luteina_zeaxantina) chips.push('Piel & vista');
  if ((n.agua_pct ?? 0) >= 90) chips.push('Hidratación');
  if (n.bromelina || n.papaina || n.actinidina) chips.push('Digestión');
  if (n.melatonina) chips.push('Sueño');
  if (n.grasas_saludables) chips.push('Grasas saludables');
  return chips.slice(0, 3);
}

function buildWhatsAppHref(phone?: string, items: FruitQuiz[] = []) {
  const header = 'Hola, quiero pedir estas frutas según el cuestionario:\n';
  const lines = items.slice(0, 3).map((f) => `- 2kg ${f.nombre}`);
  const msg = encodeURIComponent(`${header}${lines.join('\n')}\n¿Disponibilidad y precio?`);
  return phone ? `https://wa.me/${phone}?text=${msg}` : `https://wa.me/?text=${msg}`;
}

export default function QuizBienestar({ whatsapp }: { whatsapp?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ restricciones: [] });

  const stepCount = 4;
  const progress = ((step + 1) / stepCount) * 100;

  const canNext =
    (step === 0 && !!answers.objetivo) ||
    (step === 1 && !!answers.formato) ||
    (step === 2 && !!answers.momento) ||
    step === 3;

  const resultados = useMemo(() => (step === stepCount ? topRecomendadas(DATA as FruitQuiz[], answers) : []), [step, answers]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 reveal rounded-base shadow-card bg-white">
      {/* Barra de progreso */}
      <div className="mb-6 h-1.5 w-full rounded-base bg-gray-100">
        <div className="h-1.5 rounded-base bg-brand-green-600 transition-all duration-ui ease-motion" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      {/* Cabecera */}
      {step < stepCount ? (
        <>
          <h2 className="text-h2 mb-2">Cuestionario saludable</h2>
          <p className="text-gray-600 mb-8">Dime lo que buscas y te recomendamos frutas y verduras al momento.</p>

          {/* Paso 0: Objetivo */}
          {step === 0 && (
            <div className="stagger grid grid-cols-1 gap-3 md:grid-cols-2">
              {OBJETIVOS.map((o, i) => (
                <button
                  key={o.key}
                  className={`chip justify-between hover-lift ${answers.objetivo === o.key ? 'bg-brand-green-600 text-white' : ''}`}
                  style={{ ['--i' as any]: i }}
                  onClick={() => setAnswers((prev) => ({ ...prev, objetivo: o.key }))}
                >
                  <span>{o.label}</span>
                  <span className="text-xs opacity-80">{o.helper}</span>
                </button>
              ))}
            </div>
          )}

          {/* Paso 1: Formato */}
          {step === 1 && (
            <div className="stagger grid grid-cols-2 gap-3 md:grid-cols-4">
              {FORMATOS.map((f, i) => (
                <button
                  key={f.key}
                  className={`chip justify-center hover-lift ${answers.formato === f.key ? 'bg-brand-green-600 text-white' : ''}`}
                  style={{ ['--i' as any]: i }}
                  onClick={() => setAnswers((prev) => ({ ...prev, formato: f.key }))}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {/* Paso 2: Momento */}
          {step === 2 && (
            <div className="stagger grid grid-cols-1 gap-3 md:grid-cols-2">
              {MOMENTOS.map((m, i) => (
                <button
                  key={m.key}
                  className={`chip justify-center hover-lift ${answers.momento === m.key ? 'bg-brand-green-600 text-white' : ''}`}
                  style={{ ['--i' as any]: i }}
                  onClick={() => setAnswers((prev) => ({ ...prev, momento: m.key }))}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}

          {/* Paso 3: Restricciones */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-3">
              {RESTRICCIONES.map((r) => {
                const active = answers.restricciones.includes(r.key);
                return (
                  <label key={r.key} className={`chip justify-between hover-lift cursor-pointer ${active ? 'bg-gray-100' : ''}`}>
                    <span>{r.label}</span>
                    <input
                      type="checkbox"
                      className="accent-green-600"
                      checked={active}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          restricciones: e.target.checked
                            ? [...prev.restricciones, r.key]
                            : prev.restricciones.filter((k) => k !== r.key),
                        }))
                      }
                    />
                  </label>
                );
              })}
            </div>
          )}

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between">
            <button
              className="underline-slide text-gray-600"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Atrás
            </button>
            <div className="flex gap-3">
              <button className="underline-slide text-gray-600" onClick={() => { setAnswers({ restricciones: [] }); setStep(0); }}>
                Reiniciar
              </button>
              <button
                className={`rounded-base px-5 py-3 shadow-card duration-ui ease-motion ${canNext ? 'bg-brand-green-600 text-white hover:bg-brand-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                onClick={() => canNext && setStep((s) => s + 1)}
                disabled={!canNext}
              >
                {step === stepCount - 1 ? 'Ver resultados' : 'Siguiente'}
              </button>
            </div>
          </div>
        </>
      ) : (
        // Resultados
        <>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-h2">Recomendaciones para ti</h2>
              <p className="text-gray-600">
                Basado en <strong>{OBJETIVOS.find(o => o.key === answers.objetivo)?.label ?? 'tu objetivo'}</strong>,{' '}
                <strong>{FORMATOS.find(f => f.key === answers.formato)?.label ?? 'tu formato'}</strong> y{' '}
                <strong>{MOMENTOS.find(m => m.key === answers.momento)?.label ?? 'tu momento'}</strong>
                {answers.restricciones.length ? ` (evitando: ${answers.restricciones.map(r => RESTRICCIONES.find(x => x.key === r)?.label).join(', ')})` : ''}.
              </p>
            </div>
            <button className="underline-slide text-gray-600" onClick={() => setStep(0)}>Cambiar respuestas</button>
          </div>

          {resultados.length === 0 ? (
            <div className="rounded-base border border-dashed border-gray-300 p-6 text-center">
              <p className="mb-3 font-medium">No hay un match perfecto con esas restricciones.</p>
              <p className="text-gray-600">Propuesta segura para empezar: Naranja, Manzana, Pera y Plátano.</p>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {resultados.map((f) => {
                  const chips = formatChipFromNutrients(f.nutrientes);
                  return (
                    <li key={f._id} className="hover-lift rounded-base shadow-card overflow-hidden bg-white">
                      <div className="aspect-[4/3] w-full bg-gray-100">
                        <img src={f.foto} alt={f.nombre} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 text-lg font-semibold">{f.nombre}</h3>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {chips.map((c) => (
                            <span key={c} className="chip">{c}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{f.precio.toFixed(2)}€ / {f.unidad}</span>
                          <a
                            className="rounded-base px-3 py-2 text-sm bg-brand-green-600 text-white hover:bg-brand-green-700 duration-ui ease-motion"
                            href={buildWhatsAppHref(whatsapp, [f])}
                            target="_blank" rel="noopener noreferrer"
                          >
                            Pedir por WhatsApp
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex justify-center">
                <a
                  className="rounded-base px-6 py-4 shadow-card bg-brand-green-600 text-white hover:bg-brand-green-700 duration-ui ease-motion"
                  href={buildWhatsAppHref(whatsapp, resultados)}
                  target="_blank" rel="noopener noreferrer"
                >
                  Armar pedido con las mejores 3
                </a>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
