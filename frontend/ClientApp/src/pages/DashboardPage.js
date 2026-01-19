import React, { useEffect, useState } from 'react';
import axios from 'axios';

// normalizează obiectivul (diacritice + lowercase)
function normalizeGoal(goal) {
    return goal
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function DashboardPage() {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        expired: 0,
        slabire: 0,
        masa: 0,
        mentinere: 0,
        performanta: 0,
        recuperare: 0
    });

    const [alerts, setAlerts] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:5000/api/patients', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            const patients = res.data;
            const now = new Date();

            // 🔥 DOAR abonamente ACTIVE
            const activePatients = patients.filter(
                p => new Date(p.nextConsultationDate) > now
            );

            const expiredPatients = patients.filter(
                p => new Date(p.nextConsultationDate) <= now
            );

            setAlerts(expiredPatients.slice(0, 3));

            setStats({
                total: patients.length,
                active: activePatients.length,
                expired: expiredPatients.length,

                // 🔥 OBIECTIVE DOAR DIN ACTIVE
                slabire: activePatients.filter(
                    p => normalizeGoal(p.goal) === 'slabire'
                ).length,

                masa: activePatients.filter(
                    p => normalizeGoal(p.goal) === 'masa musculara'
                ).length,

                mentinere: activePatients.filter(
                    p => normalizeGoal(p.goal) === 'mentinere'
                ).length,

                performanta: activePatients.filter(
                    p => normalizeGoal(p.goal) === 'performanta sportiva'
                ).length,

                recuperare: activePatients.filter(
                    p => normalizeGoal(p.goal) === 'recuperare'
                ).length
            });
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="fw-bold mb-5 text-success">
                📊 Panou de Control NutriLife
            </h2>

            {/* CARDURI */}
            <div className="row g-4 mb-5">
                <div
                    className="col-md-4"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowDetails(!showDetails)}
                >
                    <div
                        className="card text-white border-0 shadow-lg h-100"
                        style={{
                            borderRadius: '25px',
                            background: 'linear-gradient(135deg, #007bff, #0056b3)'
                        }}
                    >
                        <div className="card-body text-center py-5">
                            <h6 className="text-uppercase">Total Pacienți</h6>
                            <h1 className="display-1">{stats.total}</h1>
                            <div className="btn btn-light btn-sm mt-2">
                                {showDetails ? 'Închide Obiective' : 'Vezi Obiective'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card text-white border-0 shadow-lg h-100"
                        style={{
                            borderRadius: '25px',
                            background: 'linear-gradient(135deg, #28a745, #1e7e34)'
                        }}
                    >
                        <div className="card-body text-center py-5">
                            <h6 className="text-uppercase">Abonamente Active</h6>
                            <h1 className="display-1">{stats.active}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card text-white border-0 shadow-lg h-100"
                        style={{
                            borderRadius: '25px',
                            background: 'linear-gradient(135deg, #dc3545, #a71d2a)'
                        }}
                    >
                        <div className="card-body text-center py-5">
                            <h6 className="text-uppercase">Abonamente Expirate</h6>
                            <h1 className="display-1">{stats.expired}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* ALERTE */}
            {alerts.length > 0 && (
                <div className="alert alert-danger shadow-sm mb-5">
                    <h5>🔔 Atenție: Reînnoire necesară</h5>
                    <ul className="mb-0">
                        {alerts.map(p => (
                            <li key={p.id}>
                                <strong>{p.fullName}</strong> – expirat la{' '}
                                {new Date(p.nextConsultationDate).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* OBIECTIVE ACTIVE */}
            {showDetails && (
                <div className="card shadow-lg border-0 p-4">
                    <h5 className="text-center mb-4">🎯 Focus Nutrițional Actual (Active)</h5>
                    <div className="row text-center">
                        <div className="col">Slăbire<br /><strong>{stats.slabire}</strong></div>
                        <div className="col">Masă Musculară<br /><strong>{stats.masa}</strong></div>
                        <div className="col">Menținere<br /><strong>{stats.mentinere}</strong></div>
                        <div className="col">Performanță<br /><strong>{stats.performanta}</strong></div>
                        <div className="col">Recuperare<br /><strong>{stats.recuperare}</strong></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
