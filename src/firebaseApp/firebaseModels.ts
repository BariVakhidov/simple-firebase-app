import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebaseApp/index";
import { SetFirebaseModelRequest } from "@/firebaseApp/types";

export const firebaseModels = {
	getModels(userId: string) {
		const docRef = doc(db, "users", userId);
		// eslint-disable-next-line no-debugger
		debugger;
		return getDoc(docRef).then((response) => response.data());
	},

	setModel(params: SetFirebaseModelRequest) {
		return updateDoc(doc(db, "users", params.userId), {
			favoritesModels: arrayUnion(params.model),
		}).then((response) => response);
	},

	removeModel(params: SetFirebaseModelRequest) {
		return updateDoc(doc(db, "users", params.userId), {
			favoritesModels: arrayRemove(params.model),
		}).then((response) => response);
	},

	createUserEntity(userId: string) {
		setDoc(doc(db, "users", userId), {
			favoritesModels: [],
		});
	},
};
