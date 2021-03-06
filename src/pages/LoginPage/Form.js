import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';

import './styles.scss';

const LoginForm = () => {
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [formValue, setFormValue] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        setError('');
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
        // console.log(formValue);
        const { username, password } = formValue;
        
        if (username === 'admin' && password !== 'admin') {
            setError("password incorrect");
            return;
        } else if (username === 'admin' && password === 'admin') {
            localStorage.setItem('Type', 'admin');
        } else if (username === password) {
            setError("Username cannot be duplicated");
            return;
        } else if (password.length <= 8) {
            setError("password must have minimum 8 characters");
            return;
        }
        localStorage.setItem('User', username);
        setTimeout(() => {
            setRedirect(true);
        },1000);
    }

    if (redirect) {
        return <Redirect to="/home" />;
    }

    const { username, password } = formValue;

    return (
        <>
        <form className="login-form">
		    <h3>Login | Register</h3>
            <span> Username </span>
            <br />
			<input
                type="text"
                name="username"
                onChange={handleChange}
                value={username} 
            />
            <br />

            <span> Password </span>
            <br />
			<input
                type="password"
                name="password"
                onChange={handleChange}
                value={password} 
            />
            <br />
			{!!error && (
				<span className="error-text">{error}</span>
            )}
            <br />
            <Button disabled={!(!!username && !!password)} onClick={handleSubmit}>
                Login
            </Button>
		</form>
        </>
    );
}

export default LoginForm;