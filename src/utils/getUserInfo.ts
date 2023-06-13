import { User } from "firebase/auth";

import type { UserInfo } from "@/redux/app/types";

export const getUserInfo = (user: User): UserInfo => {
	const { email, phoneNumber, emailVerified, displayName, uid, photoURL } = user;
	return { email, phoneNumber, emailVerified, displayName, uid, photoURL };
};
