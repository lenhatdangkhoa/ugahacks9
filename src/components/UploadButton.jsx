import React, { useState, useEffect } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

const App = ({ setImage }) => {
    const [fileInfo, setFileInfo] = useState(null);

    useEffect(() => {
        if (fileInfo) {
            const img = new Image();
            img.src = fileInfo.url;
            setImage(img);
        } else {
            setImage(null);
        }
    }, [fileInfo, setImage]);

    const handleRemoveImage = () => {
        setFileInfo(null);
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
            size="large"
        >
            <Upload
                maxCount={1}
                showUploadList={false} 
                beforeUpload={() => false}
                onChange={(info) => {
                    const file = info.fileList[0]?.originFileObj;
                    if (file) {
                        const imgURL = URL.createObjectURL(file);
                        setFileInfo({
                            name: file.name,
                            url: imgURL
                        });
                    }
                }}
            >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>

            {fileInfo && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <img
                        width={100}
                        src={fileInfo.url}
                        alt={fileInfo.name}
                        style={{ borderRadius: '8px', border: '1px solid #e8e8e8' }}
                    />
                    <p>{fileInfo.name}</p>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={handleRemoveImage}
                        style={{ marginTop: '10px' }}
                    >
                        Remove Image
                    </Button>
                </div>
            )}
        </Space>
    );
};

export default App;
