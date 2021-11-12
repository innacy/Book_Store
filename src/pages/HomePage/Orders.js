import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Moment from 'moment';

import TableView from './Table';
import './styles.scss';

const columns = () => [
    {
        Header: 'Order ID',
        accessor: 'orderId',
    },
    {
        Header: 'Buyer email',
        accessor: 'email',
    },
    {
        Header: 'Book name',
        accessor: 'book',
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
    },
    {
        Header: 'Order date/Time',
        accessor: 'date',
        Cell : ({ value }) => Moment(value).format('MMMM Do YYYY, h:mm:ss a'),
    },
    {
        Header: 'Total amount',
        accessor: 'amount',
    },
];

const Orders = props => {
    const { userType, userName } = props;

    const data = userType !== 'Admin' ? props.data?.filter(order => order.name === userName) : props.data;
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");

    const onSearch = (e) => {
        e.preventDefault();
        if(search !== ''){
            const filteredBooks = data?.filter(book => {
                return (
                    book
                    .book
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
                });
            setFilteredData(filteredBooks);
            return;
        }
        setFilteredData([]);
        // forceUpdate();
    };


    return (
        <>
        <Row style={{marginBottom: '20px'}}>
            <Col span={2}>
                <h3 style={{color: '#891dd0'}}>Total Orders ({data.length})</h3>
            </Col>
            <Col span={6}>
                <input
                    className="search-bar"
                    type="text"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="search book"
                />
                <Button style={{color: '#891dd0'}} onClick={onSearch}>
                    <SearchOutlined />
                </Button>
            </Col>
            <Col span={16}>
            </Col>
        </Row>
        <br />
        <TableView
            data={!!filteredData.length ? filteredData : data}
            columns={columns()}
        />
        </>
    )
}

export default Orders;