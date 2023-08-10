import Header from "../../components/Header/Header";
import {Col} from "antd";
import Cookies from 'js-cookie';
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants/Security";
import {useNavigate} from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const authorities = JSON.parse(Cookies.get("role"));
    if (authorities.includes(ROLE_ADMIN)) {
        return (
            <Col>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/user")}>User</div>
                        </div>
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/admin/task")}>Task</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 p-5" >
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/report")}>Report</div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    } else if (authorities.includes(ROLE_MANAGER)) {
        return (
            <Col>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/manager/task")}>Task</div>
                        </div>
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/inspector")}>Inspector</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 p-5 ">
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/report")}>Report</div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    } else {
        return (
            <Col>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5 pointer-cursor" onClick={() => navigate("/task")}>Task</div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    }
}

export default Home;