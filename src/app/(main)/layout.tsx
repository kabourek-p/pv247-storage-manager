import Image from 'next/image';

import { Navigation } from '@/components/navigation';
import UserNavigation from '@/components/user-navigation';

const MainLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<>
		<header className="flex justify-between bg-primary-light px-4 shadow-md">
			{/* TODO mobile version */}
			<div className="self-center">
				<Image src="/static/img/logo.png" width={60} height={60} alt="logo" />
			</div>
			<Navigation />
			<UserNavigation />
		</header>
		<main>{children}</main>
	</>
);

export default MainLayout;
