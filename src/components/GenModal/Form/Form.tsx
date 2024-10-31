import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import './Form.css';
import generateKey from '../../../utils/keygen';
import { FieldType } from '../../../types/Form';
import { NAME_MAX_LENGTH, NAME_REQUIRED, HASH_REQUIRED, QUANTITY_REQUIRED } from '../../../shared/constants/messages';

const { Option } = Select;

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  await generateKey(values.name!, values.hash!, values.quantity!);
  window.location.reload();
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const GenForm: React.FC = () => {
    const [isNameDisabled, setIsNameDisabled] = useState(false);
    const [nameRules, setNameRules] = useState([{ required: true, message: NAME_REQUIRED }, { max: 15, message: NAME_MAX_LENGTH }]);

    const handleQuantityChange = (value: string) => {
        const quantity = parseInt(value, 10);
        setIsNameDisabled(quantity > 1);

        if (quantity > 1) {
            setNameRules([{ max: 15, message: NAME_MAX_LENGTH }]);
        } else {
            setNameRules([{ required: true, message: NAME_REQUIRED }, { max: 15, message: NAME_MAX_LENGTH }]);
        }
    };

    return (
        <Form
            name="gen-form"
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="custom-form mt-8"
        >
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={nameRules}
            >
                <Input placeholder='key-1' disabled={isNameDisabled} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: QUANTITY_REQUIRED }]}
            >
                <Input placeholder='10' onChange={(e) => handleQuantityChange(e.target.value)} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Hash type"
                name="hash"
                rules={[{ required: true, message: HASH_REQUIRED }]}
            >
                <Select placeholder="Hash type">
                    <Option value="sha1">SHA-1</Option>
                    <Option value="sha256">SHA-256</Option>
                    <Option value="sha3">SHA3</Option>
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Generate
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GenForm;
