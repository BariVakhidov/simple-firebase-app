import React, { memo, useEffect, useRef } from "react";
import { Modal, Space } from "antd";

import { SketchfabClientTypes } from "@/client/SketchfabClient/sketchfabClient-types";
import { ModelInfo } from "@/pages/Models/PopUp/ModelInfo";

interface Props {
	model: SketchfabClientTypes.Model;
	closeModal: () => void;
}

export const ModelPopUp = memo<Props>(({ model, closeModal }) => {
	const viewerIframeRef = useRef(null);

	useEffect(() => {
		if (viewerIframeRef.current) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const client = new window.Sketchfab(viewerIframeRef.current);
			client.init(model.uid, {
				success: () => console.log("Viewer loaded"),
				error: () => console.log("Viewer error"),
			});
		}
	}, [model.uid]);

	return (
		<Modal
			open
			footer={null}
			style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			title={model.name}
			onCancel={closeModal}
		>
			<Space align={"start"}>
				<iframe
					ref={viewerIframeRef}
					style={{ height: 400, width: 600, border: "none" }}
					title="sketchfab-viewer"
				/>
				<ModelInfo model={model} />
			</Space>
		</Modal>
	);
});
