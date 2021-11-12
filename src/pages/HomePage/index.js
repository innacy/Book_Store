import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Button } from 'antd';

import Inventory from './Inventory';
import Orders from './Orders';
import { booksData, orders } from '../../data/initialDetails';
import './styles.scss';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key, "Tab");
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
    const forceUpdate = useForceUpdate();

    const updateBookdata = values => {
        if (values.available < 0){
            alert("Available Quantity can't be negative!");
        } else if (values.available === 0){
            alert("Can't update, Please remove the book!");
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
        const selectedBook = data.find(book => book.title === values.book);
        const {quantity} = values;
        const { available } = selectedBook;
        if (quantity < 0) {
            alert("Quantity can't be negative!");
            return;
        } else if (quantity > available) {
            alert("Available Quantity is low");
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
            orderData.push(values);
            return;
        }
        orderData.push(values);
        // console.log(data);
        console.log(orderData);
        forceUpdate();
    };

    const logOut = () => {
        console.log("Logging Out");
        localStorage.removeItem('Type');
        localStorage.removeItem('User');
        return history.push("/");;
    };

    return (
        <div className="top-container">
        <div style={{ margin: '10px' }}>
            <div style={{ display: 'flow-root', borderBottom: '3px solid #ff014e' }}>
                <h3 style={{float: 'left', color: '#891dd0'}}>{userType} Dashboard</h3>
                <Button style={{float: 'right', color: '#891dd0', fontWeight: '500'}} onClick={logOut}>Log out</Button>
            </div>
            <div>
            <Tabs type="card" defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Inventory" key="inventory">
                    <Inventory
                        data={data}
                        userType={userType}
                        userName={userName}
                        setData={setData}
                        handleSave={updateBookdata}
                        handleOrder={updateOrderdata}
                        handleDelete={removeBookdata}
                    />
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