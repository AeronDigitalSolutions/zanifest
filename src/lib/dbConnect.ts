import mongoose from "mongoose";

const MONGODB_URI ="mongodb+srv://zanifest:insurance2025@cluster0.nnqe9ea.mongodb.net/insuranceDB?retryWrites=true&w=majority&appName=Cluster0";
;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

const dbConnect = async () => {
  console.log("connecting to db");
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(MONGODB_URI);
};

export default dbConnect;