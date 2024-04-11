import { ColumnDef } from "@tanstack/react-table";

export type FlightData = {
  id: string;
  number: string;
  origin: string;
  destination: string;
  depart_time: string;
  status: "Delayed" | "Cancelled" | "In-flight" | "Scheduled/En Route";
};

const formatDepartTime = (value: string): string => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  return `${formattedDay}/${formattedMonth}/${year}`;
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
    cell: (row) => formatDepartTime(row.getValue() as string),
  },
  {
    accessorKey: "status.status",
    header: "Status",
  },
];
