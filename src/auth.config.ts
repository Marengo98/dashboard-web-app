import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Strapi Login',
            credentials: {
                identifier: { label: 'Email or Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await fetch('http://vmi1680938.contaboserver.net:1337/api/auth/local', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        identifier: credentials?.identifier,
                        password: credentials?.password,
                    }),
                });

                const data = await res.json();

                if (res.ok && data.jwt && data.user) {
                    // Ritorna user + jwt
                    return {
                        id: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        jwt: data.jwt, // utile per chiamate successive
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user = token.user;
            return session;
        },
    }, pages: {
        signIn: '/login',
    },
};
