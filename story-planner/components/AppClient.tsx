"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CalendarView from "@/components/CalendarView";
import EventDetailPanel from "@/components/EventDetailPanel";
import SummaryDashboard from "@/components/SummaryDashboard";

export default function AppClient() {
  const [selectedDay, setSelectedDay] = useState(15);

  return (
    <div className="flex h-screen bg-[#F0F2F8] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex flex-1 overflow-hidden min-h-0">
          <div className="flex-1 overflow-y-auto p-5 min-w-0">
            <CalendarView onSelectEvent={setSelectedDay} />
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
