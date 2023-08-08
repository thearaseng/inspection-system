import Header from "../../components/Header/Header";
import {Col} from "antd";
import Cookies from 'js-cookie';
import {ROLE_ADMIN} from "../../constants/Security";

function Home() {

    const authorities = JSON.parse(Cookies.get("role"));
    if (authorities.includes(ROLE_ADMIN)) {
        return (

            <Col>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Manager</div>
                        </div>
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Inspector</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Task</div>
                        </div>
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Report</div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    } else if (authorities.includes(ROLE_ADMIN)) {
        return (
            <Col>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Task</div>
                        </div>
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Inspector</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 p-5">
                            <div className="col-12 rounded bg-info p-5">Report</div>
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
                            <div className="col-12 rounded bg-info p-5">Task</div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    }
}

export default Home;