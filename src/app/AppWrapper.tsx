import React, { FC, memo, Profiler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';
import { App } from '@/app/App';
import { Spin } from 'antd';

export const AppWrapper: FC = memo(() => {

  const { initialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appActionCreators.initialize());
  }, [dispatch]);

  return (
    <Profiler id={'App'} onRender={(id, phase, actualTime) => {
      console.log(`${id}, phase: ${phase}, actualDuration: ${actualTime}`);
    }}>
      {initialized ? <App/> : <Spin size="large"/>}
    </Profiler>
  );
});