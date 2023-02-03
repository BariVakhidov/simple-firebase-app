import React, { FC, memo } from "react";
import { Button, Col, Form, Input, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { AppTypes } from "@/redux/app/types";
import { capitalizeFirstLetter } from "@Utils/capitalizeFirstLetter";

import styles from "./Profile.module.scss";

interface Props {
	user: AppTypes.UserInfo;
	deactivateEditMode: () => void;
	updateUser: (values: AppTypes.EditableInfo) => void;
}

const getEditInfo = (user: AppTypes.UserInfo) => {
	const { email, photoURL, displayName } = user;
	return { email, photoURL, displayName };
};

export const EditInfo: FC<Props> = memo(({ user, deactivateEditMode, updateUser }) => {
	const editableInfo = getEditInfo(user);

	return (
		<>
			<Col span={15}>
				<Form
					initialValues={editableInfo}
					labelCol={{ span: 5 }}
					name="edit_user_info"
					wrapperCol={{ span: 15 }}
					onFinish={updateUser}
				>
					{Object.keys(editableInfo).map((i) => (
						<Form.Item key={i} label={capitalizeFirstLetter(i)} name={i}>
							<Input />
						</Form.Item>
					))}
					<Form.Item wrapperCol={{ offset: 5, span: 15 }}>
						<Space>
							<Button htmlType="submit" type="primary">
								Save
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Col>
			<Col span={2}>
				<CloseOutlined className={styles.icon} onClick={deactivateEditMode} />
			</Col>
		</>
	);
});
