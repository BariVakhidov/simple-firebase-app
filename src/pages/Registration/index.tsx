import React, { FC, memo } from 'react';
import { useAppDispatch } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';
import { Button, Form, Space } from 'antd';
import { FormWrapper } from '@Components/formWrapper';
import { withAuthRedirect } from '@/hoc/withAuthRedirect';
import { AppTypes } from '@/redux/app/types';
import {
  registrationFormConfig,
  registrationItemLayout,
  tailRegistrationItemLayout,
} from '@/constants/registrationFormConfig';
import { FormInputItem } from '@Components/formItem/FormInputItem';

const Registration: FC = memo(() => {
  const dispatch = useAppDispatch();

  const signUp = (values: AppTypes.UserAuthParams) => dispatch(appActionCreators.signUp(values));

  return (
    <FormWrapper>
      <Form
        {...registrationItemLayout}
        scrollToFirstError
        name="normal_login"
        className="login-form"
        onFinish={signUp}>
        {registrationFormConfig.map(config => <FormInputItem key={config.name} formItemProps={config}/>)}
        <Form.Item {...tailRegistrationItemLayout}>
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