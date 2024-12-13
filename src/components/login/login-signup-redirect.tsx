import Link from 'next/link';
import { type PropsWithChildren } from 'react';

type LoginSignpuRedirectProps = {
	redirectTo: 'signup' | 'signin';
};

export const LoginSignupRedirect = ({
	redirectTo,
	children
}: PropsWithChildren<LoginSignpuRedirectProps>) => (
	<span className="mt-8 flex gap-1 self-center text-sm">
		{children}
		<Link href={redirectTo} className="text-secondary hover:underline">
			{redirectTo === 'signup' ? 'Sign up' : 'Log in'}
		</Link>
	</span>
);
