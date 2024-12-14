import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Navigation } from '@/components/navigation';
import UserNavigation from '@/components/user-navigation';
import { auth } from '@/lib/auth';
import { getUser } from '@/server/users';
import { LoggedInUserProvider } from '@/context/logged-in-user';

const MainLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await auth();
	if (!session?.user) {
		return redirect('/auth/signin');
	}

	const user = await getUser(session.user.email ?? '');
	if (!user) {
		throw new Error('User was not found!');
	}

	return (
		<LoggedInUserProvider defaultValue={user}>
			<header className="flex justify-between bg-primary-dark px-4 shadow-md">
				{/* TODO mobile version */}
				<div className="self-center">
					<Image
						className="rounded-md"
						src="/static/img/logo-white-orange.png"
						width={60}
						height={60}
						alt="logo"
					/>
				</div>
				<Navigation />
				<UserNavigation />
			</header>
			<main>{children}</main>
		</LoggedInUserProvider>
	);
};

export default MainLayout;
