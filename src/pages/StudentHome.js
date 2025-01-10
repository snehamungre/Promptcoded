import React, { useEffect, useState } from 'react';
import { useAuth } from './hooks/AuthProvider';
import { Card, Progress, Table, Typography, Row, Col, Tabs, Tag, Spin } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const fetchStudentMetrics = async (username) => {
    try {
        const response = await axios.get(`http://localhost:9000/metrics/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student metrics:', error);
        throw error;
    }
};

const StudentHome = ({ user = '', inInstructorHome = false }) => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);


    const auth = useAuth();

    var username = auth.user;
    //assign username based on if loading from instructor page or Student dash
    if (inInstructorHome) { username = user };


    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const data = await fetchStudentMetrics(username);
                setMetrics(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading metrics:', error);
                setLoading(false);
            }
        };

        loadMetrics();
    }, [username]);

    if (loading) {
        return <Spin />;
    }

    if (!metrics) {
        return <div>No data available</div>;
    }

    var { totalAttempts, passedQuestions, totalQuestions, passGrade } = metrics;

    // Extract values from the JSON metrics
    totalAttempts = metrics.totalAttempts["COUNT(DISTINCT code_sample_id)"] || 0;
    passedQuestions = metrics.passedQuestions["passed_questions"] || 0;
    totalQuestions = metrics.totalQuestions.data["COUNT(*)"] || 0;

    // Calculate progress percentages while ensuring no divisions by 0
    const progressPassedTotalPercent = (totalQuestions > 0) ? (passedQuestions / totalQuestions) * 100 : 0;
    const progressAttemptedPercent = (totalAttempts / totalQuestions) * 100;
    const progressPassedAttemptedPercent = (totalAttempts > 0) ? (passedQuestions / totalAttempts) * 100 : 0;



    const maxScoresColumns = [
        { title: 'Code Sample', dataIndex: 'code_sample_id', key: 'code_sample_id' },
        {
            title: 'Current Score', dataIndex: 'max_score', key: 'max_score', render: (text, record) => (
                record.max_score === null
                    ? <Tag color="red">Not Attempted</Tag>
                    : record.max_score === passGrade
                        ? <Tag color="green">Pass</Tag>
            : text
            )
        },
{
    title: 'Attempt Date', dataIndex: 'latest_attempt_date', key: 'latest_attempt_date'
}
    ];

const attemptsColumns = [
    { title: 'Code Sample', dataIndex: 'code_sample_id', key: 'code_sample_id' },
    {
        title: 'Date Attempted', dataIndex: 'timestamp', key: 'timestamp', render: (text) => text.split('T')[0], // Format the date
    },
    {
        title: 'Code Generated', dataIndex: 'llm_code', key: 'llm_code', render: (code) => (
            <Text code>{code}</Text>
        )
    },
    { title: 'Description Given', dataIndex: 'user_description', key: 'user_description' },
    { title: 'Score Achieved', dataIndex: 'test_result', key: 'test_result' }
];

return (
    <div>
        {!inInstructorHome && <Title level={3}>Welcome {username}</Title>}
        {!inInstructorHome && <Title level={4}>Student Dashboard</Title>}
        <Tabs
            defaultActiveKey="1"
            tabPosition="left">
            <Tabs.TabPane tab="Overview" key="1">
                <div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Total Questions Passed" bordered={true}>

                                <Progress type="circle" percent={progressPassedTotalPercent} format={() => `${passedQuestions}/${totalQuestions}`} steps={{
                                    count: totalQuestions,
                                    gap: 5,
                                }}
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={15} />

                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Questions Started" bordered={true}>
                                <Progress type="circle" percent={progressAttemptedPercent} format={() => `${totalAttempts}/${totalQuestions}`} strokeColor={twoColors} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Progress on Questions Attempted" bordered={true}>

                                <Progress type="circle" percent={progressPassedAttemptedPercent} format={() => `${passedQuestions}/${totalAttempts}`} strokeColor={twoColors} />

                            </Card>
                        </Col>
                    </Row>
                </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Questions attempted" key="2">
                <Card title={<span className="cardTitle">All Questions</span>}>
                    <Table
                        dataSource={metrics.maxScores}
                        columns={maxScoresColumns}
                        rowKey="attempt_id"
                        style={{ marginTop: 20 }}
                    />
                </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="All attempts" key="3">
                <Card title={<span className="cardTitle">All attempts</span>}>
                    <Table
                        dataSource={metrics.attempts.data}
                        columns={attemptsColumns}
                        rowKey="attempt_id"
                        style={{ marginTop: 20 }}
                    />
                </Card>
            </Tabs.TabPane>
        </Tabs>
    </div>
);
};

export default StudentHome;
