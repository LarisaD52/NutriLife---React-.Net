import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMemberPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [goal, setGoal] = useState('Menținere');
    const [weight, setWeight] = useState('');
    const [allergies, setAllergies] = useState('');
    const [subType, setSubType] = useState('1');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const expiration = new Date();
        expiration.setMonth(now.getMonth() + Number(subType));

        const newPatient = {
            fullName,
            email,
            allergies,
            currentWeight: Number(weight),
            goal,
            planStartDate: now.toISOString(),
            nextConsultationDate: expiration.toISOString(),
            isActive: true
        };

        try {
            const token = localStorage.getItem('token');

            await axios.post(
    'http://localhost:5000/api/nutri',
    newPatient,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);


            alert('Pacient adăugat cu succes!');
            navigate('/members');

        } catch (err) {
            console.error(err);
            alert('Eroare la salvare: verifică backend-ul.');
        }
    };

    return (
        <div className="container mt-5">
            <div
                className="card shadow-lg mx-auto border-0"
                style={{ maxWidth: '600px', borderRadius: '15px' }}
            >
                <div className="card-body p-4">
                    <h2 className="text-center mb-4 fw-bold text-success">
                        ➕ Pacient Nou
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Nume complet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Greutate (kg)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Obiectiv</label>
                                <select
                                    className="form-select"
                                    value={goal}
                                    onChange={e => setGoal(e.target.value)}
                                >
                                    <option value="Slăbire">Slăbire</option>
                                    <option value="Masă Musculară">Masă Musculară</option>
                                    <option value="Menținere">Menținere</option>
                                    <option value="Performanță Sportivă">Performanță Sportivă</option>
                                    <option value="Recuperare">Recuperare</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Durată abonament</label>
                            <select
                                className="form-select"
                                value={subType}
                                onChange={e => setSubType(e.target.value)}
                            >
                                <option value="1">Basic – 1 Lună</option>
                                <option value="3">Premium – 3 Luni</option>
                                <option value="12">Full – 12 Luni</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Alergii (opțional)</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                value={allergies}
                                onChange={e => setAllergies(e.target.value)}
                                placeholder="Ex: Nuci, Lactoză..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 fw-bold py-2"
                        >
                            Creează membru
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddMemberPage;
