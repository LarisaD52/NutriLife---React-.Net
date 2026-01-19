import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // LOGIN FAKE (controlat)
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('token', 'FAKE_TOKEN');
            localStorage.setItem('user', username);

            alert('Te-ai logat cu succes în sistemul NutriLife!');
            navigate('/');
        } else {
            alert('Utilizator sau parolă greșită!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <div className="card-body p-5 text-center">
                    <div className="mb-4">
                        <span style={{ fontSize: '50px' }}>🌿</span>
                        <h2 className="fw-bold mt-2 text-success">NutriLife Admin</h2>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3 text-start">
                            <label className="form-label fw-bold">Utilizator</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="admin"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4 text-start">
                            <label className="form-label fw-bold">Parolă</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="admin"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="btn btn-success btn-lg w-100">
                            Intră în sistem
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
