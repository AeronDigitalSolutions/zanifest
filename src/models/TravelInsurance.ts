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
  email: string | null;     
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
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    travellers: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    travellersInfo: {
      type: [TravellerSchema],
      required: true,
    },

    medicalCondition: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    // ⭐ ADD EMAIL 
    email: {
      type: String,
      default: null,
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


const TravelInsurance =
  models.TravelInsurance ||
  mongoose.model<ITravelInsurance>("TravelInsurance", TravelInsuranceSchema);

export default TravelInsurance;
