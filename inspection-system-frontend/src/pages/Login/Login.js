import {Button, Col, Divider, Form, Input, message, Row, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {userSignIn} from "../../services/Auth";
import {useNavigate} from "react-router-dom";

const { Link } = Typography;
function Login(props) {
    const {token} = useSelector(({auth}) => auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(userSignIn(values, handleResult));
    };

    const handleResult = (res) => {
        console.log(res);
        if (res === 200) {
            message.success("Login successfully !").then(r => {
                navigate("/");
            });

        } else {
            message.error("Incorrect email or password!").then(r => {
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (token != null) {
        return (
            <Row>
                <Divider>You are logged. Please go to  <Link href="/">HomePage</Link></Divider>
            </Row>
        );
    }


    return (
        <Row>
            <Col span={8}/>
            <Col span={8}>
                <Form
                    style={{
                        marginTop: "100px"
                    }}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}/>
        </Row>
    );
}

export default Login;