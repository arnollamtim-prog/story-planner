"use client";

import { useState, useEffect } from "react";

type EventData = {
  title: string;
  date: string;
  time: string;
  tags: string[];
  desc: string;
  checklist: { label: string; done: boolean }[];
  collaborators: string[];
  icon: string;
  badge: string;
  badgeColor: string;
};

const EVENT_DATA: Record<number, EventData> = {
  2: {
    title: "Ide Konten", date: "Selasa, 2 April 2026", time: "10:00 - 11:00",
    tags: ["#ide", "#konten", "#brainstorm"], icon: "💡", badge: "Inspirasi", badgeColor: "text-teal-500",
    desc: "Kumpulkan dan dokumentasikan ide konten terbaik untuk bulan ini.",
    checklist: [{ label: "Buka notes ide lama", done: true }, { label: "Riset tren terbaru", done: false }, { label: "Pilih 3 ide terbaik", done: false }],
    collaborators: ["🧑", "👩"],
  },
  3: {
    title: "Shorts Tips", date: "Rabu, 3 April 2026", time: "14:00 - 15:00",
    tags: ["#shorts", "#tips", "#youtube"], icon: "🎬", badge: "Upload", badgeColor: "text-cyan-500",
    desc: "Rekam tips singkat untuk format Shorts YouTube.",
    checklist: [{ label: "Tulis script", done: true }, { label: "Setup kamera", done: false }, { label: "Rekam & edit", done: false }],
    collaborators: ["🧑"],
  },
  9: {
    title: "Review Produk", date: "Kamis, 9 April 2026", time: "15:00 - 16:00",
    tags: ["#review", "#produk", "#youtube"], icon: "🎯", badge: "Review", badgeColor: "text-red-500",
    desc: "Buat review jujur dan bandingkan kelebihan produk.",
    checklist: [{ label: "Riset produk", done: true }, { label: "Tulis outline", done: false }, { label: "Rekam video", done: false }, { label: "Editing", done: false }],
    collaborators: ["🧑", "👩"],
  },
  13: {
    title: "Q&A Session", date: "Minggu, 13 April 2026", time: "13:00 - 14:00",
    tags: ["#qa", "#komunitas", "#live"], icon: "💬", badge: "Edukasi", badgeColor: "text-blue-500",
    desc: "Jawab pertanyaan subscriber secara live atau video.",
    checklist: [{ label: "Kumpulkan pertanyaan", done: true }, { label: "Siapkan jawaban", done: true }, { label: "Rekam sesi", done: false }],
    collaborators: ["🧑", "👩", "👨"],
  },
  15: {
    title: "Review Produk", date: "Selasa, 15 April 2026", time: "15:00 - 16:00",
    tags: ["#review", "#produk", "#youtube"], icon: "🎯", badge: "Review", badgeColor: "text-red-500",
    desc: "Buat review jujur dan bandingkan kelebihan produk.",
    checklist: [{ label: "Riset produk", done: true }, { label: "Tulis outline", done: true }, { label: "Rekam video", done: false }, { label: "Editing", done: false }],
    collaborators: ["🧑", "👩", "👨"],
  },
  17: {
    title: "Behind the Scene", date: "Kamis, 17 April 2026", time: "16:00 - 17:00",
    tags: ["#bts", "#vlog", "#kreator"], icon: "🎬", badge: "Upload", badgeColor: "text-cyan-500",
    desc: "Dokumentasi proses di balik layar pembuatan konten.",
    checklist: [{ label: "Siapkan kamera B-roll", done: true }, { label: "Rekam proses editing", done: false }, { label: "Assembling footage", done: false }],
    collaborators: ["🧑"],
  },
  21: {
    title: "Trend Check", date: "Senin, 21 April 2026", time: "11:00 - 12:00",
    tags: ["#trend", "#analisa", "#riset"], icon: "📈", badge: "Analisa", badgeColor: "text-orange-500",
    desc: "Cek tren terbaru YouTube dan Shorts untuk bulan depan.",
    checklist: [{ label: "Cek Google Trends", done: false }, { label: "Analisa kompetitor", done: false }, { label: "Dokumentasi temuan", done: false }],
    collaborators: ["🧑", "👩"],
  },
  24: {
    title: "Analisa Konten", date: "Kamis, 24 April 2026", time: "10:00 - 11:30",
    tags: ["#analisa", "#performa", "#data"], icon: "📊", badge: "Analisa", badgeColor: "text-orange-500",
    desc: "Review performa konten bulan ini dan buat laporan.",
    checklist: [{ label: "Export data YT Studio", done: false }, { label: "Analisa CTR & watch time", done: false }, { label: "Buat insight laporan", done: false }],
    collaborators: ["🧑"],
  },
  26: {
    title: "Upload Plan 🚀", date: "Minggu, 26 April 2026", time: "09:00 - 10:00",
    tags: ["#upload", "#planning", "#schedule"], icon: "📤", badge: "Upload", badgeColor: "text-cyan-500",
    desc: "Jadwalkan upload konten minggu ini dan siapkan thumbnail.",
    checklist: [{ label: "Pilih konten final", done: true }, { label: "Buat thumbnail", done: false }, { label: "Upload ke YT", done: false }],
    collaborators: ["🧑"],
  },
  28: {
    title: "Inspirasi", date: "Selasa, 28 April 2026", time: "10:00 - 11:00",
    tags: ["#inspirasi", "#ide", "#kreativitas"], icon: "✨", badge: "Inspirasi", badgeColor: "text-teal-500",
    desc: "Sesi eksplorasi dan mencari inspirasi konten baru.",
    checklist: [{ label: "Tonton kreator lain", done: false }, { label: "Catat ide spontan", done: false }],
    collaborators: ["🧑", "👩"],
  },
};

