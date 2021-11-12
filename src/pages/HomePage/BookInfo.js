import React, { useState } from 'react';
import { Row, Col, Button as AntdButton, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

import './styles.scss';

const BookInfo = props => {
    const {
        data, 
        userType, 
        userName, 
        handleSave, 
        handleOrder, 
        handleDelete,
    } = props;
    const [ available, setAvailable ] = useState(data.available);
    const [ quantity, setQuantity ] = useState(0);
    // console.log(data);

    const onChange = (event) => {
        const { name, value } = event.target;
        if (name === 'available') {
            setAvailable(value);
        } else {
            setQuantity(value);
        };
    };

    function onSave(event) {
        event.preventDefault();
        const updateData = {
            ...data,
            available: available,
        }
        return handleSave(updateData);
    };

    const onOrder = (event) => {
        event.preventDefault();
        const date = new Date();
        const orderData = {
            orderId: date.getTime(),
            name: userName,
            email: userName + '@abc.com',
            book: data.title,
            quantity: quantity,
            date: date,
            amount: data.price * quantity,
        }
        return handleOrder(orderData);
    };

    const onDelete = (event) => {
        event.preventDefault();
        return handleDelete(data);
    };

    return (
        <div className="single-book">
            <Row>
                <Col span={2}>
                    <div className="pic">
                        <img src={data.image}/>
                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={8}>
                    <span className="book-label">Book Title: </span>
                    <span className="book-detail">{data.title}</span>
                    <br />
                    <span className="book-label">Description: </span>
                    <span className="book-detail">{data.description}</span>
                </Col>
                <Col span={1}></Col>
                <Col span={3}>
                    <span className="book-label">Author Name: </span>
                    <span className="book-detail">{data.author}</span>
                    <br />
                    <span className="book-label">Price: </span>
                    <span className="book-detail">{data.price}</span>
                </Col>
                <Col span={3}></Col>
                <Col span={4}>
                    <span className="book-label">Available: </span>
                    <input
                        type="number"
                        name="available"
                        onChange={onChange}
                        value={available}
                        disabled={!(userType === 'Admin')}
                    />
                    <>
                        <button className="button-group" disabled={!(userType === 'Admin')} onClick={() => setAvailable(prevCount => prevCount + 1)}>
                            <PlusOutlined />
                        </button>
                        <button className="button-group" disabled={!(userType === 'Admin')} onClick={() => setAvailable(prevCount => prevCount - 1)}>
                            <MinusOutlined />
                        </button>
                    </>
                    <br />
                    <br />
                    {userType === 'User' && (
                        <>
                        <span className="book-label">Quantity : </span>
                        <input
                            type="number"
                            name="quantity"
                            onChange={onChange}
                            value={quantity}
                            min="1"
                        />
                        <>
                            <button className="button-group" onClick={() => setQuantity(prevCount => prevCount + 1)}>
                                <PlusOutlined />
                            </button>
                            <button className="button-group" onClick={() => setQuantity(prevCount => prevCount - 1)}>
                                <MinusOutlined />
                            </button>
                        </>
                        </>
                    )}
                </Col>
                <Col span={2}>
                    {userType === 'Admin' ? (
                        <>
                            <AntdButton disabled={!(available !== data.available)} onClick={onSave}>
                                Save
                            </AntdButton>
                            <br />
                            <Tooltip title="Remove Book">
                                <button style={{marginTop: '8px',marginLeft: '10%'}} className="button-group" onClick={onDelete}>
                                    <DeleteOutlined />
                                </button>
                            </Tooltip>
                        </>
                    ) : (
                        <AntdButton style={{marginTop: '15%'}} disabled={!(quantity !== 0)} onClick={onOrder}>
                            Order
                        </AntdButton>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default BookInfo;