import React, { useState, useCallback } from 'react';

import './RegisterPage.css';

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

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log("Register invoked")
    }

    const onFirstNameChange = useCallback((e) => setFirstName(e.target.value), []);
    const onLastNameChange = useCallback((e) => setLastName(e.target.value), []);
    const onEmailChange = useCallback((e) => setEmail(e.target.value), []);
    const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        <Input
                            id="firstName"
                            label="First Name"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={onFirstNameChange}
                        />

                        <Input
                            id="lastName"
                            label="Last Name"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={onLastNameChange}
                        />

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

                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                    
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                     </div>
                </div>
            </div>
        </div>
     );
}

export default RegisterPage;