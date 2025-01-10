import React, { useState, useEffect } from 'react';
import { Card, Select, Table, Layout, Typography, Spin, Dropdown } from 'antd';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const { Title } = Typography;
const { Header, Content } = Layout;

const TicketManager = () => {
    const [activeTickets, setActiveTickets] = useState([]);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateResult, setUpdateResult] = useState([]);
    const [approved, setApproved] = useState(1);

    useEffect(() => {
        // Fetch the list of students
        axios.get('http://localhost:9000/ticketmanager')
            .then(response => {
                setActiveTickets(response.data.data); // Adjust based on your API response structure
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    }, []);

    // function that is called to update the tickets.
    // Takes isApproved (boolean) based on if the instructor decided to approve or reject the ticket.
    // Calls ticketmanager/updateticket using isApproved. 
    function manageTickets(isApproved) {

        for(let i = 0; i < selectedTickets.length; i++) {
            axios.put('http://localhost:9000/ticketmanager/updateTicket', {attemptID: selectedTickets[i].attempt_id, approval: isApproved})
            .then(response => {
                setUpdateResult(response.json().data.success);
            })
            .catch(error => {
                console.error('Update failed.', error);
            });
        }

    }

    return (
        <>
            <Title level={3}>Ticket Manager</Title>
            <Content style={{ margin: '24px 16px 0' }}>
                <form>
                    <select style={{ display: "inline-block", paddingRight: "10px" }} value={approved} onChange={e => setApproved(e.target.value)}>
                        <option value={1}>Approve Selection</option>
                        <option value={0}>Reject Selection</option>
                    </select>
                    <span style={{display:"inline-block", paddingRight:"10px"}}>
                        <button onClick={(e) => {manageTickets(approved)}}>Go</button>
                    </span>
                </form>
                <p>Mode: {approved}</p>
                <p>Update Result: {updateResult}</p>


                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    {/* <Title level={4}>Active Tickets</Title> */}
                    {loading ? (
                        <Spin style={{ marginTop: 20 }} />
                    ) : (
                            <Card
                                title="Active Tickets"
                                style={{ margin: '24px 0' }}
                            >
                            <DataTable value={activeTickets} selectionMode={'checkbox'} selection={selectedTickets} 
                            onSelectionChange={(e) => setSelectedTickets(e.value)} dataKey="attempt_id" 
                            tableStyle={{ minWidth: '60rem', border:'2px', borderRadius:'15px'}}>
                                <Column selectionMode="multiple" 
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', borderTopLeftRadius:'15px', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                {/* <Column field="attempt_id" header="Attempt ID" 
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column> */}
                                <Column field="username" header="Username"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="timestamp" header="Timestamp"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="test_result" header="Test Result" 
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="reason_failed" header="Reason Failed"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="sample_code" header="Code Sample"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{fontFamily:'consolas', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="code_description" header="Code Description" 
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="user_description" header="User Description"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="llm_code" header="LLM Code"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px'}}
                                bodyStyle={{fontFamily:'consolas', paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                                <Column field="ticket_comment" header="Ticket Comment"
                                headerStyle={{ width: '3rem', paddingLeft:'25px', paddingRight:'25px', paddingTop:'15px', paddingBottom:'15px', backgroundColor:'#e6e6e6', fontSize:'15px', borderTopRightRadius:'15px', }}
                                bodyStyle={{paddingLeft:'25px', paddingTop:'15px', paddingBottom:'15px', borderTop:'solid', borderTopColor:'lightgray', borderTopWidth:'1px'}}>
                                </Column>
                            </DataTable>

                            </Card>
                    )}
                </div>
            </Content >
        </>
    );
};

export default TicketManager;
