import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  TimeInput,
} from "@nextui-org/react";

export function TransferForm() {
  // eslint-disable-next-line no-unused-vars
  const [action, setAction] = useState(null);

  return (
    <Card className="m-auto w-full max-w-xs flex flex-col gap-4">
      <CardBody className="p-5">
        {" "}
        <Form
          validationBehavior="native"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid address"
            label="Sender's Address"
            labelPlacement="outside"
            name="senderAddress"
            placeholder="Enter your Wallet Address"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid address"
            label="Receiver's Address"
            labelPlacement="outside"
            name="receiverAddress"
            placeholder="Enter your receiver's address"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid amount"
            label="Amount"
            labelPlacement="outside"
            name="amount"
            placeholder="Enter amount"
            type=""
          />
          <TimeInput isRequired label="Schedule Time" />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button type="reset" variant="flat">
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
