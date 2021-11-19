import React, { FC, memo, useEffect } from 'react';
import { Button, Modal, Space } from 'antd';
import { useHistory } from 'react-router';
import { Routes } from '@/constants/routes';
import styles from './PopUp.module.scss';

interface Props {
  onClose: () => void;
}

export const RedirectPopUp: FC<Props> = memo(({ onClose }) => {
  const history = useHistory();

  useEffect(() => {
    return () => {
      onClose();
    };
  }, []);

  return (
    <Modal onCancel={onClose}
           className={styles.modal}
           visible footer={null}>
      <div className={styles.content}>
        <span>
        To add models in favorites, you need to sign in or sing up
      </span>
        <Space>
          <Button type="primary" onClick={() => history.push(Routes.LOGIN)}>Sign In</Button>
          <Button type="primary" onClick={() => history.push(Routes.REGISTRATION)}>Sign Up</Button>
        </Space>
      </div>
    </Modal>
  );
});