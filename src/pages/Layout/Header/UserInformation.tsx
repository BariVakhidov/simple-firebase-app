import React, { FC, memo } from 'react';
import styles from './Header.module.scss';
import { Nullable } from '@/baseTypes';
import { Avatar, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { Routes } from '@/constants/routes';
import { useAppDispatch } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';
import { AppTypes } from '@/redux/app/types';

interface Props {
  user: Nullable<AppTypes.UserInfo>;
}

export const UserInformation: FC<Props> = memo(({ user }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const logout = () => dispatch(appActionCreators.logout());

  if (!user) {
    return <Space>
      <Button onClick={() => history.push(Routes.LOGIN)}>Sign In</Button>
      <Button onClick={() => history.push(Routes.REGISTRATION)}>Sign Up</Button>
    </Space>;
  }

  return (
    <Space>
      <Avatar src={user.photoURL} icon={!user.photoURL && <UserOutlined/>}/>
      <span className={styles.name}>{user.displayName}</span>
      <Button onClick={logout}>Logout</Button>
    </Space>
  );
});