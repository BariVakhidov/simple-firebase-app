import React, { FC, memo } from 'react';
import styles from './Login.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router';
import { Routes } from '@/constants/routes';
import { PageWrapper } from '@Components/pageWrapper';

export const Login: FC = memo(() => {
  const isAuth = false;

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
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
});