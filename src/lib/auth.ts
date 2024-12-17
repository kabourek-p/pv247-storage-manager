import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import { getUser } from '@/server/users';
import { loginFormSchema } from '@/modules/user/schema';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	debug: true,
	providers: [
		Credentials({
			id: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			authorize: async credentials => {
				try {
					const { email, password } =
						await loginFormSchema.parseAsync(credentials);
					const user = await getUser(email);
					if (!user?.password) {
						throw new Error('Invalid credentials');
					}
					const isPasswordValid = await bcrypt.compare(password, user.password);
					if (!isPasswordValid) {
						throw new Error('Invalid credentials');
					}
					return user;
				} catch {
					return null;
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/auth/signin'
	}
});

const authUser = async () => {
	const session = await auth();
	if (!session?.user) {
		return redirect('/auth/signin');
	}
	const user = await getUser(session.user.email ?? '');
	if (!user) {
		throw new Error('User was not found!');
	}
	return user;
};

export default authUser;
