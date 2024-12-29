import { CalendarComponent } from "../components/Calender";
// import TransferForm from "../components/Form";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

function Home() {
  const {
    isOpen: isHistoryOpen,
    onOpen: onHistoryOpen,
    onOpenChange: onHistoryOpenChange,
  } = useDisclosure();

  // eslint-disable-next-line no-unused-vars
  const [calendarData, setCalendarData] = useState([
    {
      title: "transfer",
      start: "2024-12-15T11:15:30.762Z",
      fromAddress: "asdasdasd",
      toAddress: "312312412",
      amount: "20",
      message: "test",
      status: "Completed",
    },
    {
      title: "transfer",
      start: "2024-12-15T15:15:30.762Z",
      fromAddress: "21412412",
      toAddress: "23232",
      amount: "230",
      message: "test",
      status: "Completed",
    },
  ]);

  const handleModalOpen = () => {
    onHistoryOpen();
  };

  return (
    <>
      <div className="m-auto mt-5 w-[1440px]">
        <Card>
          <CardBody>
            <CalendarComponent data={calendarData} />
          </CardBody>
        </Card>
        <Button className="mt-5 h-[50px] w-[200px]" onPress={handleModalOpen}>
          Transaction History
        </Button>
        {isHistoryOpen && (
          <Modal
            isOpen={isHistoryOpen}
            onOpenChange={onHistoryOpenChange}
            placement="top-center"
            size="5xl"
          >
            <ModalContent>
              <TransactionHistory />
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Home;
