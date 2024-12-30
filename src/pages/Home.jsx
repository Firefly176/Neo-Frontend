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

function Home() {
  const {
    isOpen: isHistoryOpen,
    onOpen: onHistoryOpen,
    onOpenChange: onHistoryOpenChange,
  } = useDisclosure();

  const handleModalOpen = () => {
    onHistoryOpen();
  };

  return (
    <>
      <div className="m-auto mt-5 w-[1440px]">
        <Card>
          <CardBody>
            <CalendarComponent />
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
