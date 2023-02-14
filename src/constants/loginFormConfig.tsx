import React from "react";
import { InputProps } from "antd/lib/input/Input";
import { Rule } from "rc-field-form/es/interface";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { errorLabels } from "@/constants/errorLabels";
import { placeholders } from "@/constants/placeholders";

interface LoginFormItemProps {
	name: string;
	rules: Rule[];
}

interface LoginFormConfig {
	formItemConfig: LoginFormItemProps;
	inputConfig: InputProps;
}

export const loginFormConfig: LoginFormConfig[] = [
	{
		formItemConfig: {
			name: "email",
			rules: [
				{
					type: "email",
					message: errorLabels.emailInvalid,
				},
				{
					required: true,
					message: errorLabels.emailRequired,
				},
			],
		},
		inputConfig: {
			prefix: <UserOutlined className="site-form-item-icon" />,
			placeholder: placeholders.email,
		},
	},
	{
		formItemConfig: {
			name: "password",
			rules: [
				{ required: true, message: errorLabels.passwordRequired },
				{
					min: 6,
					message: errorLabels.passwordInvalid,
				},
			],
		},
		inputConfig: {
			prefix: <LockOutlined className="site-form-item-icon" />,
			type: "password",
			placeholder: placeholders.password,
		},
	},
];
