import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { Header } from '@/components/navigation/header';

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
			<header className="fixed z-50 flex min-h-[3.75rem] w-full justify-between bg-primary-dark pl-4 shadow-md">
				<div className="self-top mt-1 md:mt-0 md:self-center">
					<Image
						className="rounded-md"
						src="/static/img/logo-white-orange.png"
						width={50}
						height={50}
						alt="logo"
					/>
				</div>

				<Header />
			</header>
			<main>{children}</main>
		</>
	);
};

export default MainLayout;
