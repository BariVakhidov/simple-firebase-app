import React, { FC, memo, useEffect, useRef } from 'react';
import { Modal, Space } from 'antd';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { ModelInfo } from '@/pages/Models/PopUp/ModelInfo';

interface Props {
  model: SketchfabClientTypes.Model;
  closeModal: () => void;
}

export const ModelPopUp: FC<Props> = memo(({ model, closeModal }) => {
  const viewerIframeRef = useRef(null);


  useEffect(
    () => {
      // @ts-ignore
      const client = new window.Sketchfab(viewerIframeRef.current);
      client.init(model.uid, {
        success: () => {
        },
        error: () => {
          console.log('Viewer error');
        },
      });
    },
    // We only want to initialize the viewer on first load, so we don't add any dependencies to useEffect
    []);

  return (
    <Modal title={model.name} onCancel={closeModal}
           style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
           visible footer={null}>
      <Space align={'start'}>
        <iframe
          // We feed the ref to the iframe component to get the underlying DOM object
          ref={viewerIframeRef}
          title="sketchfab-viewer"
          style={{ height: 400, width: 600 }}
        />
        <ModelInfo model={model}/>
      </Space>
    </Modal>
  );
});