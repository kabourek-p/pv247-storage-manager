import Image from 'next/image';

import { Button } from '../ui/button';

export const GoogleLoginButton = ({
	onClick
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button
		onClick={onClick}
		className="flex w-full items-center justify-center gap-2 border border-gray-300 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
	>
		<Image
			src="/static/img/google.svg"
			width="20"
			height="20"
			alt="Google Logo"
		/>
		<span className="text-gray-600">Continue with Google</span>
	</Button>
);
