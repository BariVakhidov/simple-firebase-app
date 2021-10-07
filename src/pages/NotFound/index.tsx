import React, { FC, memo } from 'react';
import { PageWrapper } from '@Components/pageWrapper';
import notFound from '@Assets/images/404.png';

export const NotFound: FC = memo(() => {
  return (
    <PageWrapper>
      <img src={notFound} alt=""/>
    </PageWrapper>
  );
});