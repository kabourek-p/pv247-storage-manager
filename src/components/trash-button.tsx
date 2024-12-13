import { FaTrash } from 'react-icons/fa';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';

const TrashButton = ({
	className,
	...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<Button {...props} className={`h-9 bg-red-800 px-2.5 ${className}`}>
		<FaTrash />
	</Button>
);

export default TrashButton;
