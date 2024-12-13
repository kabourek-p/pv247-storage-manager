'use client';
import { signIn } from 'next-auth/react';

import { GoogleLoginButton } from '../form/google-login-button';

export const OtherLoginOptions = () => (
	<>
		<div className="my-4 flex w-full items-center">
			<div className="flex-grow border-t border-gray-300" />
			<span className="mx-4 text-sm text-gray-600">Other login options</span>
			<div className="flex-grow border-t border-gray-300" />
		</div>
		<GoogleLoginButton onClick={() => signIn('google', { redirectTo: '/' })} />
	</>
);
