import { redirect } from 'next/navigation';

import { auth } from '@/auth';

const Dashboard = async () => {
	// TODO need to check how to properly handle auth
	const session = await auth();
	if (!session?.user) {
		redirect('/api/auth/signin');
	}
	return <div>TODO dashboard</div>;
};

export default Dashboard;
