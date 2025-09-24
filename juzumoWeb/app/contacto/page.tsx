'use client';
import { useState } from 'react';
import { waPedidoUrl } from '@/lib/wa';

export default function Page() {
  const [nombre, setNombre] = useState('');
  const [barODireccion, setBar] = useState('');
  const [dia, setDia] = useState('');
  const [franja, setFranja] = useState('');
  const [items, setItems] = useState<Array<{ producto: string; cantidad: string }>>([{ producto: '', cantidad: '' }]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-h1 mb-6">Contacto</h1>
      <div className="grid gap-4">
        <input className="border p-2 rounded-base" placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input className="border p-2 rounded-base" placeholder="Bar o dirección" value={barODireccion} onChange={e=>setBar(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded-base" placeholder="Día" value={dia} onChange={e=>setDia(e.target.value)} />
          <input className="border p-2 rounded-base" placeholder="Franja horaria" value={franja} onChange={e=>setFranja(e.target.value)} />
        </div>

        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded-base" placeholder="Producto" value={it.producto}
                   onChange={e=>setItems(s=>s.map((x,ix)=>ix===i?{...x,producto:e.target.value}:x))}/>
            <input className="border p-2 rounded-base" placeholder="Cantidad (kg/ud)" value={it.cantidad}
                   onChange={e=>setItems(s=>s.map((x,ix)=>ix===i?{...x,cantidad:e.target.value}:x))}/>
          </div>
        ))}
        <button className="justify-self-start rounded-base px-4 py-2 border"
                onClick={()=>setItems(s=>[...s,{producto:'',cantidad:''}])}>
          + Añadir línea
        </button>

        <a className="inline-block mt-4 rounded-base px-6 py-3 bg-brand-green-600 text-white shadow-card"
           href={waPedidoUrl({ nombre, barODireccion, items, dia, franja })} target="_blank" rel="noopener noreferrer">
          Abrir WhatsApp
        </a>

        <p className="text-small text-gray-500 mt-2">
          Al enviar, aceptas nuestra <a className="underline" href="/privacidad">Política de Privacidad</a>.
        </p>
      </div>
    </main>
  );
}
