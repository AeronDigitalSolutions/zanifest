import axios from "axios";

const baseURL = process.env.CF_BASE_URL!;
const clientId = process.env.CF_CLIENT_ID!;
const clientSecret = process.env.CF_CLIENT_SECRET!;

if (!clientId || !clientSecret) {
  throw new Error("CF_CLIENT_ID or CF_CLIENT_SECRET missing");
}

export const cf = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
  },
});

// (Optional) response types
export type AadhaarOtpStartResponse = { status: string; message: string; ref_id: string; };
export type AadhaarOtpVerifyResponse = {
  ref_id: string;
  status: "VALID" | "INVALID" | "FAILED";
  name?: string; dob?: string; gender?: string;
  split_address?: Record<string,string>;
  mobile_hash?: string; photo_link?: string; xml_file?: string; share_code?: string;
};
