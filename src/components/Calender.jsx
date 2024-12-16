import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import TransferForm from "./Form";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

export function CalendarComponent({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [eventData, setEventData] = useState(null);

  const handleDateClick = (info) => {
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
