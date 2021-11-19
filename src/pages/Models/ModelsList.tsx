import React, { FC, memo, useCallback, useState } from 'react';
import { Model } from '@/pages/Models/Model';
import { Row } from 'antd';
import { Nullable } from '@/baseTypes';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { modelsActionCreators } from '@/redux/models/action-creators';
import { SetFirebaseModelRequest } from '@/firebase/types';
import { RedirectPopUp } from '@/pages/Models/PopUp/RedirectPopUp';

interface Props {
  modelsSearch: Nullable<SketchfabClientTypes.SearchModelsResponse>;
  setSelectedModel: (model: SketchfabClientTypes.Model) => void;
}

export const ModelsList: FC<Props> = memo(({ modelsSearch, setSelectedModel }) => {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const { userFavoritesModels } = useAppSelector(state => state.models);
  const { user } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  const onChangeModelState = useCallback((params: SetFirebaseModelRequest) => {
    if (user) {
      dispatch(modelsActionCreators.changeModelCondition(params));
    } else {
      setIsPopUpOpened(true);
    }
  }, [dispatch, user]);
  const onPopUpClose = () => setIsPopUpOpened(false);
  if (!modelsSearch) {
    return null;
  }

  if (!modelsSearch.results.length) {
    return <div>No results</div>;
  }

  return (
    <>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify={'space-between'}>
        {modelsSearch.results.map(model => <Model
          user={user}
          userFavoritesModels={userFavoritesModels}
          onChangeModelState={onChangeModelState}
          onModelClick={setSelectedModel}
          model={model}
          key={model.uid}/>)}
      </Row>
      {isPopUpOpened && <RedirectPopUp onClose={onPopUpClose}/>}
    </>
  );
});