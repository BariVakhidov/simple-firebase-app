import { Profile } from '@/pages/Profile';
import React from 'react';

export enum Routes {
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTRATION = '/REGISTRATION',
}

export const privateRoutes: Route[] = [
  {
    exact: true,
    Component: Profile,
    path: Routes.PROFILE,
  },
];

interface Route {
  path: Routes;
  exact?: boolean;
  Component: React.ComponentType;
}