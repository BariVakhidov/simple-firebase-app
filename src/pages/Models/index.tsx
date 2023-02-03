import React, { FC, memo, useCallback, useEffect, useState } from "react";
import equal from "fast-deep-equal";
import qs from "qs";
import { useLocation, useSearchParams } from "react-router-dom";

import { Nullable } from "@/baseTypes";
import { ModelsSearchForm } from "@/pages/Models/ModelsSearchForm";
import { modelsActionCreators } from "@/redux/models/action-creators";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { SketchfabClientTypes } from "@Client/SketchfabClient/sketchfabClient-types";
import { PageWrapper } from "@Components/pageWrapper";
import { Preloader } from "@Components/preloader";
import { ModelsList } from "@Pages/Models/ModelsList";
import { ModelPopUp } from "@Pages/Models/PopUp/ModelPopUp";
import { filterNonNull } from "@Utils/filterNonNull";

export const Models: FC = memo(() => {
	const dispatch = useAppDispatch();
	const [selectedModel, setSelectedModel] = useState<Nullable<SketchfabClientTypes.Model>>(null);
	const { isFetching, modelsSearch, searchParams, categories } = useAppSelector((state) => state.models);
	const [, setSearchParams] = useSearchParams();
	const { search } = useLocation();
	const setFilter = useCallback(
		(filter: Partial<SketchfabClientTypes.SearchModelsParams>) =>
			dispatch(modelsActionCreators.setSearchParams(filter)),
		[dispatch]
	);

	const loadMore = () => {
		if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement?.scrollHeight) {
			dispatch(modelsActionCreators.loadMoreModels());
		}
	};

	useEffect(() => {
		const parsed = qs.parse(search, {
			ignoreQueryPrefix: true,
		}) as Partial<SketchfabClientTypes.SearchModelsParams>;
		if (!equal(parsed, searchParams)) {
			setFilter(parsed);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		const parsed = qs.parse(search, {
			ignoreQueryPrefix: true,
		}) as Partial<SketchfabClientTypes.SearchModelsParams>;

		if (searchParams && Object.values(searchParams).length) {
			dispatch(modelsActionCreators.getModels(searchParams));

			if (!equal(parsed, searchParams)) {
				setSearchParams({ ...filterNonNull(searchParams) });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	useEffect(() => {
		dispatch(modelsActionCreators.getCategories());
		window.addEventListener("scroll", loadMore);
		return () => {
			window.removeEventListener("scroll", loadMore);
			dispatch(modelsActionCreators.cleanup());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageWrapper>
			<ModelsSearchForm categories={categories} searchParams={searchParams} setFilter={setFilter} />
			<ModelsList modelsSearch={modelsSearch} setSelectedModel={setSelectedModel} />
			{isFetching && <Preloader absolute />}
			{selectedModel && <ModelPopUp closeModal={() => setSelectedModel(null)} model={selectedModel} />}
		</PageWrapper>
	);
});
