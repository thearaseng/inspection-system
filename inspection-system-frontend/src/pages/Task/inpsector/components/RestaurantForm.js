import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, InputNumber, message} from "antd";
import { connect } from "react-redux";
import {createRestaurantForm} from "../../../../services/Form";

const mapStateToProps = () => ({});
const RestaurantForm = (props) => {
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
            props.createRestaurantForm(domainInfo, props.isSubmit, (res) => handleAdd(res));
        }
        // eslint-disable-next-line
    },[props.submitAdd]);

    useEffect(() => {
        create();
    }, [create]);

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
              form={props.form}
              onFieldsChange={(changedFields, allFields) => {
                  onChange(allFields);
              }}
              fields={domainInfo}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 8 }}>
            <Form.Item name="taskId" label="Task ID">
                <Input disabled />
            </Form.Item>
            <Form.Item name="formType" label="Form Type">
                <Input disabled />
            </Form.Item>
            <Form.Item name="restaurantName" label="Restaurant Name" rules={[
                {
                    required: true,
                    message: "Please input your Restaurant Name",
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item name="seatingCapacity" label="Seating Capacity" rules={[
                {
                    required: true,
                    message: "Please input a valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="kitchenHygiene" label="Kitchen Hygiene" rules={[
                {
                    required: true,
                    message: "Please input a valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="foodSafetyCompliance" label="Food Safety Compliance" rules={[
                {
                    required: true,
                    message: "Please input a valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="serviceQuality" label="Service Quality" rules={[
                {
                    required: true,
                    message: "Please input a valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="customerSatisfaction" label="Customer Satisfaction" rules={[
                {
                    required: true,
                    message: "Please input a valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="healthInspectionScore" label="Health Inspection Score" rules={[
                {
                    required: true,
                    message: "Please input a valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
        </Form>
    );

}

export default connect(mapStateToProps, {createRestaurantForm})(RestaurantForm);