import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage: React.FC = () => (
	<main className="flex min-h-screen flex-col items-center justify-center bg-white sm:bg-gray-100">
		<div className="w-full max-w-sm rounded-lg bg-white p-6 sm:shadow-md">
			<div className="flex flex-col items-center">
				{/* Logo or Icon */}
				<Image
					src="/static/img/logo-new.png"
					width={150}
					height={150}
					alt="Not Found"
				/>

				<h1 className="my-6 self-center text-2xl font-semibold">
					404 - Page Not Found
				</h1>

				<p className="mb-4 text-center">
					We could not find the page you were looking for.
				</p>

				<Link
					className="w-full rounded bg-primary px-4 py-2 text-center text-white hover:bg-primary-dark"
					href="/"
				>
					Go Back to Homepage
				</Link>
			</div>
		</div>
	</main>
);

export default NotFoundPage;
