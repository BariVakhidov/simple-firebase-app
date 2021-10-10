import React from 'react';
import { useAppSelector } from '@/redux/store';
import { Redirect } from 'react-router';
import { Routes } from '@/constants/routes';
import { Preloader } from '@Components/preloader';

export function withAuthRedirect<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  return (props) => {
    const { user, isFetching } = useAppSelector(state => state.app);
    if (user) {
      return <Redirect to={Routes.PROFILE}/>;
    }
    return <>
      <Component {...props}/>
      {isFetching && <Preloader absolute/>}
    </>;
  };
}