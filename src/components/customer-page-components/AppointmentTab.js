import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "../../styles/task.scss";

const AppointmentTab = () => {
  return (
    <div className="calendar-page customer-calendar-page">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrapPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        themeSystem="bootstrap"
        height="auto"
      />
    </div>
  );
};

export default AppointmentTab;
