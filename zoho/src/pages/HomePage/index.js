import React, { useState, useEffect } from 'react';

function HomePage(props){
    const [type, setType] = useState(localStorage.getItem('Type'));
    console.log(type);
    return (
        <h1>Home Page</h1>
    );
}

export default HomePage;