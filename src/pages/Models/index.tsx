import React, { FC, memo, useEffect, useState } from 'react';
import { PageWrapper } from '@Components/pageWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { modelsActionCreators } from '@/redux/models/action-creators';
import { Preloader } from '@Components/preloader';
import { ModelsSearchForm } from '@/pages/Models/ModelsSearchForm';
import { Nullable } from '@/baseTypes';
import { PopUp } from '@/pages/Models/PopUp';
import { useHistory } from 'react-router';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import qs from 'qs';
import { ModelsList } from '@/pages/Models/ModelsList';
import { Routes } from '@/constants/routes';

export const Models: FC = memo(() => {
  const dispatch = useAppDispatch();
  const [selectedModel, setSelectedModel] = useState<Nullable<SketchfabClientTypes.Model>>(null);
  const { isFetching, modelsSearch, searchParams, categories } = useAppSelector(state => state.models);
  const history = useHistory();

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
      dispatch(modelsActionCreators.loadMoreModels());
    }
  };

  useEffect(() => {
    const parsed = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }) as Partial<SketchfabClientTypes.SearchModelsParams>;

    Object.entries(searchParams).forEach(param => {
      if (param[1] && param[1] !== parsed[param[0]]) {
        parsed[param[0]] = param[1];
      }
    });

    history.push({
      pathname: Routes.MODELS,
      search: qs.stringify(parsed),
    });

    if (searchParams.q || searchParams.categories) {//TODO: when q is '' and user switch from one category to all categories
      dispatch(modelsActionCreators.getModels(searchParams));
    }

  }, [searchParams]);

  useEffect(() => {
    const parsed = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }) as Partial<SketchfabClientTypes.SearchModelsParams>;

    const filter = { ...searchParams };

    Object.entries(parsed).forEach(i => {
      if (i[1]) {
        filter[i[0]] = i[1];
      }
    });

    dispatch(modelsActionCreators.setSearchParams(filter));
    dispatch(modelsActionCreators.getCategories());

    return () => {
      dispatch(modelsActionCreators.cleanup());
    };
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', loadMore);
    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [dispatch]);

  return (
    <PageWrapper>
      <ModelsSearchForm searchParams={searchParams} categories={categories}/>
      <ModelsList modelsSearch={modelsSearch} setSelectedModel={setSelectedModel}/>
      {isFetching && <Preloader absolute/>}
      {selectedModel && <PopUp closeModal={() => setSelectedModel(null)} model={selectedModel}/>}
    </PageWrapper>
  );
});