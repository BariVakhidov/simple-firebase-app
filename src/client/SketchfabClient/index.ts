import { axiosInstance } from "@/client";
import { SketchfabClientTypes } from "@/client/SketchfabClient/sketchfabClient-types";
import { ClientURLs } from "@/constants/clientURLs";
import { withAbort } from "@Utils/withAbort";

export const sketchfabClient = {
	getModels(
		params: Partial<SketchfabClientTypes.SearchModelsParams>
	): Promise<SketchfabClientTypes.SearchModelsResponse> {
		return withAbort((signal) =>
			axiosInstance
				.get<SketchfabClientTypes.SearchModelsResponse>(ClientURLs.MODELS_SEARCH, { params, signal })
				.then((response) => response.data)
		);
	},

	getCategories(): Promise<SketchfabClientTypes.CategoriesResponse> {
		return withAbort((signal) =>
			axiosInstance
				.get<SketchfabClientTypes.CategoriesResponse>(ClientURLs.CATEGORIES, { signal })
				.then((response) => response.data)
		);
	},
};
