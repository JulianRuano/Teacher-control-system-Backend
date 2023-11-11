import { Schema, model } from "mongoose";
import { Period as IPeriod } from "./interfaces/interfaces";

const PeriodSchema = new Schema<IPeriod>({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

PeriodSchema.methods.toJSON = function () {
  const { __v, _id, ...period } = this.toObject();
  period.uid = _id;
  return period;
};

export const Period = model("Period", PeriodSchema);
