import React, { FC, memo } from 'react';
import '@/utils/wdyr';
import './style.css';
import 'antd/dist/antd.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { AppWrapper } from '@/app/AppWrapper';

const AppContainer: FC = memo(() => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppWrapper/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
});

render(<AppContainer/>, document.getElementById('root'));
