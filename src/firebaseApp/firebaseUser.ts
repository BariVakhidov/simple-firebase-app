import { updateEmail, updateProfile } from "firebase/auth";

import { appAuth } from "@/firebaseApp/index";
import { AppTypes } from "@/redux/app/types";

export const firebaseUser = {
	getCurrentUser() {
		return appAuth.currentUser;
	},

	updateUserProfile(params: Omit<AppTypes.EditableInfo, "email">) {
		if (appAuth.currentUser) return updateProfile(appAuth.currentUser, params);
		else throw new Error("User not signed");
	},

	updateUserEmail(email: string) {
		if (appAuth.currentUser) return updateEmail(appAuth.currentUser, email);
		else throw new Error("User not signed");
	},
};
