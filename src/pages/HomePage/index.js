import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Modal, Tabs, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { booksData, orders } from '../../data/initialDetails';
import BookInfo from './BookInfo';
import Orders from './Orders';
import './styles.scss';

const { TabPane } = Tabs;

function callback(key) {
//   console.log(key, "Tab");
};

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function HomePage(props){
    const history = useHistory();
    const userType = !!localStorage.getItem('Type') ? 'Admin' : 'User';
    const userName = localStorage.getItem('User');
    // console.log("Logged in as", userType);

    const [data, setData] = useState(booksData);
    const orderData = orders;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [ refresh, setRefresh ] = useState(true);
    const forceUpdate = useForceUpdate();

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
                image: !!formValue.image ? formValue.image : "./images/book.jpg",
            }
        ]);
        setIsModalVisible(false);
        alert("New book added..!");
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
            if (filteredBooks.length === 0) {
                alert("No books found..!");
                setSearch("");
            };
            setFilteredData(filteredBooks);
            return;
        }
        setFilteredData([]);
        // forceUpdate();
    }

    const updateBookdata = values => {
        if (values.available < 0){
            alert("Available Quantity can't be negative..!");
        } else if (values.available === 0){
            alert("Can't update, Please remove the book..!");
        } else {
            const updatedData = data.map(book => {
                if(book.title === values.title) {
                    book.available = values.available;
                }
                return book;
            });
            setData(updatedData);
        }
        // console.log(data);
        // forceUpdate();
    };

    const removeBookdata = values => {
        const index = data.indexOf(values);
        if (index > -1) {
            data.splice(index, 1);
        }
        // console.log(data);
        forceUpdate();
    };

    const updateOrderdata = values => {
        setRefresh(false);
        const selectedBook = data.find(book => book.title === values.book);
        const {quantity} = values;
        const { available } = selectedBook;
        if (quantity < 0) {
            alert("Quantity can't be negative..!");
            return;
        } else if (quantity > available) {
            alert("Available Quantity is low..!");
            return;
        } else if (quantity === available) {
            const index = data.indexOf(data.find(book => book.title === values.book));
            if (index > -1) {
                data.splice(index, 1);
            };
        } else {
            const updatedData = data.map(book => {
                if(book.title === values.book) {
                    book.available = available - quantity;
                }
                return book;
            });
            setData(updatedData);
        }
        orderData.push(values);
        alert("Books Successfully ordered..!");
        setTimeout(() => {
            setRefresh(true);
        },500);
        // console.log(data);
        // console.log(orderData);
        // forceUpdate();
    };

    const logOut = () => {
        console.log("Logging Out");
        localStorage.removeItem('Type');
        localStorage.removeItem('User');
        return history.push("/");;
    };

    const { title, author, description, price, image } = formValue;

    return (
        <div className="top-container">
        <div style={{ margin: '10px' }}>
            <div style={{ display: 'flow-root', borderBottom: '3px solid #ff014e' }}>
                <h3 style={{float: 'left', color: '#891dd0'}}>Mr.{userName.charAt(0).toUpperCase() + userName.slice(1)} Dashboard</h3>
                <Button style={{float: 'right', color: '#891dd0', fontWeight: '500'}} onClick={logOut}>Log out</Button>
            </div>
            <div>
            <Tabs type="card" defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Inventory" key="inventory">
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
                                placeholder="Search book"
                            />
                            <Button style={{color: '#891dd0'}} onClick={onSearch}>
                                <SearchOutlined />
                            </Button>
                        </Col>
                        <Col span={12}>
                        </Col>
                        <Col span={4}>
                            {userType === 'Admin' &&
                            <Button style={{float: 'right', color: '#891dd0', fontWeight: '500'}} onClick={showModal}>
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
                    { refresh && ((!!filteredData.length ? filteredData : data)?.length !== 0 ? (
                        <div className="all-books">
                            {(!!filteredData.length ? filteredData : data).map(book => {
                                return (
                                    <BookInfo 
                                        key={book.title} 
                                        userType={userType}
                                        userName={userName}
                                        data={book} 
                                        handleSave={updateBookdata}
                                        handleDelete={removeBookdata}
                                        handleOrder={updateOrderdata}
                                    />
                            )})}
                        </div>
                    ) : (
                        <div style={{textAlign: 'center'}}>
                            <span>Sorry, No books available..!</span>
                        </div>
                    ))}
                </TabPane>
                <TabPane tab="Orders" key="orders">
                    <Orders 
                        data={orderData}
                        userType={userType}
                        userName={userName}
                    />
                </TabPane>
            </Tabs>
            </div>
        </div>
        </div>
    );
}

export default HomePage;