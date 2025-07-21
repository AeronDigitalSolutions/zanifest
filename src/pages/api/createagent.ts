import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";

export default async function handler(req: { method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; agent?: any; error?: any; }): void; new(): any; }; }; }) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const agent = new Agent(req.body);
      console.log("Creating agent with data:", agent);
      await agent.save();
      return res.status(201).json({ message: "Agent created", agent });
    } 
    
    catch (error) {
      if (error instanceof Error) {
         console.log('error creating agent - error instanceof Error');
        console.error("Error creating agent:", error.message);
        return res.status(400).json({ error: error.message });
       
      } 
      else {
         console.log('unknown error creating agent');
        return res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
