"use client";

const stats = [
  { icon: "🔴", label: "Video Plan",         value: "12", sub: "+20% dari bulan lalu", color: "bg-red-50" },
  { icon: "✂️", label: "Shorts Plan",         value: "8",  sub: "+14% dari bulan lalu", color: "bg-purple-50" },
  { icon: "📅", label: "Total Plan",          value: "20", sub: "+18% dari bulan lalu", color: "bg-blue-50" },
  { icon: "🎯", label: "Target Konsistensi",  value: "75%",sub: "+10% dari bulan lalu", color: "bg-green-50" },
];

const upcoming = [
  { date: "Besok, 2 Apr", title: "Ide Konten",   time: "10:00", icon: "💡", bg: "bg-yellow-100" },
  { date: "3 Apr",        title: "Shorts Tips",  time: "14:00", icon: "🎬", bg: "bg-orange-100" },
  { date: "6 Apr",        title: "Edukasi",      time: "10:00", icon: "📚", bg: "bg-blue-100" },
  { date: "9 Apr",        title: "Review Produk",time: "15:00", icon: "🎯", bg: "bg-red-100" },
  { date: "13 Apr",       title: "Q&A",          time: "13:00", icon: "💬", bg: "bg-teal-100" },
];

const features = [
  { icon: "〰️", title: "Spring Animation",  desc: "Gerakan halus berbasis physics (Framer Motion)" },
  { icon: "✛",  title: "Drag & Drop",       desc: "Pindahkan event dengan mudah & intuitif." },
  { icon: "⚡", title: "Real-time Sync",    desc: "Semua perubahan langsung tersinkronisasi." },
  { icon: "⌨️", title: "Keyboard Shortcut", desc: "Kontrol penuh tanpa menyentuh mouse." },
];

export default function SummaryDashboard() {
  return (
    <div className="space-y-3 pt-1">
      {/* Stats */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-bold text-gray-800">Ringkasan Bulan Ini</h3>
          <button className="text-[11px] text-blue-500 hover:text-blue-700">Bulan Ini ▾</button>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className={`${s.color} rounded-xl p-3`}>
              <div className="text-lg mb-1">{s.icon}</div>
              <div className="text-[20px] font-bold text-gray-900 leading-none mb-0.5">{s.value}</div>
              <div className="text-[10px] text-gray-500 font-medium leading-tight">{s.label}</div>
              <div className="text-[10px] text-green-600 font-semibold mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming + Features row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Upcoming */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-bold text-gray-800">Jadwal Mendatang</h3>
            <button className="text-[11px] text-blue-500 hover:text-blue-700">Lihat Semua →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {upcoming.map((ev) => (
              <div
                key={ev.title}
                className="flex flex-col items-center text-center cursor-pointer group flex-shrink-0"
              >
                <div className={`w-9 h-9 rounded-xl ${ev.bg} flex items-center justify-center text-base mb-1.5 group-hover:scale-110 transition-transform`}>
                  {ev.icon}
                </div>
                <div className="text-[9px] text-gray-400 mb-0.5 whitespace-nowrap">{ev.date}</div>
                <div className="text-[11px] font-semibold text-gray-800 leading-tight whitespace-nowrap">{ev.title}</div>
                <div className="text-[10px] text-gray-400">{ev.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="text-base mb-1">{f.icon}</div>
              <div className="text-[11px] font-semibold text-gray-700">{f.title}</div>
              <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
