'use client';

import {
	type PropsWithChildren,
	createContext,
	useState,
	useContext
} from 'react';
import { type User } from '@prisma/client';

type LoggedInUserContextType = {
	user: User | null;
	setUser: (user: User) => void;
};

const LoggedInUserContext = createContext<LoggedInUserContextType | null>(null);

const useLoggedInUser = () => {
	const context = useContext(LoggedInUserContext);

	if (!context) {
		throw new Error(
			'useLoggedInUser must be used within a LoggedInUserProvider'
		);
	}

	return context;
};

const LoggedInUserProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<LoggedInUserContext.Provider value={{ user, setUser }}>
			{children}
		</LoggedInUserContext.Provider>
	);
};

export { LoggedInUserProvider, useLoggedInUser };
