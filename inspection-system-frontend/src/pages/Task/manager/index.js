import React, {useEffect, useState} from "react";
import {Button, Col, Form, message, Modal, Row, Table, Tag} from "antd";
import Header from "../../../components/Header/Header";
import {connect} from "react-redux";
import {getTasksByManager} from "../../../services/Task";
import {PlusCircleOutlined} from "@ant-design/icons";
import CreateTask from "./components/CreateTask";

const mapStateToProps = () => ({});
const ManagerTask = (props)=> {
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

    const statusColors = {
        CREATED: 'blue',
        DONE: 'green',
        IN_PROGRESS: 'purple',
    };

    const columns = [
        {
            title: "ID",
            width: "5%",
            render: (text, record) => dataSource.indexOf(record) + 1,
        },
        {
            title: "Inspector",
            dataIndex: "inspector",
            key: "inspector",
            render: (_, { inspector }) => {
                return (<div>
                    {inspector.firstName} {inspector.lastName}
                </div>)
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Type",
            dataIndex: "formType",
            key: "formType",
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (_, { dueDate }) => {
                let date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
                    .format(dueDate * 1000);
                return (<div>
                    {date}
                </div>)
            },
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, { status }) => (
                <Tag key={status} color={statusColors[status]}>
                    {status}
                </Tag>
            ),
        },
    ];

    const fetchData = () => {
        props.getTasksByManager(
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
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            } else {
                console.log(code);
                message.error("Error when getting domain information!");
            }
        };
    }

    const handleOk = async () => {
        try {
            await addForm.validateFields(); // Validate form fields
            // All fields are valid, so you can proceed with submitting
            setSubmitAdd(true);
        } catch (error) {
            // Validation failed
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [JSON.stringify(tableParams)]);

    const onClose = () => {
        if (submitAdd === true) {
            fetchData();
        }
        setSubmitAdd(false);
        // setSubmitUpdate(false);
        setIsAdd(false);
        addForm.resetFields();
        // setIsEdit(false);
    };

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
                            Task
                        </h4>
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
                        <Button
                            type="default"
                            icon={<PlusCircleOutlined />}
                            style={{ display: 'flex', alignItems: 'center', margin: '20px'}}
                            onClick={() => setIsAdd(true)}
                        >
                            Add
                        </Button>
                    </Col>
                    <Col
                        xs={0}
                        sm={0}
                        md={1}
                        lg={4}
                        xl={6}
                        xxl={7}
                        className="gx-order-lg-2 gx-order-md-2"
                    >

                    </Col>
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
                            title="Add new user"
                            width={720}
                            wrapClassName="vertical-center-modal"
                            open={isAdd}
                            onOk={() => handleOk()}
                            onCancel={() => setIsAdd(false)}
                        >
                            <CreateTask
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
    getTasksByManager
})(ManagerTask);