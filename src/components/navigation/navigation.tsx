import { cn } from '@/lib/cn';
import { NavItem } from './navigation-item';
import UserNavigation from './user-navigation';

type NavigationProps = {
	pathname: string;
	urlMapping: Record<string, string>;
	platform: 'desktop' | 'mobile';
};

export const Navigation = ({
	pathname,
	urlMapping,
	platform
}: NavigationProps) => {
	return (
		<nav
			className={cn(
				'hidden md:block',
				platform === 'mobile' && 'block md:hidden'
			)}
		>
			<ul className="flex flex-col items-end gap-4 space-y-1 px-4 py-4 text-xl text-gray-200 sm:px-2 md:flex-row md:items-start md:gap-8 md:space-y-0 md:px-0 md:text-base lg:gap-12">
				{Object.entries(urlMapping).map(([url, caption]) => (
					<NavItem
						key={url}
						href={url}
						caption={caption}
						active={pathname === url && platform === 'desktop'}
						className={cn(pathname === url && 'text-white')}
					/>
				))}

				{platform === 'mobile' && (
					<li>
						<UserNavigation />
					</li>
				)}
			</ul>
		</nav>
	);
};
