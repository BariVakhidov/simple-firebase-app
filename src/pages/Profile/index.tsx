import React, { FC, memo, useCallback, useState } from 'react';
import styles from './Profile.module.scss';
import { PageWrapper } from '@Components/pageWrapper';
import { Col, Descriptions, Image, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import avatar from '@Assets/images/no-photo.png';
import { EditInfo } from '@/pages/Profile/EditInfo';
import { AppTypes } from '@/redux/app/types';
import { appActionCreators } from '@/redux/app/action-creators';
import { EditOutlined } from '@ant-design/icons';
import { Preloader } from '@Components/preloader';

export const Profile: FC = memo(() => {
  const [isEditMode, setEditMode] = useState(false);
  const { user, isFetching } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();


  const activateEditMode = useCallback(() => setEditMode(true), []);
  const deactivateEditMode = useCallback(() => setEditMode(false), []);
  const updateUser = useCallback((values: AppTypes.EditableInfo) => {
    dispatch(appActionCreators.updateUser(values));
    setEditMode(false);
  }, [dispatch]);

  if (!user) {
    return null;
  }
  const { uid, emailVerified, ...displayedInfo } = user;
  return (
    <PageWrapper>
      <Row justify="space-between" align="top">
        <Col><Image src={user.photoURL ? user.photoURL : avatar} width={200}
                    preview={!!user.photoURL}/></Col>
        {isEditMode ? <EditInfo updateUser={updateUser} deactivateEditMode={deactivateEditMode} user={user}/> : <>
          <Col>
            <Descriptions title="User Info" column={1} bordered>
              {Object.entries(displayedInfo).map(i => i[1] && <Descriptions.Item key={i[0]}
                                                                                 label={i[0]}>{i[1]}</Descriptions.Item>)}
            </Descriptions>
          </Col>
          <Col>
            <EditOutlined onClick={activateEditMode} className={styles.icon}/>
          </Col>
        </>}
      </Row>
      {isFetching && <Preloader absolute/>}
    </PageWrapper>
  );
});