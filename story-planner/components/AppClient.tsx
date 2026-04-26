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
    <div style={{ display: "flex", height: "100vh", background: "#F0F2F8" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", minWidth: 0 }}>
            <CalendarView onSelectEvent={handleSelectEvent} />
          </div>
          <EventDetailPanel selectedDay={selectedDay} />
        </div>
        <div style={{ padding: "0 20px 20px", maxHeight: "310px", overflowY: "auto" }}>
          <SummaryDashboard />
        </div>
      </div>
    </div>
  );
}
