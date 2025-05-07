import { authOptions } from '@/auth.config';
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

// declare module 'next-auth' {
//   interface User {
//     id: number;
//     username: string;
//     email: string;
//     jwt: string; 
//   }

//   interface Session {
//     user: User;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     user: User;
//   }
// }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
