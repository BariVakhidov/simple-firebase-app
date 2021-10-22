import React, { FC, memo } from 'react';
import styles from './Models.module.scss';
import { Form, Formik } from 'formik';
import { Button, Input, Select, Space } from 'antd';
import { RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/redux/store';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { modelsActionCreators } from '@/redux/models/action-creators';
import { Nullable } from '@/baseTypes';

const { Option } = Select;

interface Props {
  searchParams: Nullable<Partial<SketchfabClientTypes.SearchModelsParams>>;
  categories: Nullable<SketchfabClientTypes.Category[]>;
}

export const ModelsSearchForm: FC<Props> = memo(({ searchParams, categories }) => {
  const dispatch = useAppDispatch();
  const setSearchParams = (values: Partial<SketchfabClientTypes.SearchModelsParams>) => dispatch(modelsActionCreators.setSearchParams(values));
  const resetFilter = () => dispatch(modelsActionCreators.resetSearchParams());
  return (
    <Formik
      enableReinitialize
      onSubmit={values => {
        setSearchParams(values);
      }}
      initialValues={searchParams}
    >
      {({ values }) => (
        <Form autoComplete="off" className={styles.form}>
          <Space>
            <Input value={values.q} placeholder={'Search 3D models'} prefix={<SearchOutlined/>}
                   onChange={event => setSearchParams({ ...values, q: event.currentTarget.value })}/>
            <Select
              value={values.categories}
              placeholder="Select a category"
              onChange={value => setSearchParams({ ...values, categories: value })}
            >
              <Option value={null}>All categories</Option>
              {categories && categories.map(i => <Option key={i.uid} value={i.slug}>{i.name}</Option>)}
            </Select>
            <Button htmlType="submit">
              Search
            </Button>
            <Button onClick={resetFilter} icon={<RollbackOutlined/>}>
              Reset
            </Button>
          </Space>
        </Form>
      )}
    </Formik>
  );
});