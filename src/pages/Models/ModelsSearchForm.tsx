import React, { memo } from "react";
import { Button, Input, Select, Space } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
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

export const ModelsSearchForm = memo<Props>(({ searchParams, categories, setFilter }) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation("models");

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
							<Option value="">{t("allCategories")}</Option>
							{categories &&
								categories.map((i) => (
									<Option key={i.uid} value={i.slug}>
										{i.name}
									</Option>
								))}
						</Select>
						<Button htmlType="submit">{t("search")}</Button>
						<Button icon={<RollbackOutlined />} onClick={resetFilter}>
							{t("reset")}
						</Button>
					</Space>
				</Form>
			)}
		</Formik>
	);
});
