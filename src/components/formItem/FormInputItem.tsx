import React, { FC, memo } from "react";
import { Form, Input } from "antd";
import { FormItemProps } from "antd/lib/form/FormItem";
import { InputProps } from "antd/lib/input/Input";

interface Props {
	formItemProps: FormItemProps;
	inputProps?: InputProps;
}

export const FormInputItem: FC<Props> = memo(({ formItemProps, inputProps }) => {
	return (
		<Form.Item {...formItemProps}>
			<Input {...inputProps} />
		</Form.Item>
	);
});
