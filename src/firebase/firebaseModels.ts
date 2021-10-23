import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/firebase/index';
import { SetFirebaseModelRequest } from '@/firebase/types';

export const firebaseModels = {
  getModels(userId: string) {
    return getDoc(doc(db, 'users', userId)).then(response => response.data());
  },

  setModel(params: SetFirebaseModelRequest) {
    return updateDoc(doc(db, 'users', params.userId), {
      favoritesModels: arrayUnion(params.model),
    }).then(response => response);
  },

  removeModel(params: SetFirebaseModelRequest) {
    return updateDoc(doc(db, 'users', params.userId), {
      favoritesModels: arrayRemove(params.model),
    }).then(response => response);
  },

  createUserEntity(userId: string) {
    setDoc(doc(db, 'users', userId), {
      favoritesModels: [],
    });
  },
};