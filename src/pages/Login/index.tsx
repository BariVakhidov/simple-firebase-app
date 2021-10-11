import React, { FC, memo } from 'react';
import styles from './Login.module.scss';
import { Form, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
import { appActionCreators } from '@/redux/app/action-creators';
import { GoogleOutlined } from '@ant-design/icons';
import { withAuthRedirect } from '@/hoc/withAuthRedirect';
import { AppTypes } from '@/redux/app/types';
import { FormWrapper } from '@Components/formWrapper';
import { Routes } from '@/constants/routes';
import { loginFormConfig } from '@/constants/loginFormConfig';
import { FormInputItem } from '@Components/formItem/FormInputItem';

const Login: FC = memo(() => {
  const dispatch = useAppDispatch();

  const login = (values: AppTypes.UserAuthParams) => dispatch(appActionCreators.login(values));
  const singInWithGoogle = () => dispatch(appActionCreators.signInWithGoogle());

  return (
    <FormWrapper>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={login}>
        {loginFormConfig.map(config => <FormInputItem key={config.formItemConfig.name}
                                                      formItemProps={config.formItemConfig}
                                                      inputProps={config.inputConfig}/>)}
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button onClick={singInWithGoogle}>
              <GoogleOutlined/>
              Sign in with Google
            </Button>
            Or <Link to={Routes.REGISTRATION} className={styles.link}>register now!</Link>
          </Space>
        </Form.Item>

      </Form>
    </FormWrapper>
  );
});

export default withAuthRedirect(Login);