import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { PageWrapper } from '@Components/pageWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { modelsActionCreators } from '@/redux/models/action-creators';
import { Preloader } from '@Components/preloader';
import { ModelsSearchForm } from '@/pages/Models/ModelsSearchForm';
import { Nullable } from '@/baseTypes';
import { ModelPopUp } from '@/pages/Models/PopUp/ModelPopUp';
import { useHistory } from 'react-router';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import qs from 'qs';
import { ModelsList } from '@/pages/Models/ModelsList';
import { Routes } from '@/constants/routes';
import { shallowObjEquality } from '@/utils/shallowObjEquality';
import { filterNonNull } from '@/utils/filterNonNull';

export const Models: FC = memo(() => {
  const dispatch = useAppDispatch();
  const [selectedModel, setSelectedModel] = useState<Nullable<SketchfabClientTypes.Model>>(null);
  const { isFetching, modelsSearch, searchParams, categories } = useAppSelector(state => state.models);
  const history = useHistory();
  const setFilter = useCallback((filter: Partial<SketchfabClientTypes.SearchModelsParams>) => dispatch(modelsActionCreators.setSearchParams(filter)), [dispatch]);

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
      dispatch(modelsActionCreators.loadMoreModels());
    }
  };

  useEffect(() => {
    const parsed = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }) as Partial<SketchfabClientTypes.SearchModelsParams>;
    if (!shallowObjEquality(parsed, searchParams)) {
      setFilter(parsed);
    }
  }, [history.location.search]);

  useEffect(() => {

    const parsed = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }) as Partial<SketchfabClientTypes.SearchModelsParams>;

    if (Object.values(searchParams).length) {

      dispatch(modelsActionCreators.getModels(searchParams));

      if (!shallowObjEquality(parsed, searchParams)) {
        history.push({
          pathname: Routes.MODELS,
          search: qs.stringify(filterNonNull(searchParams)),
        });
      }
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(modelsActionCreators.getCategories());
    window.addEventListener('scroll', loadMore);
    return () => {
      window.removeEventListener('scroll', loadMore);
      dispatch(modelsActionCreators.cleanup());
    };
  }, [dispatch]);

  return (
    <PageWrapper>
      <ModelsSearchForm setFilter={setFilter} searchParams={searchParams} categories={categories}/>
      <ModelsList modelsSearch={modelsSearch} setSelectedModel={setSelectedModel}/>
      {isFetching && <Preloader absolute/>}
      {selectedModel && <ModelPopUp closeModal={() => setSelectedModel(null)} model={selectedModel}/>}
    </PageWrapper>
  );
});