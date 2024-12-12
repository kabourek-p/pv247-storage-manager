'use client';
import { signOut } from 'next-auth/react';

import { Button } from './ui/button';

const UserNavigation = () => (
	<div className="self-center">
		<Button className="" onClick={() => signOut()}>
			Log out
		</Button>
	</div>
);

export default UserNavigation;
