import React, { FC, memo } from 'react';
import { PageWrapper } from '@Components/pageWrapper';
import styles from './FormWrapper.module.scss';

export const FormWrapper: FC = memo(({ children }) => {
  return (
    <PageWrapper style={styles.container}>
      {children}
    </PageWrapper>
  );
});