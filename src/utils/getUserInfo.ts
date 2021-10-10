import firebase from 'firebase/compat';
import User = firebase.User;
import { AppTypes } from '@/redux/app/types';

export const getUserInfo = (user: User): AppTypes.UserInfo => {
  const { email, phoneNumber, emailVerified, displayName, uid, photoURL } = user;
  return { email, phoneNumber, emailVerified, displayName, uid, photoURL };
};