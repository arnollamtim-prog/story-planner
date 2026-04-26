"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const CalendarView = dynamic(() => import("@/components/CalendarView"), { ssr: false });
const EventDetailPanel = dynamic(() => import("@/components/EventDetailPanel"), { ssr: false });
const SummaryDashboard = dynamic(() => import("@/components/SummaryDashboard"), { ssr: false });

export default function AppClient() {
  const [selectedDay, setSelectedDay] = useState(15);

  const handleSelectEvent = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  return (
    <div className="flex h-screen bg-[#F0F2F8] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex flex-1 overflow-hidden min-h-0">
          <div className="flex-1 overflow-y-auto p-5 min-w-0">
            <CalendarView onSelectEvent={handleSelectEvent} />
          </div>
          <EventDetailPanel selectedDay={selectedDay} />
        </div>
        <div className="px-5 pb-5 flex-shrink-0 overflow-y-auto" style={{ maxHeight: "310px" }}>
          <SummaryDashboard />
        </div>
      </main>
    </div>
  );
}
