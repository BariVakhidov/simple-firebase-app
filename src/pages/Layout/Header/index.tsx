import React, { FC, memo } from 'react';
import styles from './Header.module.scss';
import { Layout } from 'antd';
import { AppNav } from '@/pages/Layout/Nav';
import logo from '@Assets/images/logo.png';
import { useAppSelector } from '@/redux/store';
import { UserInformation } from '@/pages/Layout/Header/UserInformation';

const { Header } = Layout;

export const AppHeader: FC = memo(() => {

  const { user } = useAppSelector(state => state.app);

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt=""/>
      </div>
      <AppNav/>
      <UserInformation user={user}/>
    </Header>
  );
});