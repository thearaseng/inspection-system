import {Button, Col, Form, Input, message, Row} from "antd";
import {useDispatch} from "react-redux";
import {userSignIn} from "../../services/Auth";
import Cookies from "js-cookie";


function Login(props) {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(userSignIn(values, handleResult));
    };

    const handleResult = (res) => {
        // if (res === 200) {
        //     message.success("Login successfully !");
        //     console.log("login success");
        //     if (Cookies.get("role") === "admin") {
        //         props.history.push("/department-config");
        //         window.location.reload();
        //     } else {
        //         props.history.push("/provider");
        //         window.location.reload();
        //     }
        // } else if (res === 1000) {
        //     message.error("Your account isn't actived ! Please active your account");
        // } else if (res === 1007) {
        //     message.error("Incorrect email or password!");
        // } else if (res === 500) {
        //     message.error("Server busy ! Please try again !");
        // } else {
        //     message.error("Login failed ! Please try again !");
        //     console.log("login fail");
        // }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Row>
            <Col span={8}/>
            <Col span={8}>
                <Form
                    style={{
                        marginTop: "100px"
                    }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
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