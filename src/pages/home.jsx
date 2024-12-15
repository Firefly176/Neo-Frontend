// import { Calendar } from "@nextui-org/react";
// import FullCalendar from "@fullcalendar/react";
import { CalendarComponent } from "../components/Calender";
import { TransferForm } from "../components/Form";
import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [calendarData, setCalendarData] = useState([
    {
      title: "Meeting",
      start: "2024-12-15T11:15:30.762Z",
      fromAddress: "",
      toAddress: "",
      amount: "",
    },
  ]);

  return (
    <>
      <div className="m-auto mt-5 w-[1440px]">
        <Card>
          <CardBody>
            <CalendarComponent data={calendarData} />
          </CardBody>
        </Card>
        <TransferForm />
      </div>
    </>
  );
}

export default Home;
