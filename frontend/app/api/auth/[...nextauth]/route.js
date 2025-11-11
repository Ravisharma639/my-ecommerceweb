import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import otpStore from "../otpStore"; // shared OTP store

export const authOptions = {
  providers: [
    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // OTP login
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { phone, otp } = credentials;

        const record = otpStore[phone];
        if (!record) throw new Error("No OTP sent");
        if (record.expires < Date.now()) throw new Error("OTP expired");
        if (record.otp !== otp) throw new Error("Invalid OTP");

        delete otpStore[phone];

        // Return user object stored in session
        return { id: phone, phone };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
