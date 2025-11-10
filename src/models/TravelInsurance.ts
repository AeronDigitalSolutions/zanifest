import mongoose, { Schema, Document, models } from "mongoose";

/* -------------------------------------------------------------------------- */
/*                              🧍 Traveller Interface                         */
/* -------------------------------------------------------------------------- */
export interface ITraveller {
  travellerId: number;
  age: number;
  hasMedicalCondition: boolean;
}

export interface ITravelInsurance extends Document {
  countries: string[];
  startDate: string;
  endDate: string;
  travellers: number;
  travellersInfo: ITraveller[];
  medicalCondition: "Yes" | "No";
  createdAt: Date;
}

const TravellerSchema = new Schema<ITraveller>(
  {
    travellerId: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    hasMedicalCondition: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false } 
);

const TravelInsuranceSchema = new Schema<ITravelInsurance>(
  {
    countries: {
      type: [String],
      required: [true, "Please select at least one country"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one country is required",
      },
    },

    startDate: {
      type: String,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: String,
      required: [true, "End date is required"],
    },

    travellers: {
      type: Number,
      required: [true, "Total number of travellers is required"],
      min: [1, "At least 1 traveller required"],
      max: [10, "Maximum 10 travellers allowed"],
    },

    travellersInfo: {
      type: [TravellerSchema],
      required: [true, "Please add traveller information"],
    },

    medicalCondition: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

delete mongoose.models.TravelInsurance;

const TravelInsurance =
  models.TravelInsurance ||
  mongoose.model<ITravelInsurance>("TravelInsurance", TravelInsuranceSchema);

export default TravelInsurance;
