import React, { useState, useCallback } from 'react';

import './LoginPage.css';

function Input({
    id,
    label,
    placeholder,
    value,
    onChange,
}) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="form label">{label}</label><br/>
            <input
                id={id}
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("Login invoked")
    }

    const onEmailChange = useCallback((e) => setEmail(e.target.value), []);
    const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        <Input
                            id="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={onEmailChange}
                        />

                        <Input
                            id="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={onPasswordChange}
                        />

                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                    
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                     </div>
                </div>
            </div>
        </div>
     );
}

export default LoginPage;