import { axiosInstance } from "@/client";
import type {
	CategoriesResponse,
	SearchModelsParams,
	SearchModelsResponse,
} from "@/client/SketchfabClient/sketchfabClient-types";
import { ClientURLs } from "@/constants/clientURLs";
import { withAbort } from "@Utils/withAbort";

export const sketchfabClient = {
	getModels(params: Partial<SearchModelsParams>): Promise<SearchModelsResponse> {
		return withAbort((signal) =>
			axiosInstance
				.get<SearchModelsResponse>(ClientURLs.MODELS_SEARCH, { params, signal })
				.then((response) => response.data)
		);
	},

	getCategories(): Promise<CategoriesResponse> {
		return withAbort((signal) =>
			axiosInstance.get<CategoriesResponse>(ClientURLs.CATEGORIES, { signal }).then((response) => response.data)
		);
	},
};
