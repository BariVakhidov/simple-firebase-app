import React, { FC, memo } from 'react';
import { Layout } from '@/pages/Layout';
import { Login } from '@/pages/Login';

export const App: FC = memo(() => {
  return <Layout><Login/></Layout>;
});
