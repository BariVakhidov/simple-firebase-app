import React, { FC, memo } from 'react';
import { useAppSelector } from '@/redux/store';
import { Avatar, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

export const FavoritesModels: FC = memo(() => {
  const { userFavoritesModels } = useAppSelector(state => state.models);

  if (!userFavoritesModels.length) {
    return <div>
      No favorites models
    </div>;
  }
  return (
    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="start">
      {userFavoritesModels.map(model => <Col key={model.uid} span={6}>
        <Card
          hoverable
          cover={<img alt="" src={model.imageUrl}
          />}
        >
          <Meta avatar={<Avatar src={model.userAvatarUrl}/>}
                title={model.name}
          />
        </Card>
      </Col>)}
    </Row>
  );
});