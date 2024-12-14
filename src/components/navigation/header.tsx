'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import { signOut } from 'next-auth/react';

import { cn } from '@/lib/cn';

import { NavItem } from './navigation-item';
import UserNavigation from './user-navigation';
import { Navigation } from './navigation';

const urlMapping = {
	'/': 'Dashboard',
	'/orders': 'Orders',
	'/restocks': 'Restocks',
	'/commodities': 'Commodities'
};

export const Header = () => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<Navigation
				pathname={pathname}
				urlMapping={urlMapping}
				platform="desktop"
			/>
			<div className="md:hidden">
				<div className="mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-end">
						<div className="-mr-2 flex md:hidden">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="p-2d inline-flex items-center justify-center rounded-md"
								aria-expanded={isMenuOpen}
							>
								<span className="sr-only">Open main menu</span>

								{isMenuOpen ? (
									<FaXmark className="text-white md:hidden" size={30} />
								) : (
									<MdMenu className="text-white md:hidden" size={30} />
								)}
							</button>
						</div>
					</div>
				</div>

				{isMenuOpen && (
					<Navigation
						pathname={pathname}
						urlMapping={urlMapping}
						platform="mobile"
					/>
				)}
			</div>
			<div className="hidden md:block">
				<UserNavigation />
			</div>
		</>
	);
};
