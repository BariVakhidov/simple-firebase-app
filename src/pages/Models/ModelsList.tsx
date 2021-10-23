import React, { FC, memo, useCallback } from 'react';
import { Model } from '@/pages/Models/Model';
import { Row } from 'antd';
import { Nullable } from '@/baseTypes';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { useAppDispatch } from '@/redux/store';
import { modelsActionCreators } from '@/redux/models/action-creators';
import { SetFirebaseModelRequest } from '@/firebase/types';

interface Props {
  modelsSearch: Nullable<SketchfabClientTypes.SearchModelsResponse>;
  setSelectedModel: (model: SketchfabClientTypes.Model) => void;
}

export const ModelsList: FC<Props> = memo(({ modelsSearch, setSelectedModel }) => {
  const dispatch = useAppDispatch();
  const onChangeModelState = useCallback((params: SetFirebaseModelRequest) => dispatch(modelsActionCreators.changeModelCondition(params)), [dispatch]);

  if (!modelsSearch) {
    return null;
  }

  if (!modelsSearch.results.length) {
    return <div>No results</div>;
  }

  return (
    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify={'space-between'}>
      {modelsSearch.results.map(model => <Model
        onChangeModelState={onChangeModelState}
        onModelClick={setSelectedModel}
        model={model}
        key={model.uid}/>)}
    </Row>
  );
});