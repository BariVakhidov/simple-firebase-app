import { NamePath, Rule } from 'rc-field-form/es/interface';

export const registrationItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 30 },
  },
};
export const tailRegistrationItemLayout = {
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

export const registrationFormConfig: RegistrationFormConfig[] = [
  {
    label: 'Email',
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
  {
    name: 'password',
    label: 'Password',
    rules: [{ required: true, message: 'Please input your Password!' }, {
      min: 6,
      message: 'Password must be min 6 symbols',
    }],
    hasFeedback: true,
  },
  {
    name: 'confirm',
    label: 'Confirm Password',
    dependencies: ['password'],
    hasFeedback: true,
    rules: [
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
    ],
  },
];

interface RegistrationFormConfig {
  name: string,
  rules: Rule[],
  label: string,
  hasFeedback?: boolean,
  dependencies?: NamePath[]
}