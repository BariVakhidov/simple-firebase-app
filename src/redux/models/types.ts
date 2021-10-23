import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { Nullable } from '@/baseTypes';

export namespace ModelsTypes {
  export interface ModelsState {
    modelsSearch: Nullable<SketchfabClientTypes.SearchModelsResponse>;
    userFavoritesModels: FavoriteModel[];
    searchParams: Partial<SketchfabClientTypes.SearchModelsParams>;
    categories: Nullable<SketchfabClientTypes.Category[]>;
    isFetching: boolean;
    error: string;
  }

  export interface FavoriteModel {
    uid: string;
    imageUrl: string;
    name: string;
    userAvatarUrl: string;
  }

}