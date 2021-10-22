import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { Nullable } from '@/baseTypes';

export namespace ModelsTypes {
  export interface ModelsState {
    modelsSearch: Nullable<SketchfabClientTypes.SearchModelsResponse>;
    searchParams: Partial<SketchfabClientTypes.SearchModelsParams>;
    categories: Nullable<SketchfabClientTypes.Category[]>;
    isFetching: boolean;
    error: string;
  }

}