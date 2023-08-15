import React, {useEffect, useState} from "react";
import {Card, Col, message} from "antd";
import Header from "../../components/Header/Header";
import {connect, useSelector} from "react-redux";
import {getTasks, getTasksByManager} from "../../services/Task";
import {getHireInspector, getUsers} from "../../services/User";

const mapStateToProps = () => ({});
const Report = (props) => {
    const [users, setUsers] = useState(0);
    const {token, role} = useSelector(({auth}) => auth);
    const arrayRole = JSON.parse(role);
    const [tasks, setTasks] = useState(0);
    const fetchTasksForManager = (props) => {
        props.getTasksByManager(
            { page: 0, pageSize: 10 },
            (code, res) => handleResult(code, res)
        );
        const handleResult = (code, res) => {
            if (code === 200) {
                console.log(res);
                setTasks(res.totalElements);

            } else {
                console.log(code);
                message.error("Error when getting domain information!");
            }
        };
    }

    const fetchTasksForAdmin = () => {
        props.getTasks(
            { page: 0, pageSize: 10 },
            (code, res) => handleResult(code, res)
        );
        const handleResult = (code, res) => {
            if (code === 200) {
                console.log(res);
                setTasks(res.totalElements);

            } else {
                console.log(code);
                message.error("Error when getting domain information!");
            }
        };
    }

    const fetchUsersByAdmin = () =>  {
        props.getUsers(
            { page: 0, pageSize: 10 },
            (code, res) => handleResult(code, res)
        );

        const handleResult = (code, res) => {
            if (code === 200) {
                console.log(res);
                setUsers(res.totalElements)
            } else {
                console.log(code);
                message.error("Error when getting domain information!");
            }
        };
    }

    const fetchUsersByManager = () =>  {
        props.getHireInspector(
            { page: 0, pageSize: 10 },
            (code, res) => handleResult(code, res)
        );

        const handleResult = (code, res) => {
            if (code === 200) {
                console.log(res);
                setUsers(res.totalElements)
            } else {
                console.log(code);
                message.error("Error when getting domain information!");
            }
        };
    }



    useEffect(() => {
        if (token != null) {
            let isAdmin = false;
            for (const element of arrayRole) {
                if ("ROLE_ADMIN".includes(element)) {
                    isAdmin = true;
                }
            }
            if (isAdmin) {
                fetchTasksForAdmin();
                fetchUsersByAdmin();
            } else {
                fetchTasksForManager(props);
                fetchUsersByManager();
            }
        }
        // eslint-disable-next-line
    }, []);


    return (
        <Col>
        <Header/>
            <Card title="Report">
                <p>Number of Users: {users}</p>
                <p>Number of Tasks: {tasks}</p>
            </Card>
        </Col>
    );
}
export default connect(mapStateToProps, {
    getTasksByManager,
    getTasks,
    getUsers,
    getHireInspector
})(Report);
