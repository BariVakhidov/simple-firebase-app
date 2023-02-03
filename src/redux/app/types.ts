import { Nullable } from "@/baseTypes";

export namespace AppTypes {
	export interface UserAuthParams {
		email: string;
		password: string;
	}

	export interface UserInfo {
		uid: string;
		email: Nullable<string>;
		emailVerified: boolean;
		phoneNumber: Nullable<string>;
		photoURL: Nullable<string>;
		displayName: Nullable<string>;
	}

	export type EditableInfo = Omit<UserInfo, "uid" | "emailVerified" | "phoneNumber">;

	export interface AppState {
		user: Nullable<UserInfo>;
		isAuth: boolean;
		initialized: boolean;
		isFetching: boolean;
		error: Nullable<string>;
	}
}
