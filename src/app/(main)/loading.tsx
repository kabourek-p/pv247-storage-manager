import React from 'react';

const Loading: React.FC = () => (
	<div className="flex h-screen flex-col items-center justify-center bg-gray-100">
		<div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-secondary" />
		<p className="mt-4 text-lg font-semibold text-primary">Loading...</p>
	</div>
);

export default Loading;
