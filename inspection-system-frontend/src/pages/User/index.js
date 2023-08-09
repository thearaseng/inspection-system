import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import Header from "../../components/Header/Header";
import CreateUser from "./components/CreateUser";
import {PlusCircleOutlined} from "@ant-design/icons";
import {connect} from "react-redux";

const mapStateToProps = () => ({});
const User = (props)=> {
    const [isAdd, setIsAdd] = useState(false);
    const [submitAdd, setSubmitAdd] = useState(false);
    const [addForm] = Form.useForm();
    // const [isFetch, setIsFetch] = useState(false);

    const onClose = () => {
        setSubmitAdd(false);
        // setSubmitUpdate(false);
        setIsAdd(false);
        // setIsEdit(false);
        // setIsFetch(false);
    };

    const onIsFetch = (isFetch) => {
        // setIsFetch(isFetch);
    };

    const handleOk = async () => {
        try {
            await addForm.validateFields(); // Validate form fields
            // All fields are valid, so you can proceed with submitting
            setSubmitAdd(true);
        } catch (error) {
            // Validation failed
        }
    };

    return (
        <div>
            <Header/>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    style={{ display: 'flex', alignItems: 'center', margin: '20px'}}
                    onClick={() => setIsAdd(true)}
                >
                    Add
                </Button>
            {isAdd && (
                <Modal
                    maskClosable={false}
                    title="Add new user"
                    width={720}
                    wrapClassName="vertical-center-modal"
                    open={isAdd}
                    onOk={() => handleOk()}
                    onCancel={() => setIsAdd(false)}
                >
                    <CreateUser
                        submitAdd={submitAdd}
                        onClose={onClose}
                        onIsFetch={onIsFetch}
                        form={addForm}
                    />
                </Modal>
            )}
        </div>
    );
}

export default connect(mapStateToProps, {})(User);