import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MembersPage() {
    const [members, setMembers] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/nutri")
            .then(res => setMembers(res.data))
            .catch(err => console.error("Eroare la încărcare:", err));
    }, []);

    const toggleRow = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();

        if (window.confirm("Sigur vrei să ștergi acest pacient?")) {
            try {
                await axios.delete(`http://localhost:5000/api/nutri/${id}`);
                setMembers(members.filter(m => m.id !== id));
            } catch (err) {
                alert("Eroare la ștergere!");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '15px' }}>
                <h3 className="fw-bold mb-4 text-success">
                    <span role="img" aria-label="members">👥</span> Gestiune Pacienți
                </h3>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr className="text-secondary small text-uppercase">
                                <th>Nume Pacient</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th className="text-center">Acțiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(m => {
                                const isExpired = new Date(m.nextConsultationDate) < new Date();

                                return (
                                    <React.Fragment key={m.id}>
                                        <tr onClick={() => toggleRow(m.id)} style={{ cursor: 'pointer' }}>
                                            <td className="fw-bold">{m.fullName}</td>
                                            <td>{m.email}</td>
                                            <td>
                                                <span className={`badge ${isExpired ? 'bg-danger' : 'bg-success'}`}>
                                                    {isExpired ? 'Expirat' : 'Activ'}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/members/edit/${m.id}`);
                                                    }}
                                                >
                                                    Editează
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={(e) => handleDelete(m.id, e)}
                                                >
                                                    Șterge
                                                </button>
                                            </td>
                                        </tr>

                                        {expandedId === m.id && (
                                            <tr style={{ backgroundColor: '#f8fff8' }}>
                                                <td colSpan="4">
                                                    <strong>Greutate:</strong> {m.currentWeight} kg |
                                                    <strong> Obiectiv:</strong> {m.goal} |
                                                    <strong> Alergii:</strong> {m.allergies || '—'}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MembersPage;
