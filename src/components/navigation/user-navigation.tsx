'use client';
import { signOut } from 'next-auth/react';

import { Button } from '../ui/button';

export const UserNavigation = () => (
	<Button
		className="rounded-lg bg-secondary-dark px-6 py-2 text-gray-200 hover:bg-secondary-dark hover:text-white active:scale-100 md:rounded-none md:p-5"
		onClick={() => signOut()}
	>
		Log out
	</Button>
);
