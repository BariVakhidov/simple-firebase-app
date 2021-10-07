import React, { FC, memo } from 'react';
import { Header } from '@/pages/Layout/Header';
import { Nav } from '@/pages/Layout/Nav';

export const Layout: FC = memo(({ children }) => {
  return (
    <>
      <Header/>
      <Nav/>
      <main>
        {children}
      </main>
    </>
  );
});