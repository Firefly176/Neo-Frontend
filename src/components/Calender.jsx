import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import TransferForm from "./Form";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

export function CalendarComponent({ data }) {
  const {
    isOpen: isFormModalOpen,
    onOpen: onOpenFormModal,
    onOpenChange: onOpenChangeFormModal,
  } = useDisclosure();

  const [eventData, setEventData] = useState(null);

  const handleDateClick = (info) => {
    const selectedDate = new Date(info.dateStr);
    const currentDate = new Date();

    // Compare only the date part
    if (selectedDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
      return;
    }

    setEventData(info);
    onOpenFormModal(true);
  };

  const handleEventClick = (info) => {
    setEventData(info);
    onOpenFormModal(true);
  };

  const handleAllowSelect = (selectInfo) => {
    const selectedDate = new Date(selectInfo.startStr);
    const currentDate = new Date();
    return selectedDate > currentDate;
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
        selectAllow={handleAllowSelect}
      />
      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          placement="top-center"
          onOpenChange={onOpenChangeFormModal}
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
  const { title, fromAddress, toAddress, amount, message, status } =
    eventInfo.event.extendedProps;

  return (
    <div className="event-content w-full p-2 border-2 border-gray-200 rounded-md">
      <div>
        <b>{title}</b>
      </div>
      <div>{eventInfo.event.start.toLocaleTimeString()}</div>
      <div>
        <b>To:</b> {toAddress}
      </div>
      <div>
        <b>Amount:</b> {amount}
      </div>
      <div>
        <b>Status:</b> {status}
      </div>
    </div>
  );
}
