import React, { useState, useEffect } from 'react';

export default function Home() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        const token = localStorage.getItem('token');
        // Folosim 'api/nutri' pentru a corespunde cu controller-ul tau C#
        fetch('api/nutri', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("Eroare autorizare");
            return res.json();
        })
        .then(data => {
            setPatients(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Eroare:", err);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        if (window.confirm("Sigur dorești să ștergi acest pacient?")) {
            fetch(`api/nutri/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                if (res.ok) loadData();
            });
        }
    };

    const isExpired = (date) => new Date(date) < new Date();

    if (loading) return <div style={{ padding: '20px' }}>Se încarcă datele...</div>;

    return (
        <div style={{ padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
            <h1 style={{ color: '#2e7d32' }}>🌿 NutriLife Admin Panel</h1>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#2e7d32', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '15px' }}>Nume Pacient</th>
                            <th style={{ padding: '15px' }}>Obiectiv</th>
                            <th style={{ padding: '15px' }}>Data Consult</th>
                            <th style={{ padding: '15px' }}>Status</th>
                            <th style={{ padding: '15px' }}>Acțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(p => (
                            <tr key={p.id} style={{ 
                                borderBottom: '1px solid #eee', 
                                backgroundColor: isExpired(p.nextConsultationDate) ? '#fff5f5' : 'white' 
                            }}>
                                <td style={{ padding: '15px' }}>{p.fullName}</td>
                                <td style={{ padding: '15px' }}>{p.goal}</td>
                                <td style={{ padding: '15px' }}>{new Date(p.nextConsultationDate).toLocaleDateString()}</td>
                                <td style={{ padding: '15px', color: isExpired(p.nextConsultationDate) ? 'red' : 'green', fontWeight: 'bold' }}>
                                    {isExpired(p.nextConsultationDate) ? "🔴 EXPIRAT" : "🟢 ACTIV"}
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => handleDelete(p.id)} style={{ color: 'red', border: '1px solid red', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>Șterge</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}