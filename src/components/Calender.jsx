import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import TransferForm from "./Form";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { get } from "../utils/api_helper";
import { useSelector } from "react-redux";

export function CalendarComponent() {
  const userDetails = useSelector((state) => state.auth?.userDetails);

  const {
    isOpen: isFormModalOpen,
    onOpen: onOpenFormModal,
    onClose: onCloseFormModal,
    onOpenChange: onOpenChangeFormModal,
  } = useDisclosure();

  const [eventData, setEventData] = useState(null);
  const [allEventData, setAllEventData] = useState([]);
  const [viewRange, setViewRange] = useState({ start: null, end: null });

  const handleDateClick = (info) => {
    const selectedDate = new Date(info.dateStr);
    const currentDate = new Date();

    // Compare only the date part
    if (selectedDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
      return;
    }

    setEventData(info);
    onOpenFormModal();
  };

  const handleEventClick = (info) => {
    setEventData(info);
    onOpenFormModal();
  };

  const handleAllowSelect = (selectInfo) => {
    const selectedDate = new Date(selectInfo.startStr);
    const currentDate = new Date();
    return selectedDate > currentDate;
  };

  const handleDatesSet = (dateInfo) => {
    setViewRange({ start: dateInfo.startStr, end: dateInfo.endStr });
  };

  async function transactionFetch() {
    if (viewRange.start && viewRange.end && userDetails) {
      try {
        const response = await get(
          `/web3/transaction?start=${new Date(
            viewRange.start,
          ).toISOString()}&end=${new Date(viewRange.end).toISOString()}`,
        );
        if (response.length !== 0) {
          setAllEventData(
            response.map((transaction) => ({
              title: "transfer",
              start: transaction.scheduledDate,
              fromAddress: userDetails.walletAddress,
              recipientAddress: transaction.recipientAddress,
              amount: transaction.amount,
              message: transaction.message,
              status: transaction.status,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  }

  useEffect(() => {
    transactionFetch();
  }, [viewRange, userDetails]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={allEventData}
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
        datesSet={handleDatesSet}
      />
      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          placement="top-center"
          onOpenChange={onOpenChangeFormModal}
        >
          <ModalContent size={"xs"}>
            <TransferForm
              eventData={eventData}
              onCloseFormModal={onCloseFormModal}
              transactionFetch={transactionFetch}
            />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

function renderEventContent(eventInfo) {
  // eslint-disable-next-line no-unused-vars
  const { title, fromAddress, recipientAddress, amount, message, status } =
    eventInfo.event.extendedProps;

  return (
    <div className="event-content w-full p-2 border-2 border-gray-200 rounded-md">
      <div>
        <b>{title}</b>
      </div>
      <div>{eventInfo.event.start.toLocaleTimeString()}</div>
      <div>
        <b>Amount:</b> {amount}
      </div>
      <div>
        <b>Status:</b> {status}
      </div>
    </div>
  );
}
