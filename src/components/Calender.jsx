import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// eslint-disable-next-line react/prop-types
export function CalendarComponent({ data }) {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={data}
        eventContent={renderEventContent}
        buttonText={{
          today: "Today",
          month: "month",
          week: "week",
          day: "day",
          list: "list",
        }}
        height={600}
        eventClick={() => {
          alert("hello");
        }}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
