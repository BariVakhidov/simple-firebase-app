import React, { FC, memo } from 'react';
import cn from 'classnames';
import styles from './Wrapper.module.scss';

interface Props {
  style: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const PageWrapper: FC<Partial<Props>> = memo(({ children, onKeyDown, style }) => {
  return (
    <div className={cn(styles.wrapper, style)} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
});