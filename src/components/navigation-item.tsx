import Link, { type LinkProps } from 'next/link';

type NavItemProps = LinkProps & {
	caption: string;
	active?: boolean;
};

export const NavItem = ({
	caption,
	active = false,
	...props
}: NavItemProps) => (
	<li className="relative mt-[2px] whitespace-nowrap">
		<Link {...props}>{caption}</Link>
		{active && (
			<span className="bg-primary absolute -bottom-5 left-0 -mx-4 h-1 w-[calc(100%_+_2rem)] rounded-full" />
		)}
	</li>
);
