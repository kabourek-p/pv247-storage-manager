import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Navigation } from '@/components/navigation';
import UserNavigation from '@/components/user-navigation';
import { auth } from '@/lib/auth';

const MainLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await auth();
	if (!session?.user) {
		return redirect('/auth/signin');
	}
	return (
		<>
			<header className="flex justify-between bg-primary-dark px-4 shadow-md">
				{/* TODO mobile version */}
				<div className="self-center">
					<Image
						className="rounded-md"
						src="/static/img/logo.png"
						width={60}
						height={60}
						alt="logo"
					/>
				</div>
				<Navigation />
				<UserNavigation />
			</header>
			<main>{children}</main>
		</>
	);
};

export default MainLayout;
