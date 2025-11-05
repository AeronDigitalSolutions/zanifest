import mongoose, { Schema, model, models, Document } from "mongoose";

const StepSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true }, // Base64 or URL string
});

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true }, 
  image: { type: String, required: true }, // Base64 or URL string
});

const defaultSteps = [
  { name: "Fill Your Details", desc: "Fill in your details and get insurance policy premium quotes from top-rated insurers instantly.", image: "" }, // Empty string for Base64 image
  { name: "Select a Plan", desc: "From numerous available quotes, choose the one that best suits your requirements and budget.", image: "" },
  { name: "Make Payment and sit back", desc: "Pay online and get your policy right away in your inbox.", image: "" },
];

const defaultServices = Array(8).fill(null).map(() => ({
  name: "Lorem Ipsum is simply dummy text",
  desc: "999 / Month",
  image: "",
}));

interface HowWorksDoc extends Document {
  mainHeading: string;
  servicesHeading: string;
  steps: { name: string; desc: string; image: string; }[];
  services: { name: string; desc: string; image: string; }[];
}

const HowWorksSchema = new Schema<HowWorksDoc>({
  mainHeading: { type: String, required: true, default: "How We Work?" },
  servicesHeading: { type: String, required: true, default: "Pay Less Cover More" },
  steps: { type: [StepSchema], required: true, default: defaultSteps },
  services: { type: [ServiceSchema], required: true, default: defaultServices },
});

const HowWorks = (models.HowWorks || model<HowWorksDoc>("HowWorks", HowWorksSchema));

export default HowWorks;