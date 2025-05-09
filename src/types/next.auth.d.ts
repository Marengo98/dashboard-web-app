import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    username: string;
    email: string;
    jwt: string;
    walletId?: string;
    balance:number;
    account_number:number;
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
