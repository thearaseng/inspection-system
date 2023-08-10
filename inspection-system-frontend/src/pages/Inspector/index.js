import React, {useEffect, useState} from "react";
import {Button, Col, Form, message, Modal, Row, Space, Table} from "antd";
import Header from "../../components/Header/Header";
import {PlusCircleOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {fireInspector, getHireInspector} from "../../services/User";
import CreateInspector from "./components/CreateInspector";

const mapStateToProps = () => ({});
const confirm = Modal.confirm;
const Inspector = (props)=> {
    const [isAdd, setIsAdd] = useState(false);
    const [submitAdd, setSubmitAdd] = useState(false);
    const [addForm] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const columns = [
        {
            title: "ID",
            width: "5%",
            render: (text, record) => dataSource.indexOf(record) + 1,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },

        {
            title: "Actions",
            key: "action",
            render: (text, record) => (
                <Space
                    size="large"
                >
                    <Space size="large" style={{ alignItems: "center" }}>
              <span className="gx-link" onClick={() => confirmDelete(record)}>
                <Button
                    style={{
                        width: "80px",
                        height: "35px",
                        margin: "auto",
                    }}
                    type={"primary"}
                   danger
                >
                  Fire
                </Button>
              </span>
                    </Space>
                </Space>
            ),
        },
    ];

    const onClose = () => {

        if (submitAdd) {
            fetchUsers();
        }
        setSubmitAdd(false);
        setIsAdd(false);
        addForm.resetFields();
    };

    const fetchUsers = () =>  props.getHireInspector(
        { page: tableParams.pagination.current - 1, pageSize: tableParams.pagination.pageSize },
        (code, res) => handleResult(code, res)
    );
    const handleResult = (code, res) => {
        if (code === 200) {
            console.log(res);
            setDataSource(res.content);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.totalElements,
                },
            });
        } else {
            console.log(code);
            message.error("Error when getting domain information!");
        }
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    const confirmDelete = (record) => {
        confirm({
            title: "Do you want to delete this user ?",
            content: "If you agree, please click OK ",
            onOk() {
                props.fireInspector(record.id, (code) => {
                    if (code === 200) {
                        message.success("Delete App Successfully !").then(r => fetchUsers());

                    } else {
                        message.error("Error when deleting app !").then(r => onClose());
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
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
            <div>
                <Row
                    // justify="space-between"
                    style={{ margin: "15px" }}
                >
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <h4
                            className="gx-font-weight-semi-bold gx-mb-3"
                            style={{ color: "#274679" }}
                        >
                            Inspector
                        </h4>
                    </Col>
                    <Col
                        xs={11}
                        sm={11}
                        md={4}
                        lg={4}
                        xl={4}
                        xxl={3}
                        className="gx-order-lg-1 gx-order-md-1"
                        style={{ marginRight: "0px" }}
                    >
                        <Button
                            type="default"
                            icon={<PlusCircleOutlined />}
                            style={{ display: 'flex', alignItems: 'center', margin: '20px'}}
                            onClick={() => setIsAdd(true)}
                        >
                            Hire Inspector
                        </Button>

                    </Col>
                    <Col
                        xs={13}
                        sm={13}
                        md={7}
                        lg={7}
                        xl={6}
                        xxl={6}
                        className="gx-order-lg-3  gx-order-md-3"
                    >
                    </Col>
                    <Col
                        xs={0}
                        sm={0}
                        md={1}
                        lg={4}
                        xl={6}
                        xxl={7}
                        className="gx-order-lg-2 gx-order-md-2"
                    ></Col>
                </Row>
                <div
                    className="gx-card"
                    key="card"
                >
                    <Table
                        className="gx-table-responsive"
                        key="table"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={tableParams.pagination}
                        onChange={handleTableChange}
                        rowKey="id"
                        style={{
                            border: "none",
                            borderRadius: "10px",
                            minHeight: "360px",
                        }}
                    />
                    <br />

                    {isAdd && (
                        <Modal
                            maskClosable={false}
                            title="Hire new inspector"
                            width={720}
                            wrapClassName="vertical-center-modal"
                            open={isAdd}
                            onOk={() => handleOk()}
                            onCancel={() => setIsAdd(false)}
                        >
                            <CreateInspector
                                submitAdd={submitAdd}
                                onClose={onClose}
                                form={addForm}
                            />
                        </Modal>
                    )}
                </div>
            </div>


        </div>
    );
}

export default connect(mapStateToProps, {
    getHireInspector,
    fireInspector
})(Inspector);