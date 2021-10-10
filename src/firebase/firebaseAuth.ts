import { AppTypes } from '@/redux/app/types';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup, signOut,
} from 'firebase/auth';
import { appAuth } from '@/firebase/index';

export const firebaseAuth = {

  signInWithCredentials(params: AppTypes.UserAuthParams) {
    const { email, password } = params;
    return signInWithEmailAndPassword(appAuth, email, password).then((userCredential) => userCredential.user);
  },

  createUser(params: AppTypes.UserAuthParams) {
    const { email, password } = params;
    return createUserWithEmailAndPassword(appAuth, email, password).then((userCredential) => userCredential.user);
  },

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(appAuth, provider).then((result) => result.user);
  },

  signOut() {
    return signOut(appAuth);
  },

};