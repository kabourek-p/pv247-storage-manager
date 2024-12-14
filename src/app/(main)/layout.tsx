import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Navigation } from '@/components/navigation/navigation';
import UserNavigation from '@/components/navigation/user-navigation';
import { auth } from '@/lib/auth';
import MobileNavigation from '@/components/navigation/mobile-navigation';
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
			<header className="fixed z-50 flex min-h-[3.75rem] w-full justify-between bg-primary-dark pl-4 shadow-md">
				<div className="self-center">
					<Image
						className="rounded-md"
						src="/static/img/logo-white-orange.png"
						width={50}
						height={50}
						alt="logo"
					/>
				</div>
				<MobileNavigation/>
				<Navigation/>
				<UserNavigation/>
			</header>
			<main>{children}</main>
		</LoggedInUserProvider>
	);
};

export default MainLayout;
