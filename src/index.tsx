import React, { createContext, FC, memo } from 'react';
import './style.module.scss';
import 'antd/dist/antd.css';
import { render } from 'react-dom';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { App } from '@/app/App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const debugRender = true;
if (debugRender && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

export const FirebaseContext = createContext(null);

// const app = firebase.initializeApp({
//   apiKey: 'AIzaSyBE3tWbllzu_3OGs2QVuVE9mlAFJG6LqAw',
//   authDomain: 'simple-firebase-project-d0b94.firebaseapp.com',
//   projectId: 'simple-firebase-project-d0b94',
//   storageBucket: 'simple-firebase-project-d0b94.appspot.com',
//   messagingSenderId: '991904812479',
//   appId: '1:991904812479:web:da3dd02187ec02279d250a',
//   measurementId: 'G-V99D1TTT8M',
// });


const AppContainer: FC = memo(() => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
});

render(<AppContainer/>, document.getElementById('root'));
