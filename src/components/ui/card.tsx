import { type PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => (
	<div className="items-center">
		<div className="w-full rounded-lg bg-white p-6 sm:shadow-md">
			{children}
		</div>
	</div>
);
