import { Schema } from "mongoose";
import type { Collector } from "../types/collector";

const PointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const CollectorSchema = new Schema<Collector>(
  {
    name: {
      type: String,
      required: [true, "name Collector is required"],
      lowercase: true,
      trim: true,
    },
    image_url: {
      type: String,
      required: [true, "image Collector is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "name Collector is required"],
      minlength: [9, "Phone is 9 characters"],
      maxlength: [9, "Phone is 9 characters"],
      trim: true,
    },
    items: [
      {
        type: String,
        required: [true, "name Collector is required"],
        lowercase: true,
        trim: true,
      },
    ],
    location: {
      type: PointSchema,
      index: "2dsphere",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
