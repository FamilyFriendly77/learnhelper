import NextAuth, { Profile } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { connectMongo } from '../../../../../utils/database';
import User from '../../../../../models/User';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectMongo();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          return false;
        }
        const passwd = await bcrypt.hash(
          credentials?.password || '',
          user.salt
        );
        if (passwd === user.password) {
          return true;
        }
        return false;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ profile }: { profile: Profile }) {
      console.log(profile);
      try {
        await connectMongo();
        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.image,
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
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
