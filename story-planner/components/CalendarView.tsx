"use client";

import { useState } from "react";

const DAYS = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];

type EventItem = { label: string; time: string; color: string; icon: string };

const EVENTS: Record<number, EventItem[]> = {
  2:  [{ label: "Ide Konten",       time: "10:00", color: "blue",   icon: "💡" }],
  3:  [{ label: "Shorts Tips",      time: "14:00", color: "orange", icon: "🎬" }],
  6:  [{ label: "Edukasi",          time: "10:00", color: "blue",   icon: "📚" }],
  9:  [{ label: "Review Produk",    time: "15:00", color: "red",    icon: "🎯" }],
  13: [{ label: "Q&A",              time: "13:00", color: "teal",   icon: "💬" }],
  15: [{ label: "Review Produk",    time: "15:00", color: "red",    icon: "🎯" }],
  17: [{ label: "Behind the Scene", time: "16:00", color: "purple", icon: "🎬" }],
  21: [{ label: "Trend Check",      time: "11:00", color: "green",  icon: "📈" }],
  24: [{ label: "Analisa Konten",   time: "10:00", color: "orange", icon: "📊" }],
  26: [{ label: "Upload Plan 🚀",   time: "09:00", color: "blue",   icon: "📤" }],
  28: [{ label: "Inspirasi",        time: "10:00", color: "teal",   icon: "✨" }],
};

const colorMap: Record<string, string> = {
  blue:   "bg-blue-50   text-blue-700   border-blue-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red:    "bg-red-50    text-red-700    border-red-200",
  teal:   "bg-teal-50   text-teal-700   border-teal-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  green:  "bg-green-50  text-green-700  border-green-200",
};

// April 2026 starts on Wednesday (col index 3)
const START_DAY = 3;
const TOTAL_DAYS = 30;
const TODAY = 26;

export default function CalendarView({
  onSelectEvent,
}: {
  onSelectEvent: (day: number) => void;
}) {
  const [selectedDay, setSelectedDay] = useState(15);

  const cells: (number | null)[] = [
    ...Array(START_DAY).fill(null),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const handleSelect = (day: number) => {
    setSelectedDay(day);
    onSelectEvent(day);
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-lg hover:bg-white border border-gray-200 flex items-center justify-center text-gray-500 text-sm">‹</button>
          <h2 className="text-xl font-bold text-gray-900">April 2026</h2>
          <button className="w-7 h-7 rounded-lg hover:bg-white border border-gray-200 flex items-center justify-center text-gray-500 text-sm">›</button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Online avatars */}
          <div className="flex items-center gap-1.5 mr-1">
            <div className="flex -space-x-1.5">
              {["bg-blue-400", "bg-pink-400", "bg-orange-400"].map((c, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <span className="text-[11px] font-medium text-green-600">● 3 online</span>
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-[12px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-white bg-white/60">
            🔴 YouTube
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-[12px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-white bg-white/60">
            ✂️ Shorts
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-[12px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-white bg-white/60">
            ↓ Export Narasi
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            + Tambah ▾
          </button>
        </div>
      </div>

      {/* Quote */}
      <div className="text-[12px] text-gray-400 italic mb-3">
        "Rencanakan hari ini, ciptakan cerita yang berkesan." ✍️
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <button className="px-3 py-1 text-[11px] font-semibold bg-blue-600 text-white rounded-lg shadow-sm">
          Hari Ini
        </button>
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {[
            { label: "Edukasi", color: "bg-blue-400" },
            { label: "Review",  color: "bg-red-400" },
            { label: "Inspirasi", color: "bg-teal-400" },
            { label: "Upload",  color: "bg-cyan-400" },
            { label: "Analisa", color: "bg-orange-400" },
          ].map((tag) => (
            <span key={tag.label} className="flex items-center gap-1 text-[11px] text-gray-500 cursor-pointer hover:text-gray-700">
              <span className={`w-2 h-2 rounded-full ${tag.color}`} />
              {tag.label}
            </span>
          ))}
          <button className="px-2.5 py-1 text-[11px] border border-gray-200 rounded-lg text-gray-500 hover:bg-white bg-white/60">
            Filter
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map((d) => (
            <div key={d} className="text-[11px] font-semibold text-gray-400 text-center py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const events = day ? EVENTS[day] ?? [] : [];
            const isToday = day === TODAY;
            const isSelected = day === selectedDay;

            return (
              <div
                key={idx}
                onClick={() => day && handleSelect(day)}
                className={`min-h-[78px] border-r border-b border-gray-100 last:border-r-0 p-1.5 transition-colors
                  ${!day ? "bg-gray-50/40" : "cursor-pointer hover:bg-blue-50/30"}
                  ${isSelected && day ? "ring-2 ring-inset ring-blue-400 bg-blue-50/20" : ""}`}
              >
                {day && (
                  <>
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-[12px] font-semibold mb-1
                        ${isToday ? "bg-blue-600 text-white" : "text-gray-700"}`}
                    >
                      {day}
                    </div>
                    {events.map((ev, i) => (
                      <div
                        key={i}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border mb-0.5 truncate ${colorMap[ev.color]}`}
                      >
                        {ev.icon} {ev.label}
                        <div className="text-[9px] opacity-60">{ev.time}</div>
                      </div>
                    ))}
                  </>
                )}
                {!day && (
                  <span className="text-[11px] text-gray-300">
                    {idx < START_DAY ? 29 + idx : ""}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
