import React, {useState} from "react";
import {Button, Form, Input, Space} from "antd";
import { connect } from "react-redux";
import {getHireInspector} from "../../../../services/User";
import {createTask} from "../../../../services/Task";
import {DeleteOutlined} from "@ant-design/icons";

const mapStateToProps = () => ({});
const CreateForm = (props) => {
    const [fields, setFields] = useState([{}]);
    const handleAddField = () => {
        setFields([...fields, {}]);
    };
    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
        <Form form={props.form} onFinish={onFinish} layout={"vertical"}>
            {fields.map((field, index) => (
                <Space key={index} style={{ marginBottom: 8 }}>
                        <Form.Item
                            name={`description[${index}]`}
                            label="Description"
                            rules={[{ required: true, message: 'Please enter description' }]}
                        >
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Form.Item
                            name={`width[${index}]`}
                            style={{ marginLeft:'8px'}}
                            label="Width"
                            rules={[{ required: true, message: 'Please enter width' }]}
                        >
                            <Input type="number" placeholder="Width"/>
                        </Form.Item>
                        <Form.Item
                            name={`height[${index}]`}
                            style={{ marginLeft:'8px'}}
                            label="Height"
                            rules={[{ required: true, message: 'Please enter height' }]}
                        >
                            <Input type="number" placeholder="Height"/>
                        </Form.Item>
                        <Form.Item
                            name={`total[${index}]`}
                            label="Total Lead"
                            style={{marginLeft:'8px'}}
                            rules={[{ required: true, message: 'Please enter total' }]}
                        >
                            <Input type="number" placeholder="Total"/>
                        </Form.Item>
                        {index > 0 && (

                            <Button style={{marginTop:"8px", marginLeft:"4px"}} type="primary" shape="circle" icon={<DeleteOutlined />} danger onClick={() => handleRemoveField(index)}/>
                        )}
                </Space>
            ))}

            <Form.Item>
                <Button type="dashed" onClick={handleAddField}>
                    Add More Field
                </Button>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

}

export default connect(mapStateToProps, { getHireInspector, createTask})(CreateForm);