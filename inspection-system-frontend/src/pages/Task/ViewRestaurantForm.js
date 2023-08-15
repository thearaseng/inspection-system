import React, {useEffect, useState} from "react";
import {Form, Input, InputNumber} from "antd";
import { connect } from "react-redux";

const mapStateToProps = () => ({});
const ViewRestaurantForm = (props) => {
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
                name: ["restaurantName"],
                value: props.selectedObj.form?.restaurantName ?? "",
            },
            {
                name: ["seatingCapacity"],
                value: props.selectedObj.form?.seatingCapacity ?? "",
            },
            {
                name: ["kitchenHygiene"],
                value: props.selectedObj.form?.kitchenHygiene ?? "",
            },
            {
                name: ["foodSafetyCompliance"],
                value: props.selectedObj.form?.foodSafetyCompliance ?? "",
            },
            {
                name: ["serviceQuality"],
                value: props.selectedObj.form?.serviceQuality ?? "",
            },
            {
                name: ["customerSatisfaction"],
                value: props.selectedObj.form?.customerSatisfaction ?? "",
            },
            {
                name: ["healthInspectionScore"],
                value: props.selectedObj.form?.healthInspectionScore ?? "",
            },
        ]);
        // eslint-disable-next-line
    }, []);
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

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
            <Form.Item name="restaurantName" label="Restaurant Name">
                <Input disabled/>
            </Form.Item>
            <Form.Item name="seatingCapacity" label="Seating Capacity">
                <InputNumber min={1} disabled/>
            </Form.Item>
            <Form.Item name="kitchenHygiene" label="Kitchen Hygiene">
                <InputNumber min={1} disabled/>
            </Form.Item>
            <Form.Item name="foodSafetyCompliance" label="Food Safety Compliance">
                <InputNumber min={0} disabled/>
            </Form.Item>
            <Form.Item name="serviceQuality" label="Service Quality">
                <InputNumber min={0} disabled/>
            </Form.Item>
            <Form.Item name="customerSatisfaction" label="Customer Satisfaction">
                <InputNumber min={0} disabled/>
            </Form.Item>
            <Form.Item name="healthInspectionScore" label="Health Inspection Score">
                <InputNumber min={0} disabled/>
            </Form.Item>
        </Form>
    );

}

export default connect(mapStateToProps, {})(ViewRestaurantForm);