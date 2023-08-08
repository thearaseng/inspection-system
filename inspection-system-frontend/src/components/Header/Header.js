import React from "react";
import "./Header.css";
import {Navbar, Container, Nav} from "react-bootstrap";
import {Button, message} from "antd";
import {userSignOut} from "../../services/Auth";
import {useDispatch} from "react-redux";

export default function Header() {
    const dispatch = useDispatch();
    const onFinish = () => {
        dispatch(userSignOut(handleResult));
    };

    const handleResult = (res) => {
        console.log(res);
        if (res === 200) {
            message.success("Logout successfully!").then(r => {
            });

        } else {
            message.error("Logout Fail!").then(r => {
            });
        }
    };

    return (
        <div className="header">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Inspection</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav>

                    <Button className="d-flex" variant="outline-success" onClick={onFinish}>Logout</Button>
                </Container>
            </Navbar>
        </div>
    );
}
