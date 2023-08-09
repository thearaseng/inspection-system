import {Card} from "antd";

const StatusCard = ({ title, count }) => {
    return (
        <Card title={title} style={{ width: 300, margin: '16px' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                {count}
            </p>
        </Card>
    );
};