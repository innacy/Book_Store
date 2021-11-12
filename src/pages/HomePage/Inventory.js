import React, { useState } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import BookInfo from './BookInfo';
import './styles.scss';

const InventoryPage = props => {
    const { userType, userName, data, setData, handleSave, handleOrder, handleDelete} = props;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };    
    const handleCancel = () => {
        setFormValue({
            title: "",
            author: "",
            description: "",
            price: 100,
            image: "",
        });
        setIsModalVisible(false);
    };

    const [formValue, setFormValue] = useState({
        title: "",
        author: "",
        description: "",
        price: 100,
        image: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
            ...prevState,
            [name]: value,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setData(prevState => [
            ...prevState,
            {
                ...formValue,
                available: 1,
                image: !!formValue.image ? formValue.image : "../../images/book.png",
            }
        ]);
        setIsModalVisible(false);
    };

    const onSearch = (e) => {
        e.preventDefault();
        if(search !== ''){
            const filteredBooks = data.filter(book => {
                return (
                    book
                    .title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
                });
            setFilteredData(filteredBooks);
            return;
        }
        setFilteredData([]);
        // forceUpdate();
    }

    const { title, author, description, price, image } = formValue;

    return (
        <>
        <Row style={{marginBottom: '20px'}}>
            <Col span={2}>
                <h3 style={{color: '#891dd0'}}>Books</h3>
            </Col>
            <Col span={6}>
                <input
                    className="search-bar"
                    type="text"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="search"
                />
                <Button style={{color: '#891dd0'}} onClick={onSearch}>
                    <SearchOutlined />
                </Button>
            </Col>
            <Col span={12}>
            </Col>
            <Col span={4}>
                {userType === 'Admin' &&
                <Button style={{float: 'right'}} onClick={showModal}>
                    <PlusOutlined />
                    Add Book
                </Button>
                }
                <Modal title="Add Book" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                    <form className="add-book-form">
                        <Row>
                            <Col span={6}>
                                <span>Title</span>
                            </Col>
                            <Col span={2}>
                            </Col>
                            <Col span={16}>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    value={title}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <span>Author name</span>
                            </Col>
                            <Col span={2}>
                            </Col>
                            <Col span={16}>
                                <input
                                    type="text"
                                    name="author"
                                    onChange={handleChange}
                                    value={author}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <span>Description</span>
                            </Col>
                            <Col span={2}>
                            </Col>
                            <Col span={16}>
                                <textarea
                                    rows="5"
                                    name="description"
                                    onChange={handleChange}
                                    value={description}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <span>Price</span>
                            </Col>
                            <Col span={2}>
                            </Col>
                            <Col span={16}>
                                <input
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    value={price}
                                    min="100"
                                    step="100"
                                    max="10000"
                                />  
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <span>Image</span>
                            </Col>
                            <Col span={2}>
                            </Col>
                            <Col span={16}>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    value={image}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Button disabled={!(!!title && !!author && !!description && !!price)} onClick={handleSubmit}>
                            Add
                        </Button>
                    </form>
                </Modal>
            </Col>
            </Row>
            <br />
            {data?.length !== 0 ? (
                <div className="all-books">
                    {(!!filteredData.length ? filteredData : data).map(book => {
                        return (
                            <BookInfo 
                                key={book.title} 
                                userType={userType}
                                userName={userName}
                                data={book} 
                                handleSave={handleSave}
                                handleOrder={handleOrder}
                                handleDelete={handleDelete}
                            />
                    )})}
                </div>
            ) : (
                <div style={{textAlign: 'center'}}>
                    Sorry, No books available!
                </div>
            )}
            </>
    );
}

export default InventoryPage;