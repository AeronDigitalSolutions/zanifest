import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import { sendEmail } from "@/utils/mailSender"; // your email function path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { agentId, action, assignManager, verification, remark } = req.body;

    const agent = await Agent.findById(agentId);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    // ---------------------
    // APPROVE APPLICATION
    // ---------------------
    if (action === "accept") {
      agent.status = "approved";
      agent.assignedTo = assignManager;
      await agent.save();

      const htmlMessage = `
        <h2>🎉 Your Application is Approved</h2>
        <p>Dear <b>${agent.firstName}</b>,</p>
        <p>Your agent application has been <b style="color:green">APPROVED</b>.</p>

        <p><b>Admin Remark:</b><br>${remark || "No remark provided"}</p>

        <p>You can now login using your email and password.</p>
      `;

      await sendEmail({
        to: agent.email,
        subject: "Your Application is Approved",
        html: htmlMessage,
      });

      return res.json({ success: true, message: "Agent approved & email sent" });
    }

    // ---------------------
    // REJECT APPLICATION
    // ---------------------
    if (action === "reject") {
      agent.status = "rejected";
      await agent.save();

      const htmlMessage = `
        <h2 style="color:red">❌ Application Rejected</h2>
        <p>Dear <b>${agent.firstName}</b>,</p>
        <p>Your application has been <b style="color:red">REJECTED</b>.</p>

        <p><b>Reason Provided:</b><br>${remark || "No remark provided"}</p>

        <p>You will not be able to login to the system.</p>
      `;

      await sendEmail({
        to: agent.email,
        subject: "Your Application is Rejected",
        html: htmlMessage,
      });

      return res.json({ success: true, message: "Agent rejected & email sent" });
    }

    return res.status(400).json({ message: "Invalid action" });
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
