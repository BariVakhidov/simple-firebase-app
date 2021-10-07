import React, { FC, memo, useContext } from 'react';
import styles from './Login.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router';
import { Routes } from '@/constants/routes';
import { PageWrapper } from '@Components/pageWrapper';
import { FirebaseContext } from '@/index';
import { GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword  } from '@firebase/auth';
import { useAppDispatch } from '@/redux/store';

export const Login: FC = memo(() => {
  const dispatch = useAppDispatch();
  const isAuth = false;
 // const { auth } = useContext(FirebaseContext);

 /* const login = () => {
      dispatch()
  }
*/
  const singInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
   /* const { user } = await signInWithPopup(auth, provider);
    console.log(user);*/
  };

  if (isAuth) {
    return <Redirect to={Routes.PROFILE}/>;
  }

  return (
    <PageWrapper style={styles.login}>
      <Form>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={singInWithGoogle}>
            Login
          </Button>
          <Button type="primary" htmlType="submit" onClick={singInWithGoogle}>
            Sign in with Google
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
});