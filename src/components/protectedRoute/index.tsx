import React, { FC, memo } from 'react';
import { Redirect, Route } from 'react-router';
import { Routes } from '@/constants/routes';
import { useAppSelector } from '@/redux/store';

interface Props {
  exact?: boolean;
  Component: React.ComponentType;
  path: string;
}

export const ProtectedRoute: FC<Props> = memo(({ Component, exact, path }) => {
  const { user } = useAppSelector(state => state.app);
  return (
    <Route exact={exact} path={path} render={() => {
      if (!user) return <Redirect to={Routes.LOGIN}/>;
      return <Component/>;
    }}/>
  );
});