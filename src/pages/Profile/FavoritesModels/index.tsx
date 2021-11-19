import React, { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Avatar, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import styles from './FavoritesModels.module.scss';
import { HeartFilled } from '@ant-design/icons';
import { modelsActionCreators } from '@/redux/models/action-creators';
import { SetFirebaseModelRequest } from '@/firebase/types';

interface Props {
  userId: string;
}

export const FavoritesModels: FC<Props> = memo(({ userId }) => {
  const { userFavoritesModels } = useAppSelector(state => state.models);
  const dispatch = useAppDispatch();
  const onDelete = (params: SetFirebaseModelRequest) => dispatch(modelsActionCreators.changeModelCondition(params));
  if (!userFavoritesModels.length) {
    return <div>
      No favorites models
    </div>;
  }
  return (
    <Row className={styles.wrapper} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="start">
      {userFavoritesModels.map(model => <Col key={model.uid} span={6}>
        <Card
          hoverable
          cover={<img alt="" src={model.imageUrl}/>}
          actions={[
            <HeartFilled key={'like'} title={'Delete model'} onClick={() => onDelete({ model, userId })}/>,
          ]}
        >
          <Meta avatar={<Avatar src={model.userAvatarUrl}/>}
                title={model.name}
          />
        </Card>
      </Col>)}
    </Row>
  );
});