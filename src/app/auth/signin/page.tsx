import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { LoginForm } from '@/modules/user/components/login-form';
import { auth } from '@/lib/auth';
import { OtherLoginOptions } from '@/components/login/other-login-options';

const SignInPage = async () => {
	const session = await auth();
	if (session?.user) {
		return redirect('/');
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white sm:bg-gray-100">
			<div className="w-full max-w-sm rounded-lg bg-white p-6 sm:shadow-md">
				<div className="flex flex-col items-center">
					<Image
						src="/static/img/logo.png"
						width={150}
						height={150}
						alt="Logo"
					/>
					<h1 className="my-6 self-center text-2xl">Login</h1>
					<LoginForm />
					<div className="my-4 self-end">
						<Link href="" className="text-sm text-secondary hover:underline">
							Forgot password?
						</Link>
					</div>
					<OtherLoginOptions />
				</div>
			</div>
		</main>
	);
};

export default SignInPage;
