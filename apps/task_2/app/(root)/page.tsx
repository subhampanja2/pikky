"use client";

import { DataTable } from "@/components/shared/data-table";
import { FlightData, columns } from "./columns";
import { getUserSession } from "@/lib/actions/auth.actions";
import { getFlightStatus } from "@/lib/actions/flight.actions";
import { useEffect, useState } from "react";

// async function getData(): Promise<FlightData[]> {
//   return [
//     {
//       id: "728ed52f",
//       number: "48451asd",
//       origin: "kolkata",
//       destination: "goa",
//       depart_time: "10:00AM",
//       status: "Delayed",
//     },
//   ];
// }

export default function DemoPage() {
  const [flightStatus, setFightStatus] = useState<any>();
  const loadData = async () => {
    // const data = await getData();
    const { session: user } = await getUserSession();
    if (user) {
      const flightStatus = await getFlightStatus();
      setFightStatus(flightStatus);
      console.log("🚀 ~ loadData ~ flightStatus:", flightStatus);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
