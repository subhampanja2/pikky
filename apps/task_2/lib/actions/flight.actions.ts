"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { nextauthOptions } from "@/lib/nextauth-options";
import connectDB from "@/lib/mongodb";
import FlightStatus from "../models/flight_status.model";

export async function getFlightStatus() {
  const session = await getServerSession(nextauthOptions);

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const statuses = await FlightStatus.find({});

    if (!statuses) {
      throw new Error("statuses does not exist!");
    }

    return { statuses };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}
