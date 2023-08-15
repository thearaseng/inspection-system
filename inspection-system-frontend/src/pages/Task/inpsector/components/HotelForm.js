import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, InputNumber, message} from "antd";
import { connect } from "react-redux";
import {createHotelForm} from "../../../../services/Form";

const mapStateToProps = () => ({});
const HotelForm = (props) => {
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const onChange = (newFields) => {
        setDomainInfo(newFields);
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
            props.createHotelForm(domainInfo, props.isSubmit,(res) => handleAdd(res));
        }
        // eslint-disable-next-line
    },[props.submitAdd]);



    useEffect(() => {
        create();
    }, [create]);

    return (
        <Form name="inspectionForm" onFinish={onFinish}
              onFieldsChange={(changedFields, allFields) => {
                  onChange(allFields);
              }}
              form={props.form}
              fields={domainInfo}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 8 }}>
            <Form.Item name="taskId" label="Task ID">
                <Input disabled />
            </Form.Item>
            <Form.Item name="formType" label="Form Type">
                <Input disabled />
            </Form.Item>
            <Form.Item name="hotelName" label="Hotel Name" rules={[
                {
                    required: true,
                    message: "Please input your Hotel Name",
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item name="numberOfRooms" label="Number of Rooms" rules={[
                {
                    required: true,
                    message: "Please input a valid room",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="numberOfEmployees" label="Number of Employees" rules={[
                {
                    required: true,
                    message: "Please input valid employees",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="cleanlinessScore" label="Cleanliness Score" rules={[
                {
                    required: true,
                    message: "Please input valid score",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="fireSafetyCompliance" label="Fire Safety Compliance" rules={[
                {
                    required: true,
                    message: "Please input valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="roomServiceQuality" label="Room Service Quality" rules={[
                {
                    required: true,
                    message: "Please input valid number",
                    pattern: new RegExp(/^[0-9]+$/)
                },
            ]}>
                <InputNumber min={0} />
            </Form.Item>
        </Form>
    );

}

export default connect(mapStateToProps, {createHotelForm})(HotelForm);