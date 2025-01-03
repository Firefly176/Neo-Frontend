import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { get } from "../../utils/api_helper";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const TransactionHistory = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const columns = [
    {
      key: "recipientAddress",
      label: "RECIPIENT ADDRESS",
    },
    {
      key: "message",
      label: "MESSAGE",
    },
    {
      key: "amount",
      label: "AMOUNT",
    },
    {
      key: "scheduledDate",
      label: "SCHEDULED DATE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  useEffect(() => {
    async function fetchTransactionHistory() {
      try {
        setLoading(true);
        const response = await get(`/web3/transaction/history`);
        if (response.length !== 0) {
          setRows(
            response.map((transaction) => ({
              id: transaction.id,
              recipientAddress: transaction.recipientAddress,
              message: transaction.message,
              amount: transaction.amount,
              scheduledDate: transaction.scheduledDate,
              status: transaction.status,
            })),
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactionHistory();
  }, []);
  return (
    <>
      <Table
        aria-label="Transaction history table"
        fullWidth={true}
        selectionMode="single"
        topContent={
          <span className="text-lg font-bold text-center">
            Transaction History
          </span>
        }
        bottomContent={
          <span className="text-s font-normal text-center">
            Showing Last 10 Transactions.
          </span>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} isLoading={isLoading} loader={<Loader />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionHistory;
