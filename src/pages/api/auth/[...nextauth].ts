import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // or 'database' if you use DB sessions
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials:", credentials);
          throw new Error();
        }

        console.log("Attempting to authenticate user:", credentials.email);
        await dbConnect();
        console.log("Database connected - in [...nextauth].ts");

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.log("Invalid password for user:", credentials.email);
          return null;
        }

        // User authenticated
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login", // your custom login page
  },

  secret: process.env.NEXTAUTH_SECRET, // should be set in your .env file
};

export default NextAuth(authOptions);
