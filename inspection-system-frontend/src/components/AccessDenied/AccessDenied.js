import React from "react";
import {Col, Row} from "antd";
import {Link, useNavigate} from "react-router-dom";

export default function AccessDenied() {
    useNavigate();
    return <div className="center-container">
        <Row justify="center" align="middle" className="vertical-center" style={{ display: "flex" }}>
            <Col>
                You are logged. Please go to <Link to={"/"}>Home Page</Link>
            </Col>
        </Row>

    </div>
}
