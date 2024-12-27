/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Input, Button, TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";

const TransferForm = ({ eventData }) => {
  const { fromAddress, toAddress, amount, message, status } =
    eventData?.event?.extendedProps || {};

  const [senderAddress, setSenderAddress] = useState(fromAddress || "");
  const [receiverAddress, setReceiverAddress] = useState(toAddress || "");
  const [amountValue, setAmountValue] = useState(amount || "");
  const [messageValue, setMessageValue] = useState(message || "");
  const [scheduleTime, setScheduleTime] = useState(
    new Time(
      new Date(eventData?.event?.start).getHours(),
      new Date(eventData?.event?.start).getMinutes(),
    ),
  );

  const [action, setAction] = useState(null);

  return (
    <Form
      validationBehavior="native"
      onReset={() => {
        setSenderAddress("");
        setReceiverAddress("");
        setAmountValue("");
        setMessageValue("");
        setScheduleTime(new Time(0, 0));
        setAction("reset");
      }}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
      }}
      className="m-5"
    >
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
        label="Sender's Address"
        labelPlacement="outside"
        name="senderAddress"
        placeholder="Enter your Wallet Address"
        type="text"
        value={senderAddress}
        onChange={(e) => setSenderAddress(e.target.value)}
        isDisabled={!!status}
      />

      <Input
        isRequired
        errorMessage="Please enter a valid address"
        label="Receiver's Address"
        labelPlacement="outside"
        name="receiverAddress"
        placeholder="Enter your receiver's address"
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
    </Form>
  );
};

export default TransferForm;
