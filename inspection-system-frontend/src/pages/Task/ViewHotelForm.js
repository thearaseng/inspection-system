import React, {useEffect, useState} from "react";
import {Form, Input, InputNumber} from "antd";
import { connect } from "react-redux";

const mapStateToProps = () => ({});
const ViewHotelForm = (props) => {
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const [domainInfo, setDomainInfo] = useState([]);

    useEffect(() => {
        setDomainInfo([
            {
                name: ["taskId"],
                value: props.selectedObj.id,
            },
            {
                name: ["formType"],
                value: props.selectedObj.formType,
            },
            {
                name: ["hotelName"],
                value: props.selectedObj.form?.hotelName ?? "",
            },
            {
                name: ["numberOfRooms"],
                value: props.selectedObj.form?.numberOfRooms ?? "",
            },
            {
                name: ["numberOfEmployees"],
                value: props.selectedObj.form?.numberOfEmployees ?? "",
            },
            {
                name: ["cleanlinessScore"],
                value: props.selectedObj.form?.cleanlinessScore ?? "",
            },
            {
                name: ["fireSafetyCompliance"],
                value: props.selectedObj.form?.fireSafetyCompliance ?? "",
            },
            {
                name: ["roomServiceQuality"],
                value: props.selectedObj.form?.roomServiceQuality ?? "",
            },
        ]);
        // eslint-disable-next-line
    }, []);

    return (
        <Form name="inspectionForm" onFinish={onFinish}
              fields={domainInfo}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 8 }}>
            <Form.Item name="taskId" label="Task ID">
                <Input disabled />
            </Form.Item>
            <Form.Item name="formType" label="Form Type">
                <Input disabled />
            </Form.Item>
            <Form.Item name="hotelName" label="Hotel Name">
                <Input disabled/>
            </Form.Item>
            <Form.Item name="numberOfRooms" label="Number of Rooms">
                <InputNumber min={1} disabled/>
            </Form.Item>
            <Form.Item name="numberOfEmployees" label="Number of Employees">
                <InputNumber min={1} disabled/>
            </Form.Item>
            <Form.Item name="cleanlinessScore" label="Cleanliness Score">
                <InputNumber min={0} disabled/>
            </Form.Item>
            <Form.Item name="fireSafetyCompliance" label="Fire Safety Compliance">
                <InputNumber min={0} disabled/>
            </Form.Item>
            <Form.Item name="roomServiceQuality" label="Room Service Quality">
                <InputNumber min={0} disabled/>
            </Form.Item>
        </Form>
    );

}

export default connect(mapStateToProps, {})(ViewHotelForm);