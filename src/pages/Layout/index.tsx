import React, { FC, memo, useEffect } from 'react';
import styles from './Layout.module.scss';
import { Layout, Modal } from 'antd';
import { AppHeader } from '@/pages/Layout/Header';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';

const { Content, Footer } = Layout;

export const AppLayout: FC = memo(({ children }) => {

  const { error } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      const modal = Modal.error({
        title: 'Error!',
        content: error,
        onOk: () => dispatch(appActionCreators.setError('')),
      });
      return () => {
        modal.destroy();
      };
    }
  }, [error]);

  return (
    <Layout className={styles.layout}>
      <AppHeader/>
      <Content className="site-layout">
        <div className={cn('site-layout-background', styles.content)}>
          {children}
        </div>
      </Content>
      <Footer className={styles.footer}>Simple firebase app ©2021 Created by Bari</Footer>
    </Layout>
  );
});