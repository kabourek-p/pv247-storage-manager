'use client';
import Image from 'next/image';
import { getProviders, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { LoginForm } from '@/modules/user/components/login-form';

const SignInPage = () => {
	const [setProviders] = useState<any>(null);
	const session = useSession();
	console.log(session);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		fetchProviders();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
				<div className="flex flex-col items-center">
					<div className="mb-6">
						<Image
							src="/static/img/logo.png"
							width={150}
							height={150}
							alt="Logo"
						/>
					</div>
					<h1 className="mb-6 self-center text-2xl">Login</h1>
					<LoginForm />
					<div className="mt-4">
						<Link href="" className="text-sm text-secondary hover:underline">
							Forgot password?
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};
// 	return (
// 		<div
// 			style={{
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 				height: '100vh'
// 			}}
// 		>
// 			<div>
// 				<h1>Sign in</h1>
// 				{providers &&
// 					Object.values(providers).map((provider: any) => (
// 						<div key={provider.name} style={{ margin: '1rem 0' }}>
// 							<button
// 								onClick={() => signIn(provider.id)}
// 								style={{
// 									padding: '10px 20px',
// 									borderRadius: '5px',
// 									border: '1px solid #ddd',
// 									backgroundColor: '#f9f9f9',
// 									fontSize: '16px',
// 									cursor: 'pointer',
// 									width: '100%',
// 									maxWidth: '300px',
// 									marginBottom: '10px',
// 									display: 'flex',
// 									justifyContent: 'center',
// 									alignItems: 'center',
// 									gap: '10px',
// 									fontWeight: '500'
// 								}}
// 							>
// 								Sign in with {provider.name}
// 							</button>
// 						</div>
// 					))}
// 			</div>
// 		</div>
// 	);
// };

export default SignInPage;
