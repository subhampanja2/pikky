import { ColumnDef } from "@tanstack/react-table";

export type FlightData = {
  id: string;
  number: string;
  origin: string;
  destination: string;
  depart_time: string;
  status: "Delayed" | "Cancelled" | "In-flight" | "Scheduled/En Route";
};

export const columns: ColumnDef<FlightData>[] = [
  {
    accessorKey: "number",
    header: "Flight number",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "depart_time",
    header: "Depart Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
