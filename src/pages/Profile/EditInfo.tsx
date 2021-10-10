import React, { FC, memo } from 'react';
import styles from './Profile.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { AppTypes } from '@/redux/app/types';
import { Button, Col, Form, Input, Space } from 'antd';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

interface Props {
  user: AppTypes.UserInfo;
  deactivateEditMode: () => void;
  updateUser: (values: AppTypes.EditableInfo) => void;
}

export const EditInfo: FC<Props> = memo(({ user, deactivateEditMode, updateUser }) => {
  const { uid, emailVerified, phoneNumber, ...editableInfo } = user;
  return (
    <>
      <Col span={15}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="edit_user_info"
          onFinish={updateUser}
          initialValues={editableInfo}
        >
          {Object.keys(editableInfo).map(i => <Form.Item
            key={i}
            name={i}
            label={capitalizeFirstLetter(i)}
          >
            <Input/>
          </Form.Item>)}
          <Form.Item wrapperCol={{ offset: 5, span: 15 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col span={2}>
        <CloseOutlined onClick={deactivateEditMode} className={styles.icon}/>
      </Col>
    </>
  );
});