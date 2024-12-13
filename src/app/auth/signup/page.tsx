import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { LoginSignupRedirect } from '@/components/login/login-signup-redirect';
import { RegisterForm } from '@/modules/user/components/register-form';

const SignUpPage = async () => {
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
					<h1 className="my-6 self-center text-2xl">Register</h1>
					<RegisterForm />
					<LoginSignupRedirect redirectTo="signin">
						Already have an account?
					</LoginSignupRedirect>
				</div>
			</div>
		</main>
	);
};

export default SignUpPage;
