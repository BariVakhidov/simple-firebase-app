import { Login } from '@/pages/Login';
import { Profile } from '@/pages/Profile';

export enum Routes {
  PROFILE = '/profile',
  LOGIN = '/login',
}

export const privateRoutes: Route[] = [
  {
    exact: true,
    Component: Login,
    path: Routes.LOGIN,
  },
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