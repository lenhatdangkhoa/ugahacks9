import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
const App = ({ setImage }) => (
    /**
     * Upload Image Button
     * Limited to only one input
     */
    <Space
        direction="vertical"
        style={{
            width: '100%',
        }}
        size="large"
    >
        <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            maxCount={1}
            onChange={e => {
                const img = new Image()
                img.src = URL.createObjectURL(e.file.originFileObj)
                setImage(img)
            }}
        >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
        </Upload>
    </Space>
);
export default App;