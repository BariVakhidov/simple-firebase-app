import React, { memo } from "react";
import { Avatar, Space } from "antd";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";

import { SketchfabClientTypes } from "@/client/SketchfabClient/sketchfabClient-types";

import styles from "./PopUp.module.scss";

interface Props {
	model: SketchfabClientTypes.Model;
}

export const ModelInfo = memo<Props>(({ model }) => {
	return (
		<div className={styles.modelInfo}>
			<Space>
				<Avatar src={model.user.avatar.images[0].url} />
				{model.user.displayName}
				<Space align={"center"}>
					<LikeOutlined />
					{model.likeCount}

					<EyeOutlined />
					{model.viewCount}
				</Space>
			</Space>

			<div className={styles.description}>{model.description}</div>
		</div>
	);
});
