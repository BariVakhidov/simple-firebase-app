import React, { FC, memo } from 'react';
import { AppLayout } from '@/pages/Layout';
import { Route, Switch } from 'react-router';
import { privateRoutes, Routes } from '@/constants/routes';
import { NotFound } from '@/pages/NotFound';
import { Models } from '@/pages/Models';
import { ProtectedRoute } from '@Components/protectedRoute';
import Login from '@/pages/Login';
import Registration from '@/pages/Registration';


export const App: FC = memo(() => {
  return <AppLayout>
    <Switch>
      {privateRoutes.map(route => <ProtectedRoute key={route.path} Component={route.Component} exact={route.exact}
                                                  path={route.path}/>)}
      <Route path={Routes.LOGIN} exact component={Login}/>
      <Route path={Routes.REGISTRATION} exact component={Registration}/>
      <Route path={Routes.MODELS} exact component={Models}/>
      <Route path={'*'} component={NotFound}/>
    </Switch>
  </AppLayout>;
});
