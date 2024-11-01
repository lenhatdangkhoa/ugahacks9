import React, { useState, useEffect } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';

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

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
        }
        return isJpgOrPng;
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
                beforeUpload={beforeUpload}
                onChange={(info) => {
                    const file = info.fileList[0]?.originFileObj;
                    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                        const imgURL = URL.createObjectURL(file);
                        setFileInfo({
                            name: file.name,
                            url: imgURL
                        });
                    } else {
                        setFileInfo(null);
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
