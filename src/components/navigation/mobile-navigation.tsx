'use client';

import { MdMenu, MdCancel } from 'react-icons/md';
import { useState } from 'react';

import { NavItem } from './navigation-item';
const urlMapping = {
	'/': 'Dashboard',
	'/orders': 'Orders',
	'/restocks': 'Restocks',
	'/commodities': 'Commodities'
};
const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="md:hidden">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={toggleMenu}
							className="p-2d inline-flex items-center justify-center rounded-md"
							aria-expanded={isOpen}
						>
							<span className="sr-only">Open main menu</span>

							{isOpen ? (
								<MdCancel className="text-white md:hidden" />
							) : (
								<MdMenu className="text-white md:hidden" size={30} />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden">
					<ul className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
						{Object.entries(urlMapping).map(([url, caption]) => (
							<NavItem
								key={`mobile-${url}`}
								href={url}
								caption={caption}
								// active={pathname === url}
							/>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
};

export default MobileNavigation;
