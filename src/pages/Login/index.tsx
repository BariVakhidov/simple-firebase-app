import React, { memo } from "react";
import { Button, Form, Space } from "antd";
import { useTranslation } from "react-i18next";
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

const Login = memo(() => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");

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
							{t("login.loginBtn")}
						</Button>
						<Button onClick={singInWithGoogle}>
							<GoogleOutlined />
							{t("login.googleSignIn")}
						</Button>
						{t("or")}
						<Link className={styles.link} to={Paths.REGISTRATION}>
							{t("login.registration")}
						</Link>
					</Space>
				</Form.Item>
			</Form>
		</FormWrapper>
	);
});

export default withAuthRedirect(Login);
