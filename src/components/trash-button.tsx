import { FaTrash } from 'react-icons/fa';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';

const TrashButton = ({
	className,
	...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<Button
		{...props}
		className={`flexjustify-center rounded bg-red-800 ${className}`}
	>
		<FaTrash />
	</Button>
);

export default TrashButton;
