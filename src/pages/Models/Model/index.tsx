import React, { FC, memo } from 'react';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { Avatar, Card, Col } from 'antd';
import Meta from 'antd/es/card/Meta';

interface Props {
  model: SketchfabClientTypes.Model;
  onModelClick: (model:SketchfabClientTypes.Model) => void;
}

export const Model: FC<Props> = memo(({ model, onModelClick }) => {
  return (
    <Col span={6}>
      <Card
        onClick={() => onModelClick(model)}
        hoverable
        cover={<img alt="" src={model.thumbnails.images[0].url}/>}
      >
        <Meta avatar={<Avatar src={model.user.avatar.images[0].url}/>}
              title={model.name}/>
      </Card>
    </Col>
  );
});