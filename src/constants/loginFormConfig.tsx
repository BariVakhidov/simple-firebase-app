import React from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { InputProps } from 'antd/lib/input/Input';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const loginFormConfig: LoginFormConfig[] = [
  {
    formItemConfig: {
      name: 'email',
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ],
    },
    inputConfig: {
      prefix: <UserOutlined className="site-form-item-icon"/>,
      placeholder: 'Email',
    },
  },
  {
    formItemConfig: {
      name: 'password',
      rules: [{ required: true, message: 'Please input your Password!' }, {
        min: 6,
        message: 'Password must be min 6 symbols',
      }],
    },
    inputConfig: {
      prefix: <LockOutlined className="site-form-item-icon"/>,
      type: 'password',
      placeholder: 'Password',
    },
  },
];

interface LoginFormConfig {
  formItemConfig: LoginFormItemProps;
  inputConfig: InputProps;
}

interface LoginFormItemProps {
  name: string,
  rules: Rule[],
}
