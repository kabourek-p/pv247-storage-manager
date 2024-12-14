'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';

import { NavItem } from './navigation-item';

const urlMapping = {
	'/': 'Dashboard',
	'/orders': 'Orders',
	'/restocks': 'Restocks',
	'/commodities': 'Commodities'
};

export const Navigation = () => {
	const pathname = usePathname();

	return (
		<nav className="hidden md:block">
			<ul className="container hidden gap-x-6 py-4 text-gray-200 md:flex lg:gap-x-12">
				{Object.entries(urlMapping).map(([url, caption]) => (
					<NavItem
						key={url}
						href={url}
						caption={caption}
						active={pathname === url}
						className={cn(pathname === url && 'text-white')}
					/>
				))}
			</ul>
		</nav>
	);
};
