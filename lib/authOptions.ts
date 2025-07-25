import { Account, AuthOptions, Profile } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectMongo } from "../utils/database";
import UserDB from "../models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ) {
        try {
          await connectMongo();
          const user = await UserDB.findOne({ email: credentials?.email });
          if (!user) {
            return null;
          }
          const passwd = await bcrypt.hash(
            credentials?.password || "",
            user.salt,
          );
          if (passwd === user.password) {
            return {
              id: user._id,
              email: user.email,
            };
          }
          return null;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      if (account?.provider === "credentials") {
        return true;
      }
      try {
        await connectMongo();
        const userExist = await UserDB.findOne({ email: profile?.email });

        if (!userExist) {
          await UserDB.create({
            email: profile?.email,
            name: profile?.name,
            image: profile?.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
