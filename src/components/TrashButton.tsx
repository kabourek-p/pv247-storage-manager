import { FaTrash } from 'react-icons/fa';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';

const TrashButton = ({
	className,
	...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<Button
		{...props}
		className={`flex h-6 w-6 justify-center rounded bg-red-800 ${className}`}
	>
		<FaTrash className="h-4 w-4" />
	</Button>
);

export default TrashButton;
