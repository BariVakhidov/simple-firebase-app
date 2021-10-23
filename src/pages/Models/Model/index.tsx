import React, { FC, memo } from 'react';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { Avatar, Card, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import { SetFirebaseModelRequest } from '@/firebase/types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/redux/store';

interface Props {
  model: SketchfabClientTypes.Model;
  onModelClick: (model: SketchfabClientTypes.Model) => void;
  onChangeModelState: (params: SetFirebaseModelRequest) => void;
}

export const Model: FC<Props> = memo(({ model, onModelClick, onChangeModelState }) => {
  const { user } = useAppSelector(state => state.app);
  const { userFavoritesModels } = useAppSelector(state => state.models);
  const isFavorite = userFavoritesModels.find(i => i.uid === model.uid);
  const { uid, name, thumbnails } = model;
  const imageUrl = thumbnails.images[0].url;
  const userAvatarUrl = model.user.avatar.images[0].url;
  const handleChangeModelState = () => onChangeModelState({
    userId: user.uid,
    model: { uid, name, imageUrl, userAvatarUrl },
  });
  return (
    <Col span={6}>
      <Card
        onClick={() => onModelClick(model)}
        hoverable
        actions={[
          !isFavorite ? <HeartOutlined key={'like'} onClick={(e) => {
            e.stopPropagation();
            handleChangeModelState();
          }}/> : <HeartFilled key={'like'} onClick={(e) => {
            e.stopPropagation();
            handleChangeModelState();
          }}/>,
        ]}
        cover={<img alt="" src={imageUrl}
        />}
      >
        <Meta avatar={<Avatar src={model.user.avatar.images[0].url}/>}
              title={model.name}
        />
      </Card>
    </Col>
  );
});