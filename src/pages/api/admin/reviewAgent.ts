import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import { sendEmail } from "@/utils/mailSender";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { agentId, action, assignManager } = req.body;

    if (!agentId || !action) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    // Update status
agent.status = action === "accept" ? "approved" : "rejected";

    if (action === "accept") {
      agent.assignedTo = assignManager;
    }

    await agent.save();

    // ---------------------- EMAIL: APPROVED ----------------------
    if (action === "accept") {
    const loginLink = "http://localhost:3000/agentlogin";  

      await sendEmail({
        to: agent.email,
        subject: "Your Agent Application is Approved!",
        html: `
          <h2>Congratulations ${agent.firstName}!</h2>
          <p>Your agent application has been <b>approved</b>.</p>
          <p>You can now login using your registered email and password.</p>
          <a href="${loginLink}"
             style="background:#2563eb;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">
             Login to Your Dashboard
          </a>
          <br/><br/>
          <p>Regards,<br/>Zanifest Team</p>
        `,
      });
    }

    // ---------------------- EMAIL: REJECTED ----------------------
    if (action === "reject") {
      await sendEmail({
        to: agent.email,
        subject: "Your Agent Application is Rejected",
        html: `
          <h2>Hello ${agent.firstName},</h2>
          <p>Your application has been <b>rejected</b>.</p>
          <p>If you believe this is a mistake, please contact support.</p>
          <br/>
          <p>Regards,<br/>Zanifest Team</p>
        `,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("REVIEW AGENT ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
