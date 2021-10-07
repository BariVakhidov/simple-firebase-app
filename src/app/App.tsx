import React, { FC, memo } from 'react';
import { Layout } from '@/pages/Layout';
import { Route, Switch } from 'react-router';
import { privateRoutes } from '@/constants/routes';
import { NotFound } from '@/pages/NotFound';

export const App: FC = memo(() => {
  return <Layout>
    <Switch>
      {privateRoutes.map(route => <Route key={route.path} component={route.Component} exact={route.exact}
                                         path={route.path}/>)}
      <Route path={'*'} component={NotFound}/>
    </Switch>
  </Layout>;
});
