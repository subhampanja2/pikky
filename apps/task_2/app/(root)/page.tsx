"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/shared/data-table";
// import { getFlightData } from "./getFlightData"; // Import getFlightData function
import {
  getAllFlights,
  getFlightStatus,
  simulateFlights,
} from "@/lib/actions/flight.actions";
import { FlightData, columns } from "./columns";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function DemoPage() {
  const [data, setData] = useState<any[]>([]);
  const [flightStatus, setFlightStatus] = useState<string | null>(null);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const { data: session, status } = useSession();

  const simulatFlights = async () => {
    await simulateFlights(10);
    toast({
      description: "Flight simulated succesfully. ",
    });
  };

  useEffect(() => {
    async function fetchData() {
      const flightData = await getAllFlights();
      setData(flightData);
      if (status === "authenticated") {
        const status = await getFlightStatus();
      }
    }

    fetchData();
  }, [status]);

  return (
    <div className="container mx-auto py-10">
      <div
        className="text-right"
        style={{ marginTop: "4rem", marginBottom: "2rem" }}
      >
        <Button onClick={() => simulatFlights()}>
          {pending ? "Simulating..." : "Simulate flights"}
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
