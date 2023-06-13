import React, { memo } from "react";
import { Button, Form, Space } from "antd";
import { useTranslation } from "react-i18next";

import {
	registrationFormConfig,
	registrationItemLayout,
	tailRegistrationItemLayout,
} from "@/constants/registrationFormConfig";
import { withAuthRedirect } from "@/hoc/withAuthRedirect";
import { appActionCreators } from "@/redux/app/action-creators";
import type { UserAuthParams } from "@/redux/app/types";
import { useAppDispatch } from "@/redux/store";
import { FormInputItem } from "@Components/formItem/FormInputItem";
import { FormWrapper } from "@Components/formWrapper";

const Registration = memo(() => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");

	const signUp = (values: UserAuthParams) => dispatch(appActionCreators.signUp(values));

	return (
		<FormWrapper>
			<Form
				{...registrationItemLayout}
				scrollToFirstError
				className="login-form"
				name="normal_login"
				onFinish={signUp}
			>
				{registrationFormConfig.map((config) => (
					<FormInputItem formItemProps={config} key={config.name} />
				))}
				<Form.Item {...tailRegistrationItemLayout}>
					<Space>
						<Button htmlType="submit" type="primary">
							{t("signUp")}
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</FormWrapper>
	);
});

export default withAuthRedirect(Registration);
