import React, {useState, useEffect, useCallback} from "react";
import {Form, message, Select} from "antd";
import { connect } from "react-redux";
import {getAvailableInspector, hireInspector} from "../../../services/User";

const mapStateToProps = () => ({});
const { Option } = Select;

const CreateInspector = (props) => {

    const [domainInfo, setDomainInfo] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [max, setMax] = useState(0);

    const onChange = (newFields) => {
        console.log(newFields);
        setDomainInfo(newFields);
    };

    const fetchAvailableInspectors = () => {
        if (loading || options.length >= max) {
            return;
        }
        setLoading(true);
        props.getAvailableInspector(
            { page: page},
            (code, res) => handleResult(code, res)
        );
        const handleResult = (code, res) => {
            if (code === 200) {
                console.log(res);
                const newOptions = res.content.map(item => (
                    <Option key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                    </Option>
                ));
                setOptions(prevOptions => [...prevOptions, ...newOptions]);
                setPage(prevPage => prevPage + 1);
            } else {
                console.log(code);
                message.error("Error when getting data information!");
            }
            setLoading(false)
        };
    }

    const handlePopupScroll = e => {
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
            fetchAvailableInspectors();
        }
    };

    const create = useCallback(() => {
        const handleAdd = (res) => {
            if (res === 200) {
                message.success("Add user information successfully!");
            } else {
                message.error("Error when adding user information !");
            }
            props.onClose()
        };
        if (props.submitAdd === true) {
            props.hireInspector(domainInfo, (res) => handleAdd(res));
        }
        // eslint-disable-next-line
    },[props]);


    useEffect(() => {
        setLoading(true);
        props.getAvailableInspector(
            { page: page},
            (code, res) => handleResult(code, res)
        );
        const handleResult = (code, res) => {
            if (code === 200) {
                console.log(res);
                setMax(res.totalElements);
                const newOptions = res.content.map(item => (
                    <Option key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                    </Option>
                ));
                setOptions(prevOptions => [...prevOptions, ...newOptions]);
                setPage(prevPage => prevPage + 1);
            } else {
                console.log(code);
                message.error("Error when getting data information!");
            }
            setLoading(false)
        };

        // eslint-disable-next-line
    }, []);

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
                label="Inspector:"
                name="inspectorId"
                rules={[{ required: true, message: "Please input your inspector!", }]}
            >

                <Select style={{ width: '100%' }}
                        placeholder="Select items"
                        loading={loading}
                        onPopupScroll={handlePopupScroll}
                        virtual>
                    {options}
                </Select>
            </Form.Item>
        </Form>
    );
}

export default connect(mapStateToProps, { getAvailableInspector, hireInspector})(CreateInspector);