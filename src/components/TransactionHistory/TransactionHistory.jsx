import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const TransactionHistory = () => {
  const rows = [
    {
      id: "1",
      recipientAddress: "123 Main St",
      message: "Payment for services",
      amount: 150.75,
      scheduledDate: "2024-01-01T12:00:00Z",
      status: "Completed",
    },
    {
      id: "2",
      recipientAddress: "456 Elm St",
      message: "Refund",
      amount: 75.5,
      scheduledDate: "2024-01-05T12:00:00Z",
      status: "Pending",
    },
    {
      id: "3",
      recipientAddress: "789 Oak St",
      message: "Gift",
      amount: 200.0,
      scheduledDate: "2024-01-10T12:00:00Z",
      status: "Scheduled",
    },
    {
      id: "4",
      recipientAddress: "321 Pine St",
      message: "Invoice payment",
      amount: 300.25,
      scheduledDate: "2024-01-15T12:00:00Z",
      status: "Cancelled",
    },
  ];

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
        <TableBody items={rows}>
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
