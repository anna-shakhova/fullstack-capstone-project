import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleLogin = async () => {
        try {
            const bearerToken = sessionStorage.getItem('bearer-token');
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.firstName);
                sessionStorage.setItem('email', json.email);

                setIsLoggedIn(true);
                navigate('/app');
            } else {
                setEmail('');
                setPassword('');
                setShowerr('Wrong password. Try again.');
                setTimeout(() => {
                    setShowerr('');
                }, 2000);
            }

            if (json.error) {
                setShowerr(json.error);
            }
        } catch(e) {
            console.log("Error fetching details: " + e.message);
        }
    }

    const onEmailChange = useCallback((e) => {
        setEmail(e.target.value);
        setShowerr('');
    }, []);

    const onPasswordChange = useCallback((e) => {
        setPassword(e.target.value);
        setShowerr('');
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate])

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        <div className="mb-4">
                            <label htmlFor="email" className="form label">"Email"</label><br/>
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={onEmailChange}
                            />

                            <div className="text-danger">{showerr}</div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form label">"Password"</label><br/>
                            <input
                                id="password"
                                type="text"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={onPasswordChange}
                            />
                        </div>

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