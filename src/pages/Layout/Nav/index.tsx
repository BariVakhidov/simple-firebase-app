import React, { FC, memo } from 'react';
import styles from './Nav.module.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useLocation } from 'react-router';
import { Routes } from '@/constants/routes';

export const AppNav: FC = memo(() => {
  const location = useLocation();
  return (
    <Menu selectedKeys={[location.pathname]} theme="dark" mode="horizontal" defaultSelectedKeys={['/']} className={styles.menu}>
      <Menu.Item key={Routes.MODELS}><Link to={Routes.MODELS}>Models</Link></Menu.Item>
      <Menu.Item key={Routes.PROFILE}><Link to={Routes.PROFILE}>Profile</Link></Menu.Item>
    </Menu>
  );
});