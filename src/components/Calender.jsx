import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import TransferForm from "./Form";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export function CalendarComponent({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [eventData, setEventData] = useState(null);

  const handleDateClick = (info) => {
    const selectedDate = new Date(info.dateStr);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Please select a future date.");
      return;
    }
    setEventData(info);
    onOpen(true);
  };

  const handleEventClick = (info) => {
    setEventData(info);
    onOpen(true);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={data}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        buttonText={{
          today: "Today",
          month: "month",
          week: "week",
          day: "day",
          list: "list",
        }}
        height={600}
        eventClick={handleEventClick}
        selectable={true}
        dateClick={handleDateClick}
      />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent size={"xs"}>
            <TransferForm eventData={eventData} />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      {/* {console.log(eventInfo)} */}
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
