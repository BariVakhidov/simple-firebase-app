import { Nullable } from '@/baseTypes';

export namespace AppTypes {
  export interface AppState {
    user: Nullable<UserInfo>;
    isAuth: boolean;
    initialized: boolean;
    isFetching: boolean;
    error: string;
  }

  export interface UserAuthParams {
    email: string;
    password: string;
  }

  export interface UserInfo {
    uid: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoURL: string;
    displayName: string;
  }

  export type EditableInfo = Omit<UserInfo, 'uid' | 'emailVerified' | 'phoneNumber'>;
}