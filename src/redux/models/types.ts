import { Nullable } from "@/baseTypes";
import { SketchfabClientTypes } from "@/client/SketchfabClient/sketchfabClient-types";

export namespace ModelsTypes {
	export interface FavoriteModel {
		uid: string;
		imageUrl: string;
		name: string;
		userAvatarUrl: string;
	}

	export interface ModelsState {
		modelsSearch: Nullable<SketchfabClientTypes.SearchModelsResponse>;
		userFavoritesModels: FavoriteModel[];
		searchParams: Nullable<Partial<SketchfabClientTypes.SearchModelsParams>>;
		categories: Nullable<SketchfabClientTypes.Category[]>;
		isFetching: boolean;
		error: Nullable<string>;
	}
}
