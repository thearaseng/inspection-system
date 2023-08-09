import React from "react";
import {Divider, Row} from "antd";
import {Link} from "react-router-dom";

export default function AccessDenied() {
    return <Row>
        <Divider>You are not allowed to access this link. Please go to  <Link href="/">HomePage</Link></Divider>
    </Row>;
}
