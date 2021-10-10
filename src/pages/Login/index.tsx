import React, { FC, memo } from 'react';
import styles from './Login.module.scss';
import { Form, Input, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PageWrapper } from '@Components/pageWrapper';
import { useAppDispatch } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { withAuthRedirect } from '@/hoc/withAuthRedirect';
import { AppTypes } from '@/redux/app/types';

const Login: FC = memo(() => {
  const dispatch = useAppDispatch();

  const login = (values: AppTypes.UserAuthParams) => {
    dispatch(appActionCreators.login({ email: values.email, password: values.password }));
  };
  const singInWithGoogle = () => dispatch(appActionCreators.signInWithGoogle());

  return (
    <PageWrapper style={styles.login}>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={login}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }, {
            min: 6,
            message: 'Password must be min 6 symbols',
          }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button onClick={singInWithGoogle}>
              <GoogleOutlined/>
              Sign in with Google
            </Button>
            Or <Link to={'/registration'} className={styles.link}>register now!</Link>
          </Space>
        </Form.Item>

      </Form>
    </PageWrapper>
  );
});

export default withAuthRedirect(Login);