import { ModelsTypes } from '@/redux/models/types';

export interface FirebaseModelsDto {
  favoritesModels: ModelsTypes.FavoriteModel[];
}

export interface SetFirebaseModelRequest {
  userId: string;
  model: ModelsTypes.FavoriteModel;
}