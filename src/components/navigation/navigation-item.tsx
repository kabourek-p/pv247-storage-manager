import Link, { type LinkProps } from 'next/link';

import { cn } from '@/lib/cn';

type NavItemProps = LinkProps & {
	caption: string;
	className?: string;
	active?: boolean;
};

export const NavItem = ({
	caption,
	active = false,
	className = '',
	...props
}: NavItemProps) => (
	<li
		className={cn(
			'whitespace-nowrahover:text-white relative mt-[2px]',
			className
		)}
	>
		<Link {...props}>{caption}</Link>
		{active && (
			<span className="absolute -bottom-[1.12rem] left-0 -mx-4 h-[0.2rem] w-[calc(100%_+_2rem)] rounded-full bg-gray-200" />
		)}
	</li>
);
