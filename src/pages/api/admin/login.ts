// pages/api/admin/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import Admin from "@/models/Admin";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log("Admin login API called with email:", email);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email }).select("userName email role password");
    console.log("Admin found:", admin);

    if (!admin) {
      console.warn("Login failed: Admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.warn("Login failed: Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.userName,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    console.log("Token generated for admin:", admin.userName);

    // Set cookie with token
    res.setHeader(
      "Set-Cookie",
      serialize("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      })
    );

    // Respond with minimal info
 return res.status(200).json({ token, role: admin.role });

  } catch (err) {
    console.error("Login server error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}




// import { NextApiRequest, NextApiResponse } from "next";
// import Admin from "@/models/Admin"; // adjust path
// import dbConnect from "@/lib/dbConnect"; // your db connection
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { serialize } from 'cookie'; // ADD THIS

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { email, password } = req.body;
//   console.log("Admin login API called with email:", email);

//   try {
//     const admin = await Admin.findOne({ email }).select("name email role password");

//     console.log("Admin found:", admin);

//     if (!admin) {
//         console.log("Admin not found for email:", email);
//       return res.status(401).json({ message: "Not Authorized" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//         console.log("Password mismatch for admin:", email);
//       return res.status(401).json({ message: "Invalid Credentials" });
//     }

//     console.log("Admin object before signing JWT:", admin);


//     const token = jwt.sign(
//       {
//         id: admin._id,
//         role: admin.role,
//         email: admin.email,
//         name: admin.name,
//       },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1d" }
//     );

//     console.log("Token generated for admin:", admin.name);

//       // ✅ Set token in cookie
//     res.setHeader(
//       'Set-Cookie',
//       serialize('adminToken', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 60 * 24, // 1 day
//       })
//     );

//     res.status(200).json({ token, role: admin.role });
//   } 
  
//   catch (err) {
//     res.status(500).json({ message: "Server Error", error: err });
//   }
// }
