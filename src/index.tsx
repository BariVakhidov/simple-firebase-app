import React, { FC } from 'react';
import './style.module.scss';
import 'antd/dist/antd.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const debugRender = true;
if (debugRender && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

const AppContainer: FC = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

render(<AppContainer/>, document.getElementById('root'));
