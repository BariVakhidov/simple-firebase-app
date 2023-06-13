import React, { memo } from "react";
import { Button, Col, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";

import type { EditableInfo, UserInfo } from "@/redux/app/types";
import { capitalizeFirstLetter } from "@Utils/capitalizeFirstLetter";

import styles from "./Profile.module.scss";

interface Props {
	user: UserInfo;
	deactivateEditMode: () => void;
	updateUser: (values: EditableInfo) => void;
}

const getEditInfo = (user: UserInfo) => {
	const { email, photoURL, displayName } = user;
	return { email, photoURL, displayName };
};

export const EditInfo = memo<Props>(({ user, deactivateEditMode, updateUser }) => {
	const editableInfo = getEditInfo(user);
	const { t } = useTranslation("common");

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
								{t("save")}
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
