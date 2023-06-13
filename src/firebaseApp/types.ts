import type { FavoriteModel } from "@/redux/models/types";

export interface FirebaseModelsDto {
	favoritesModels: FavoriteModel[];
}

export interface SetFirebaseModelRequest {
	userId: string;
	model: FavoriteModel;
}
