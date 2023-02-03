import React, { FC, memo } from "react";
import { Button, Input, Select, Space } from "antd";
import { Form, Formik } from "formik";
import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";

import { Nullable } from "@/baseTypes";
import { SketchfabClientTypes } from "@/client/SketchfabClient/sketchfabClient-types";
import { modelsActionCreators } from "@/redux/models/action-creators";
import { useAppDispatch } from "@/redux/store";

import styles from "./Models.module.scss";

const { Option } = Select;

interface Props {
	searchParams: Nullable<Partial<SketchfabClientTypes.SearchModelsParams>>;
	categories: Nullable<SketchfabClientTypes.Category[]>;
	setFilter: (values: Partial<SketchfabClientTypes.SearchModelsParams>) => void;
}

export const ModelsSearchForm: FC<Props> = memo(({ searchParams, categories, setFilter }) => {
	const dispatch = useAppDispatch();
	const resetFilter = () => dispatch(modelsActionCreators.resetSearchParams());
	return (
		<Formik
			enableReinitialize
			initialValues={searchParams ? searchParams : { q: "", categories: undefined }}
			onSubmit={(values) => {
				setFilter(values);
			}}
		>
			{({ values }) => (
				<Form autoComplete="off" className={styles.form}>
					<Space>
						<Input
							placeholder={"Search 3D models"}
							prefix={<SearchOutlined />}
							value={values.q}
							onChange={(event) => setFilter({ ...values, q: event.currentTarget.value })}
						/>
						<Select
							placeholder="Select a category"
							value={values.categories}
							onChange={(value) => setFilter({ ...values, categories: value })}
						>
							<Option value="">All categories</Option>
							{categories &&
								categories.map((i) => (
									<Option key={i.uid} value={i.slug}>
										{i.name}
									</Option>
								))}
						</Select>
						<Button htmlType="submit">Search</Button>
						<Button icon={<RollbackOutlined />} onClick={resetFilter}>
							Reset
						</Button>
					</Space>
				</Form>
			)}
		</Formik>
	);
});
