import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
 
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  agentCode: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
  panAttachment: {
    type: String, // path or filename for uploaded PAN
  },
  adhaarNumber: {
    type: String,
    required: true,
  },
  adhaarAttachment: {
    type: String,
  },

  // Nominee Details
  
    nomineeName: String,
    nomineeRelation: String,
    nomineePanNumber: String,
    nomineeAadharNumber: String,
    nomineePanAttachment: String,
    nomineeAadhaarAttachment: String,
  

  // Bank Details
  
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    ifscCode: String,
    branchLocation: String,
    cancelledChequeAttachment: String,
    attachments: [
      {
        filename: String,
        data: Buffer,
        url: String, // ✅ Add this to store the accessible path
        mimetype: String,
      }
    ],

  assignedTo: {
    type: String, // or String, depending on your Manager schema
    ref: "Manager",
    required: true,
  },
});

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);



// import mongoose from "mongoose";

// const agentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   district: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   assignedTo: {
//     type: String, // Assuming you're using custom integer IDs for managers
//     required: true,
//   },
// });

// export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
