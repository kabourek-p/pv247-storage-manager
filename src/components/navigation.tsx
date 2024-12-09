'use client';

import { usePathname } from 'next/navigation';

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
		<nav className="">
			<ul className="container flex gap-x-6 py-4">
				{Object.entries(urlMapping).map(([url, caption]) => (
					<NavItem
						key={url}
						href={url}
						caption={caption}
						active={pathname === url}
					/>
				))}
			</ul>
		</nav>
	);
};
