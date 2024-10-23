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
         
         <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        setImage(img);
                    }
                }}
                style={{ display: 'none'}}
                id="fileInput"
            />
            <button onClick={() => document.getElementById('fileInput').click()}>
                Upload (Max: 1)
            </button>
    
        </div>    
           
    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Space>
);
export default App;

/**
 * <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            maxCount={1}
            onChange={e => {
                const img = new Image()
                img.src = URL.createObjectURL(e.file.originFileObj)
                setImage(img)
            }}
        >
                </Upload>

 */