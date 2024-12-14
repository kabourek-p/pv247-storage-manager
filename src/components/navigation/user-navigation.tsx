'use client';
import { signOut } from 'next-auth/react';

import { Button } from '../ui/button';

const UserNavigation = () => (
	<div className="hidden self-center bg-secondary-dark md:block">
		<Button
			className="rounded-none bg-secondary-dark p-5 text-gray-200 hover:bg-inherit hover:text-white active:scale-100"
			onClick={() => signOut()}
		>
			Log out
		</Button>
	</div>
);

export default UserNavigation;
