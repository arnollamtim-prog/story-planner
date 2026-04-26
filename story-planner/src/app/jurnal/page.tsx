'use client'
import { useState, useEffect } from 'react'
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import AppLayout from '@/components/layout/AppLayout'
import { JurnalEntry } from '@/lib/types'
import { subscribeJurnal, addJurnal, updateJurnal, deleteJurnal } from '@/lib/db'

const MOODS = ['😞', '😕', '😐', '😊', '🤩']

export default function JurnalPage() {
  const [items, setItems] = useState<JurnalEntry[]>([])
  const [modal, setModal] = useState<{ open: boolean; item?: JurnalEntry }>({ open: false })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [form, setForm] = useState({ date: format(new Date(), 'yyyy-MM-dd'), konten: '', pencapaian: '', tantangan: '', rencanaBesok: '', mood: 3 as JurnalEntry['mood'] })

  useEffect(() => { const u = subscribeJurnal(setItems); return () => u() }, [])

  const openAdd = () => { setForm({ date: format(new Date(), 'yyyy-MM-dd'), konten: '', pencapaian: '', tantangan: '', rencanaBesok: '', mood: 3 }); setModal({ open: true }) }
  const openEdit = (item: JurnalEntry) => { setForm({ date: item.date, konten: item.konten, pencapaian: item.pencapaian, tantangan: item.tantangan, rencanaBesok: item.rencanaBesok, mood: item.mood }); setModal({ open: true, item }) }
  const close = () => setModal({ open: false })

  const save = async () => {
    const now = Date.now()
    if (modal.item) {
      await updateJurnal(modal.item.id, { ...form, updatedAt: now })
    } else {
      await addJurnal({ ...form, createdAt: now, updatedAt: now })
    }
    close()
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Jurnal Analisis</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{items.length} entri jurnal</p>
          </div>
          <button onClick={openAdd} className="btn-primary"><Plus size={16} />Tulis Jurnal</button>
        </div>

        {items.length === 0 ? (
          <div className="card text-center py-16">
            <p className="font-display text-lg mb-2" style={{ color: 'var(--muted)' }}>Belum ada jurnal</p>
            <button onClick={openAdd} className="btn-primary mx-auto"><Plus size={16} />Mulai Menulis</button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="card">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{MOODS[item.mood - 1]}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: 'var(--ink)' }}>
                      {format(new Date(item.date), 'EEEE, d MMMM yyyy', { locale: id })}
                    </p>
                    {expanded !== item.id && item.konten && (
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>{item.konten}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(item)} className="btn-ghost p-1.5 text-xs">Edit</button>
                    <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="btn-ghost p-1.5">
                      {expanded === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
                {expanded === item.id && (
                  <div className="mt-4 pt-4 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
                    {[
                      { label: 'Konten Hari Ini', value: item.konten },
                      { label: 'Pencapaian', value: item.pencapaian },
                      { label: 'Tantangan', value: item.tantangan },
                      { label: 'Rencana Besok', value: item.rencanaBesok },
                    ].map(({ label, value }) => value ? (
                      <div key={label}>
                        <p className="text-xs font-semibold mb-1 tracking-wide" style={{ color: 'var(--muted)' }}>{label.toUpperCase()}</p>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--ink)' }}>{value}</p>
                      </div>
                    ) : null)}
                    <button onClick={async () => { await deleteJurnal(item.id); setExpanded(null) }}
                      className="text-xs px-3 py-1.5 rounded-lg" style={{ background: '#fce8e4', color: 'var(--accent)' }}>Hapus Entri</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {modal.open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold">{modal.item ? 'Edit Jurnal' : 'Tulis Jurnal'}</h2>
              <button onClick={close} className="btn-ghost p-1.5"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Tanggal</label>
                <input type="date" className="input-field" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Mood Hari Ini</label>
                <div className="flex gap-3">
                  {MOODS.map((m, i) => (
                    <button key={i} onClick={() => setForm(p => ({ ...p, mood: (i + 1) as JurnalEntry['mood'] }))}
                      className="text-2xl transition-all p-1 rounded-lg"
                      style={{ opacity: form.mood === i + 1 ? 1 : 0.4, background: form.mood === i + 1 ? 'var(--cream)' : 'transparent', transform: form.mood === i + 1 ? 'scale(1.2)' : 'scale(1)' }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { key: 'konten', label: 'Konten yang dibuat hari ini', placeholder: 'Konten apa yang kamu buat?' },
                { key: 'pencapaian', label: 'Pencapaian', placeholder: 'Apa yang berhasil kamu capai?' },
                { key: 'tantangan', label: 'Tantangan', placeholder: 'Apa tantangan yang dihadapi?' },
                { key: 'rencanaBesok', label: 'Rencana Besok', placeholder: 'Apa rencanamu untuk besok?' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                  <textarea className="textarea-field" rows={3} placeholder={placeholder}
                    value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                {modal.item && (
                  <button onClick={async () => { await deleteJurnal(modal.item!.id); close() }}
                    className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#fce8e4', color: 'var(--accent)' }}>Hapus</button>
                )}
                <div className="flex-1" />
                <button onClick={close} className="btn-ghost">Batal</button>
                <button onClick={save} className="btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
