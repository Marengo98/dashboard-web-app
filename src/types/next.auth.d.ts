import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    username: string;
    email: string;
    jwt: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}
