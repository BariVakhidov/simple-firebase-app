import React, { FC, memo } from 'react';
import { Spin } from 'antd';
import styles from './Preloader.module.scss';

interface Props {
  absolute?: boolean;
}

export const Preloader: FC<Props> = memo(({ absolute }) => {
  return (
    <div className={absolute && styles.container}>
      <Spin size="large"/>
    </div>
  );
});