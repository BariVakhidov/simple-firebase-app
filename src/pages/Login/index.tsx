import React, { FC, memo } from "react";
import { Button, Form, Space } from "antd";
import { Link } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

import { loginFormConfig } from "@/constants/loginFormConfig";
import { Paths } from "@/constants/paths";
import { withAuthRedirect } from "@/hoc/withAuthRedirect";
import { appActionCreators } from "@/redux/app/action-creators";
import { AppTypes } from "@/redux/app/types";
import { useAppDispatch } from "@/redux/store";
import { FormInputItem } from "@Components/formItem/FormInputItem";
import { FormWrapper } from "@Components/formWrapper";

import styles from "./Login.module.scss";

const Login: FC = memo(() => {
	const dispatch = useAppDispatch();

	const login = (values: AppTypes.UserAuthParams) => dispatch(appActionCreators.login(values));
	const singInWithGoogle = () => dispatch(appActionCreators.signInWithGoogle());

	return (
		<FormWrapper>
			<Form className="login-form" name="normal_login" onFinish={login}>
				{loginFormConfig.map((config) => (
					<FormInputItem
						formItemProps={config.formItemConfig}
						inputProps={config.inputConfig}
						key={config.formItemConfig.name}
					/>
				))}
				<Form.Item wrapperCol={{ offset: 0, span: 16 }}>
					<Space>
						<Button htmlType="submit" type="primary">
							Login
						</Button>
						<Button onClick={singInWithGoogle}>
							<GoogleOutlined />
							Sign in with Google
						</Button>
						Or{" "}
						<Link className={styles.link} to={Paths.REGISTRATION}>
							register now!
						</Link>
					</Space>
				</Form.Item>
			</Form>
		</FormWrapper>
	);
});

export default withAuthRedirect(Login);
