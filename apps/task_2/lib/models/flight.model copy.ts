import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    depart_time: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlightStatus",
      required: true,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.models.Flight || mongoose.model("Flight", flightSchema);

export default Flight;
