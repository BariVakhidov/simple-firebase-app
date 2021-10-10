import { appAuth } from '@/firebase/index';
import { updateProfile, updateEmail } from 'firebase/auth';
import { AppTypes } from '@/redux/app/types';

export const firebaseUser = {

  getCurrentUser() {
    return appAuth.currentUser;
  },

  updateUserProfile(params: Omit<AppTypes.EditableInfo, 'email'>) {
    return updateProfile(appAuth.currentUser, params);
  },

  updateUserEmail(email: string) {
    return updateEmail(appAuth.currentUser, email);
  },

};