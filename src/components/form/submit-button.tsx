import { Loader } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import { Button } from '../ui/button';

type SubmitButtonProps = {
	isLoading?: boolean;
};

export const SubmitButton = ({
	isLoading = false,
	children
}: PropsWithChildren<SubmitButtonProps>) => (
	<Button
		colorType="secondary"
		className="flex w-full justify-center"
		type="submit"
		disabled={isLoading}
	>
		{isLoading ? <Loader className="animate-spin" /> : children}
	</Button>
);