const DEFAULT_EVENT = EVENT_DATA[15];

export default function EventDetailPanel({ selectedDay }: { selectedDay: number }) {
  const event = EVENT_DATA[selectedDay] ?? DEFAULT_EVENT;
  const [checks, setChecks] = useState<boolean[]>([]);

  useEffect(() => {
    setChecks(event.checklist.map((c) => c.done));
  }, [selectedDay, event]);

  const toggle = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const done = checks.filter(Boolean).length;

  return (
    <div className="w-[270px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <span className="text-[13px] font-semibold text-gray-700">Detail Event</span>
        <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl flex-shrink-0">
            {event.icon}
          </div>
          <div>
            <div className={`text-[11px] font-semibold uppercase tracking-wide mb-0.5 ${event.badgeColor}`}>
              {event.badge}
            </div>
            <div className="text-[15px] font-bold text-gray-900 leading-tight">{event.title}</div>
          </div>
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-[12px] text-gray-600">
          <div className="flex items-center gap-2"><span>📅</span><span>{event.date}</span></div>
          <div className="flex items-center gap-2"><span>🕒</span><span>{event.time}</span></div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span>🏷️</span>
            {event.tags.map((t) => (
              <span key={t} className="text-blue-500 hover:underline cursor-pointer">{t}</span>
            ))}
          </div>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0">📄</span>
            <span className="text-gray-500 leading-relaxed">{event.desc}</span>
          </div>
        </div>

        {/* Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-gray-700">Checklist</span>
            <span className="text-[11px] text-gray-400">{done}/{event.checklist.length}</span>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-gray-100 rounded-full mb-3 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: event.checklist.length > 0 ? `${(done / event.checklist.length) * 100}%` : "0%" }}
            />
          </div>
          <div className="space-y-2">
            {event.checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checks[i] ?? item.done}
                  onChange={() => toggle(i)}
                  className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                />
                <span className={`text-[12px] transition-all ${(checks[i] ?? item.done) ? "line-through text-gray-400" : "text-gray-700"}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          <button className="mt-2 text-[12px] text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors">
            + Tambah Checklist
          </button>
        </div>

        {/* Collaborators */}
        <div>
          <div className="text-[13px] font-semibold text-gray-700 mb-2">Kolaborator</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {event.collaborators.map((c, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm border-2 border-white shadow-sm"
              >
                {c}
              </div>
            ))}
            <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-400 text-base transition-colors">
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 py-2 text-[12px] font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors flex items-center justify-center gap-1">
            ✏️ Edit Event
          </button>
          <button className="px-3 py-2 text-[12px] font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
            ▾
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="text-[12px] font-semibold text-gray-600 mb-2.5">⌨️ Keyboard Shortcuts</div>
          <div className="space-y-1.5">
            {[
              ["N", "Buat event baru"],
              ["K", "Command palette"],
              ["← →", "Ganti bulan"],
              ["T", "Kembali ke hari ini"],
            ].map(([key, desc]) => (
              <div key={key} className="flex items-center justify-between text-[11px]">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono text-gray-600 shadow-sm">
                  {key}
                </kbd>
                <span className="text-gray-500">{desc}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-gray-400 mt-2">Press ? untuk semua shortcut</div>
        </div>
      </div>
    </div>
  );
}
