import { FaTrash } from 'react-icons/fa';

import { Button, type ButtonProps } from '@/components/Button';

const TrashButton = ({ className, ...props }: ButtonProps) => (
	<Button
		{...props}
		className={`bg-red-800 flex justify-center rounded w-6 h-6 ${className}`}
	>
		<FaTrash className="w-4 h-4" />
	</Button>
);

export default TrashButton;
