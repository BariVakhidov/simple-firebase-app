import { NamePath, Rule } from "rc-field-form/es/interface";

import { errorLabels } from "@/constants/errorLabels";
import { labels } from "@/constants/labels";

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

interface RegistrationFormConfig {
	name: string;
	rules: Rule[];
	label: string;
	hasFeedback?: boolean;
	dependencies?: NamePath[];
}

export const registrationFormConfig: RegistrationFormConfig[] = [
	{
		name: "email",
		label: labels.email,
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
	{
		name: "password",
		label: labels.password,
		rules: [
			{ required: true, message: errorLabels.passwordRequired },
			{
				min: 6,
				message: errorLabels.passwordInvalid,
			},
		],
		hasFeedback: true,
	},
	{
		name: "confirm",
		label: labels.confirmPassword,
		dependencies: ["password"],
		hasFeedback: true,
		rules: [
			{ required: true, message: errorLabels.passwordRequired },
			{
				min: 6,
				message: errorLabels.passwordInvalid,
			},
			({ getFieldValue }) => ({
				validator(_, value) {
					if (!value || getFieldValue("password") === value) {
						return Promise.resolve();
					}
					return Promise.reject(new Error(errorLabels.passwordsMatching));
				},
			}),
		],
	},
];
