import { FaTrash } from 'react-icons/fa';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

const TrashButton = ({
	className,
	...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<Button
		{...props}
		className={cn(
			`h-9 px-2.5 ${className}`,
			props.disabled
				? 'cursor-not-allowed bg-gray-200 px-2.5 hover:bg-gray-200'
				: 'bg-red-800 hover:bg-red-950'
		)}
	>
		<FaTrash />
	</Button>
);

export default TrashButton;
