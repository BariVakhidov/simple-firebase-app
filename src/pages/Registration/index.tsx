import React, { FC, memo } from 'react';
import { useAppDispatch } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';
import { Button, Form, Input, Space } from 'antd';
import { FormWrapper } from '@Components/formWrapper';
import { withAuthRedirect } from '@/hoc/withAuthRedirect';
import { AppTypes } from '@/redux/app/types';

const Registration: FC = memo(() => {
  const dispatch = useAppDispatch();

  const signUp = (values: AppTypes.UserAuthParams) => {
    dispatch(appActionCreators.signUp({ email: values.email, password: values.password }));
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 30 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 10,
      },
    },
  };
  return (
    <FormWrapper>
      <Form
        {...formItemLayout}
        scrollToFirstError
        name="normal_login"
        className="login-form"
        onFinish={signUp}>
        <Form.Item
          label="Email"
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
          <Input/>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }, {
            min: 6,
            message: 'Password must be min 6 symbols',
          }]}
          hasFeedback
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please input your Password!' }, {
              min: 6,
              message: 'Password must be min 6 symbols',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Space>
        </Form.Item>

      </Form>
    </FormWrapper>
  );
});

export default withAuthRedirect(Registration);