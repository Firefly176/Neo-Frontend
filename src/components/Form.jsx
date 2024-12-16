/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, Input, Button, TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";

const TransferForm = ({ eventData }) => {
  const [senderAddress, setSenderAddress] = useState(
    eventData?.event?.fromAddress || "",
  );
  const [receiverAddress, setReceiverAddress] = useState(
    eventData?.event?.toAddress || "",
  );
  const [amount, setAmount] = useState(eventData?.event?.amount || "");
  const [scheduleTime, setScheduleTime] = useState(
    new Time(
      new Date(eventData?.event?.start).getHours(),
      new Date(eventData?.event?.start).getMinutes(),
    ),
  );

  // eslint-disable-next-line no-unused-vars
  const [action, setAction] = useState(null);

  return (
    <Form
      validationBehavior="native"
      onReset={() => {
        setSenderAddress("");
        setReceiverAddress("");
        setAmount("");
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
      />

      <Input
        isRequired
        errorMessage="Please enter a valid amount"
        label="Amount"
        labelPlacement="outside"
        name="amount"
        placeholder="Enter amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <TimeInput
        isRequired
        label="Schedule Time"
        value={scheduleTime}
        onChange={setScheduleTime}
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default TransferForm;
