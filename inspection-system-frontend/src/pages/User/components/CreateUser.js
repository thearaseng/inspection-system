import React, {useState, useEffect, useCallback} from "react";
import {Col, Form, Input, message, Row, Checkbox} from "antd";
import {HomeOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import { connect } from "react-redux";
import {createUser} from "../../../services/User";
import {ROLE_INSPECTOR, ROLE_MANAGER} from "../../../constants/Security";

const mapStateToProps = () => ({});

const CreateUser = (props) => {

    const [domainInfo, setDomainInfo] = useState([]);

    const onChange = (newFields) => {
        setDomainInfo(newFields);
    };



    const create = useCallback(() => {
        const handleAdd = (res) => {
            if (res === 200) {
                message.success("Add user information successfully!");
            } else {
                message.error("Error when adding user information !");
            }
            props.onClose();
        };
        if (props.submitAdd === true) {
            props.createUser(domainInfo, (res) => handleAdd(res));
        }
        // eslint-disable-next-line
    },[props.submitAdd]);



    useEffect(() => {
        create();
    }, [create]);

    return (
        <Form
            form={props.form}
            name="basic"
            className="gx-signin-form gx-form-row0"
            fields={domainInfo}
            onFieldsChange={(changedFields, allFields) => {
                onChange(allFields);
            }}
            layout={"vertical"}
        >
            <Form.Item
                label="Email:"
                name="email"
                rules={[{ required: true, message: "Please input your email!",type: "email", }]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name:"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your first name",
                                },
                            ]}
                        >
                            <Input
                                placeholder="First Name"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your last name",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Last Name"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            <Row gutter={[16, 0]}>
                <Col span={12}>
                    <Form.Item
                        name="password"
                        label="Password:"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="retypePassword"
                        label="Retype Password:"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: "Please retype your password",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Retype Password" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="phone"
                label="Phone:"
                rules={[
                    {
                        required: false,
                        validator: (_, value) => {
                            if (!value || /^\d+$/.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Please input a valid phone number');
                        },
                    },
                ]}
            >
                <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Phone"
                />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[
                {
                    required: true,
                    message: "Your role is required",
                },
            ]}>
                <Checkbox.Group>
                        <Col>
                            <Checkbox value={ROLE_MANAGER} style={{ lineHeight: '32px' }}>
                                Manager
                            </Checkbox>
                            <Checkbox value={ROLE_INSPECTOR} style={{ lineHeight: '32px' }}>
                                Inspector
                            </Checkbox>
                        </Col>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                name="location"
                label="Location:"
                rules={[
                    {
                        required: false,
                        message: "Please input your location",
                    },
                ]}
            >
                <Input
                    prefix={<HomeOutlined />}
                    placeholder="Location"
                />
            </Form.Item>
        </Form>
    );
}

export default connect(mapStateToProps, { createUser })(CreateUser);