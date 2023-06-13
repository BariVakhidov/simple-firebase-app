import type { Nullable } from "@/baseTypes";
import type {
	Category,
	SearchModelsParams,
	SearchModelsResponse,
} from "@/client/SketchfabClient/sketchfabClient-types";

export interface FavoriteModel {
	uid: string;
	imageUrl: string;
	name: string;
	userAvatarUrl: string;
}

export interface ModelsState {
	modelsSearch: Nullable<SearchModelsResponse>;
	userFavoritesModels: FavoriteModel[];
	searchParams: Nullable<Partial<SearchModelsParams>>;
	categories: Nullable<Category[]>;
	isFetching: boolean;
	error: Nullable<string>;
}
