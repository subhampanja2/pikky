"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { nextauthOptions } from "@/lib/nextauth-options";
import connectDB from "@/lib/mongodb";
import FlightStatus from "../models/flight_status.model";
import Flight from "../models/flight.model";
import { faker } from '@faker-js/faker';

export async function getFlightStatus() {
  const session = await getServerSession(nextauthOptions);

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const statuses = await FlightStatus.find({}).lean();

    if (!statuses) {
      throw new Error("statuses does not exist!");
    }

    return statuses;
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

export async function getAllFlights() {
  const session = await getServerSession(nextauthOptions);

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const flights = await Flight.find({}).populate("status").lean();

    if (!flights) {
      throw new Error("flights does not exist!");
    }

    return flights;
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

async function generateFlightData() {

  let status = await FlightStatus.findOne({status: "Scheduled/En Route"})

  return {
    number: faker.random.alphaNumeric(6),
    origin: faker.address.city(),
    destination: faker.address.city(), 
    depart_time: faker.date.future(),
    status: status._id,
  };
}

export async function simulateFlights(count: number) {
  const flights = [];
  
  try {
    for (let i = 0; i < count; i++) {
      let generate = await generateFlightData()
      flights.push(generate);
      await Flight.create(generate)
    }
    return 'done'
  } catch (error) {
    console.error("Error adding flights to database:", error);
    throw error; // Re-throwing the error for the calling function to handle
  }
}
