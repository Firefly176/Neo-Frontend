/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form, Input, Button, TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { CircularProgress } from "@nextui-org/progress";
import Web3 from 'web3';
import PaymentSchedulerJSON from '../contract/PaymentScheduler.json' with { type: 'json' };
import { post } from "../utils/api_helper";
const PaymentSchedulerABI = PaymentSchedulerJSON.abi;

const TransferForm = ({ eventData, onCloseFormModal, transactionFetch }) => {
  const { toAddress, amount, message, status } = eventData?.event?.extendedProps || {};
  const [loading, setLoading] = useState(false);
  const { dateStr } = eventData;
  const [receiverAddress, setReceiverAddress] = useState(toAddress || "");
  const [amountValue, setAmountValue] = useState(amount || "");
  const [messageValue, setMessageValue] = useState(message || "");
  const [scheduleTime, setScheduleTime] = useState(
    eventData?.event?.start ? new Time(
      new Date(eventData?.event?.start).getHours(),
      new Date(eventData?.event?.start).getMinutes(),
    ) : new Time(
      new Date().getHours(),
      new Date().getMinutes() + 5,
    )
  );
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [action, setAction] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const networkId = await web3Instance.eth.net.getId();

          // Check if we're on Neo X Testnet
          if (networkId === 12227332n) {
            const contractInstance = new web3Instance.eth.Contract(
              PaymentSchedulerABI,
              import.meta.env.VITE_CONTRACT_ADDRESS,
            );
            setContract(contractInstance);
          } else {
            console.error('Please connect to Neo X Testnet');
          }
        } catch (error) {
          console.error("User denied account access or error occurred:", error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };    
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const date = new Date(dateStr);
    date.setHours(scheduleTime.hour);
    date.setMinutes(scheduleTime.minute);
    const scheduledTime = Math.floor(date.getTime() / 1000);

    data.scheduledDate = date.toISOString();
      
    try {
      const accounts = await web3.eth.getAccounts();
      const amountInWei = web3.utils.toWei(data.amount, 'ether');
      const fee = await contract.methods.calculateDynamicFee(amountInWei).call();
      const totalValue = web3.utils.toBigInt(amountInWei) + (web3.utils.toBigInt(fee));

      const result = await contract.methods.scheduleTransaction(
        data.recipientAddress,
        amountInWei,
        scheduledTime
      ).send({
        from: accounts[0],
        value: totalValue.toString()
      });

      if(parseInt(result.status.toString())) {
        await post("/web3/transaction", {...data, result: JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)});
        setAction(`submit ${JSON.stringify(data)}`);
        setLoading(false);
        onCloseFormModal();
        transactionFetch();
      } else{
        setLoading(false);
        console.error("Transaction failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error scheduling transaction:", error);
    } finally {
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
          setScheduleTime(new Time(
            new Date().getHours(),
            new Date().getMinutes() + 5,
          ));
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
