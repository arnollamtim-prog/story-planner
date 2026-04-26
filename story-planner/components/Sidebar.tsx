"use client";

import { useState } from "react";

const navItems = [
  { icon: "📅", label: "Kalender", section: "menu" },
  { icon: "📝", label: "Narasi & Scene", section: "menu" },
  { icon: "💡", label: "Ideas Board", section: "menu" },
  { icon: "💬", label: "Caption Draft", section: "menu" },
  { icon: "🗂️", label: "Prompt Vault", section: "asset" },
  { icon: "📊", label: "YT Analytics", section: "analytik" },
  { icon: "📖", label: "Jurnal Analisis", section: "analytik" },
];

const sections = ["menu", "asset", "analytik"] as const;

export default function Sidebar() {
  const [active, setActive] = useState("Kalender");

  return (
    <aside className="w-[210px] flex-shrink-0 flex flex-col h-screen bg-gradient-to-b from-[#1a2240] to-[#1e2d5a] text-white">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg mb-2 shadow-lg">
          🎬
        </div>
        <div className="text-sm font-bold tracking-tight">Story Planner</div>
        <div className="text-[11px] text-white/40 mt-0.5">YouTube &amp; Shorts</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {sections.map((section) => (
          <div key={section}>
            <div className="text-[10px] font-semibold tracking-widest text-white/30 uppercase px-2 mb-1">
              {section}
            </div>
            {navItems
              .filter((item) => item.section === section)
              .map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all mb-0.5
                    ${active === item.label
                      ? "bg-blue-500/25 text-white"
                      : "text-white/55 hover:text-white hover:bg-white/8"
                    }`}
                >
                  <span className="text-sm w-4 text-center">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.label === "Kalender" && (
                    <span className="text-white/40">›</span>
                  )}
                </button>
              ))}
          </div>
        ))}
      </nav>

      {/* Progress Card */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-blue-600/20 border border-blue-500/20">
        <div className="text-[12px] font-semibold text-white leading-snug mb-0.5">
          Konsistensi adalah kunci sukses konten! ✨
        </div>
        <div className="text-[11px] text-white/45 mb-2">Tetap semangat, kamu bisa!</div>
        <div className="flex justify-between text-[11px] text-white/40 mb-1">
          <span>7/30 hari</span>
          <span>23%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all"
            style={{ width: "23%" }}
          />
        </div>
      </div>

      {/* User */}
      <div className="px-3 py-3 border-t border-white/10 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold shadow">
          S
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold truncate">Lembab</div>
          <div className="text-[11px] text-white/40">Creator Plan</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        <button className="text-white/40 hover:text-white text-sm">▾</button>
      </div>
    </aside>
  );
}
