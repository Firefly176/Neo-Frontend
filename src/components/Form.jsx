/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Input, Button, TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { post } from "../utils/api_helper";
import { CircularProgress } from "@nextui-org/progress";

const TransferForm = ({ eventData, onCloseFormModal, transactionFetch }) => {
  const { toAddress, amount, message, status } =
    eventData?.event?.extendedProps || {};

  const [loading, setLoading] = useState(false);
  const { dateStr } = eventData;

  // const [senderAddress, setSenderAddress] = useState(fromAddress || "");
  const [receiverAddress, setReceiverAddress] = useState(toAddress || "");
  const [amountValue, setAmountValue] = useState(amount || "");
  const [messageValue, setMessageValue] = useState(message || "");
  const [scheduleTime, setScheduleTime] = useState(
    new Time(
      new Date(eventData?.event?.start).getHours(),
      new Date(eventData?.event?.start).getMinutes(),
    ),
  );

  // eslint-disable-next-line no-unused-vars
  const [action, setAction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = Object.fromEntries(new FormData(e.currentTarget));

    // Extract date from dateStr
    const date = new Date(dateStr);

    // Set hours and minutes from scheduleTime
    date.setHours(scheduleTime.hour);
    date.setMinutes(scheduleTime.minute);

    // Format the date to ISO string or any other desired format
    data.scheduledDate = date.toISOString();

    try {
      const response = await post("/web3/transaction", data);
      console.log("Success:", response);
      setAction(`submit ${JSON.stringify(data)}`);
      setLoading(false);
      onCloseFormModal();
      transactionFetch();
      //toast
    } catch (error) {
      console.error("Error submitting the form:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        validationBehavior="native"
        onReset={() => {
          setReceiverAddress("");
          setAmountValue("");
          setMessageValue("");
          setScheduleTime(new Time(0, 0));
          setAction("reset");
        }}
        onSubmit={handleSubmit}
        className="m-5 max-h-[500px]"
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {status && (
              <div className="mb-2 p-2 bg-gray-200 rounded-md">
                <b>Status:</b> {status}
              </div>
            )}
            {eventData?.event?.start && (
              <div className="mb-2 p-2 bg-gray-200 rounded-md">
                <b>Scheduled Time:</b>{" "}
                {new Date(eventData?.event?.start).toLocaleString()}
              </div>
            )}
            <Input
              isRequired
              errorMessage="Please enter a valid address"
              label="Receiver's Address"
              labelPlacement="outside"
              name="recipientAddress"
              placeholder="Enter receiver's address"
              type="text"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              isDisabled={!!status}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid amount"
              label="Amount"
              labelPlacement="outside"
              name="amount"
              placeholder="Enter amount"
              type="number"
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
              isDisabled={!!status}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid message"
              label="Message"
              labelPlacement="outside"
              name="message"
              placeholder="Enter your message"
              type="text"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              isDisabled={!!status}
            />
            <TimeInput
              isRequired
              label="Schedule Time"
              value={scheduleTime}
              onChange={setScheduleTime}
              isDisabled={!!status}
            />
            {!status && (
              <div className="flex gap-2 mt-4">
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button type="reset" variant="flat">
                  Reset
                </Button>
              </div>
            )}
          </>
        )}
      </Form>
    </>
  );
};

export default TransferForm;
